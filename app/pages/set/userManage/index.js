import React, { Component } from 'react';
import {
  Spin,
  notification,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Layout,
} from 'antd';
import TableList from '@tableList';
import { synUser } from '@apis/common';
import {
  fetchUserDeptList,
  fetchUserList,
  fetchUserDetail,
  fetchRoleList,
  fetchChangeUserStatus,
} from '@apis/manage';
import TreeList from './treeList';
import AddPolice from './modal/addPolice';

const FormItem = Form.Item;
const { Content, Sider } = Layout;
@Form.create({})
// 声明组件  并对外输出
export default class UserManage extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      // activeTab: 'list',
      searchtitle: '',
      PoliceAddVisible: false,
      synchronizeLoading: false,
      spinloading: true,
      moduletitle: '',
      moduletype: '',
      currPeopleId: '',
      // hasList: false,
      condition: {
        keyword: '',
        pageSize: 10,
        pageNo: 1,
        deptCode: '',
      },
      btnRights: {
        view: true,
        freeze: true,
        delete: true,
        edit: true,
        add: true,
      }, // 按钮权限的数组
      userDeptResult: { list: [], loading: false },
      userListResult: { list: [], loading: false },
      userDetailResult: { list: [], loading: false },
      userRoleSetResult: { list: [], loading: false },
    };
  }

  // 组件即将加载
  componentWillMount() {
    // this.getBtnRights()
    fetchRoleList({}, (res) => {
      this.setState({ userRoleSetResult: res.data });
    });
    fetchUserDeptList({}, (res) => {
      if (res.data.list.length > 0) {
        this.setState(
          {
            userDeptResult: res.data,
            spinloading: false,
            condition: {
              ...this.state.condition,
              deptCode: res.data.list[0].deptCode,
            },
          },
          () => {
            this.getData(() => {
              this.setState({
                searchtitle: '杭州市',
                // hasList: true,
              });
            });
          },
        );
      } else {
        this.setState({ spinloading: false });
      }
    });
  }

  // 冻结、解冻用户
  handleChangeStatus(id, status) {
    fetchChangeUserStatus({ id: id, status: status }, (res) => {
      message.success(res.msg);
      this.getData();
    });
  }

  // 点击人员详情
  handleUserInfo = (id) => {
    fetchUserDetail({ id: id }, (res) => {
      this.setState({
        userDetailResult: res.data,
        PoliceAddVisible: true,
        moduletype: 'edit',
        moduletitle: '详情',
        currPeopleId: id,
      });
    });
  };

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.setFieldsValue({ key: '' });
  }

  // 获取用户列表数据
  getData(callback) {
    fetchUserList({ ...this.state.condition }, (res) => {
      this.setState({
        userListResult: res.data,
      });
      callback && callback();
    });
  }

  // 点击人员角色
  // handleUserRole(id) {
  //   fetchUserDetail({ id: id }, res => {
  //     this.setState({
  //       userDetailResult: res.data,
  //       RoleVisible: true,
  //       currPeopleId: id
  //     });
  //   });
  // }

  // 搜索
  handleSearch = (e) => {
    e.preventDefault();
    const keyword = this.props.form.getFieldValue('key');
    this.setState(
      {
        spinloading: true,
        condition: {
          ...this.state.condition,
          keyword: keyword,
          pageNo: 1,
        },
      },
      () => {
        this.getData(() => {
          this.setState({ spinloading: false });
        });
      },
    );
  };

  // 点击树节点的时候获取 当前部门 deptid
  onSelect = (info, title) => {
    if (info && info.length > 0) {
      this.setState(
        {
          spinloading: true,
          searchtitle: title,
          condition: {
            ...this.state.condition,
            deptCode: info[0],
            pageNo: 1,
            keyword: '',
          },
        },
        () => {
          this.getData(() => {
            this.setState({
              spinloading: false,
              // hasList: true,
            });
          });
        },
      );
      this.props.form.setFieldsValue({ key: '' });
    }
  };

  // 点击新增人员的时候判断部门 deptid  是否存在，有则弹窗新增
  policeAdd() {
    if (this.state.condition.deptCode) {
      this.setState({
        PoliceAddVisible: true,
        moduletype: 'add',
        moduletitle: '新增',
      });
    } else {
      notification.error({
        message: '错误',
        description: '请先选择部门',
      });
    }
  }

  synchronize() {
    message.info('用户数据同步中');
    this.setState(
      {
        synchronizeLoading: true,
      },
      () => {
        synUser(
          {},
          () => {
            message.success('用户数据同步完成');
            this.setState({
              synchronizeLoading: false,
            });
            this.getData();
          },
          (res) => {
            message.warning(res.msg);
            this.setState({
              synchronizeLoading: false,
            });
          },
        );
      },
    );
  }

  // 新增或编辑用户保存
  handleOk = () => {
    const curUserListResult = this.state.userListResult;
    let curpage = this.state.condition.pageNo;
    if (
      this.state.moduletype === 'add' &&
      curUserListResult &&
      curUserListResult.totalCount > 0 &&
      curUserListResult.totalCount % 10 === 0
    ) {
      curpage += 1;
    }
    this.setState(
      {
        PoliceAddVisible: false,
        condition: {
          ...this.state.condition,
          pageNo: curpage,
        },
      },
      () => {
        this.getData();
      },
    );
  };

  // 新增用户modal取消
  handleCancel = () => {
    this.setState({ PoliceAddVisible: false });
  };

  // 角色弹窗确认事件
  // handleOkRole() {
  //   this.setState({ RoleVisible: false }, () => {
  //     this.getData();
  //   });
  // }

  // 角色弹窗取消事件
  // handleCancelRole() {
  //   this.setState({ RoleVisible: false });
  // }

  // 页数改变事件
  pageChange = (newPage) => {
    this.state.condition.pageNo = newPage;
    this.getData();
  };

  // 页大小改变事件
  pageSizeChange = (e, pageSize) => {
    this.state.condition.pageNo = 1;
    this.state.condition.pageSize = pageSize;
    this.getData();
  };

  // 生成表格头部信息
  renderColumn() {
    return [
      {
        title: '姓名',
        dataIndex: 'chineseName',
        key: 'chineseName',
        width: '15%',
      },
      {
        title: '职务',
        dataIndex: 'post',
        key: 'post',
        width: '15%',
      },
      {
        title: '帐号',
        dataIndex: 'username',
        key: 'username',
        width: '15%',
      },
      {
        title: '帐号状态',
        dataIndex: 'statusLabel',
        key: 'statusLabel',
        width: '15%',
        render: (text, record, index) => (
          <span>{record.status ? '已冻结' : '正常'}</span>
        ),
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
        width: '20%',
        render: (text, record, index) => {
          const roleNames = [];
          (text || []).map((item) => {
            roleNames.push(item.roleName);
          });
          return roleNames.length === 0 ? '' : roleNames.join(',');
        },
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, record, index) => {
          const { btnRights } = this.state;
          return (
            <span>
              {btnRights.view ? (
                <span>
                  <a onClick={() => this.handleUserInfo(record.id)}>详情</a>
                  <span className="ant-divider" />
                </span>
              ) : null}
              {btnRights.freeze ? (
                <span>
                  <Popconfirm
                    title={`确认${record.status ? '解冻' : '冻结'}账户?`}
                    placement="left"
                    onConfirm={() => this.handleChangeStatus(record.id, `${record.status}`)}
                  >
                    <a>{record.status ? '解冻账户' : '冻结账户'}</a>
                  </Popconfirm>
                </span>
              ) : null}
              {/*
                <span className="ant-divider" />
                btnRights.delete ?
                  <Popconfirm title="删除?" placement="left" onConfirm={() => this.handleDelete(record.id)}>
                    <a>删除</a>
                  </Popconfirm> : null
              */}
            </span>
          );
        },
      },
    ];
  }

  // #endregion

  render() {
    const {
      userDeptResult,
      userListResult,
      userDetailResult,
      userRoleSetResult,
    } = this.state;
    const { btnRights } = this.state;
    const { getFieldDecorator } = this.props.form;
    const thevalue = this.state.moduletype === 'add' ? '' : userDetailResult;

    return (
      <div className="page page-scrollfix page-usermanage">
        <h1>用户管理</h1>
        <Layout>
          <Layout className="page-body">
            <Sider
              width={240}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Spin spinning={this.state.spinloading}>
                <h3 className="page-title">杭州市</h3>
                <div className="treeside">
                  <TreeList
                    trees={userDeptResult.list}
                    curDeptCode={this.state.condition.deptCode}
                    onSelect={this.onSelect}
                  />
                </div>
              </Spin>
            </Sider>
            <Content>
              <h3 className="page-title">
                {this.state.searchtitle}
                <span className="error">
                  {' '}
                  {userListResult.totalCount ? userListResult.totalCount : 0}
                </span>人
              </h3>
              <div className="page-header">
                <div className="layout-between">
                  <Form className="flexrow" onSubmit={this.handleSearch}>
                    <FormItem>
                      {getFieldDecorator('key')(<Input
                        className="input-base-width"
                        size="default"
                        placeholder="请输入关键字进行搜索"
                      />)}
                    </FormItem>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                  </Form>
                </div>
              </div>
              <div className="page-content has-pagination table-flex table-scrollfix">
                <TableList
                  rowKey="id"
                  columns={this.renderColumn()}
                  dataSource={userListResult.list}
                  currentPage={this.state.condition.pageNo}
                  pageSize={this.state.condition.pageSize}
                  loading={userListResult.loading}
                  scroll={{ y: true }}
                  onChange={this.pageChange}
                  onShowSizeChange={this.pageSizeChange}
                  totalCount={userListResult.totalCount}
                />
              </div>
              <div className="page-footer">
                <div className="page-footer-buttons">
                  {btnRights.add ? (
                    <Button
                      type="primary"
                      style={{ marginRight: '10px' }}
                      onClick={() => this.policeAdd()}
                    >
                      新增人员
                    </Button>
                  ) : null}
                  {btnRights.add ? (
                    <Button
                      type="primary"
                      loading={this.state.synchronizeLoading}
                      onClick={() => this.synchronize()}
                    >
                      同步人员
                    </Button>
                  ) : null}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>

        {/* 允许新增的判断 */}
        {this.state.PoliceAddVisible ? (
          <AddPolice
            visible={this.state.PoliceAddVisible}
            title={this.state.moduletitle}
            handleOk={this.handleOk}
            values={thevalue}
            deptId={this.state.condition.deptCode}
            currPeopleId={this.state.currPeopleId}
            type={this.state.moduletype}
            onCancel={this.handleCancel}
            roleList={userRoleSetResult.list || []}
          />
        ) : null}
      </div>
    );
  }
}
