import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import UserManage from '../app/pages/set/userManage';

jest.mock('@apis/manage');

Enzyme.configure({ adapter: new Adapter() });

const { shallow, mount, render } = Enzyme;

let wrapper = null;

const originalError = console.error.bind(console.error);
const originalWarn = console.error.bind(console.warn);
beforeAll(() => {
  // 过滤无关紧要的警告信息（避免输出信息太多干扰）
  console.error = (msg) => { !msg.toString().includes('Warning:') && originalError(msg)}
  console.warn = (msg) => { !msg.toString().includes('Warning:') && originalWarn(msg)}
  wrapper = mount(<UserManage />);
})

describe('检查组件渲染是否正常', () => {
  test('检查树控件', () => {
    wrapper.update();
    // console.log('debug() >>>', wrapper.debug())
    const tree = wrapper.find('.page-body Sider TreeList');
    // const { props } = tree.instance();
    const props = tree.props();
    expect(wrapper.find('.page-body Sider .page-title').text()).toBe('杭州市2');
    expect(tree.length).toBe(1);
    expect(props.trees.length).toBe(1);
    expect(props.trees[0]).toMatchObject({ id: '1', deptName: '杭州市', deptCode: '370200000000' });
    expect(props.curDeptCode).toBe('370200000000');
  });
  test('检查搜索栏', () => {
    expect(wrapper.find('.page-header Input[placeholder="请输入关键字进行搜索"]').length).toBe(1);
    expect(wrapper.find('.page-header button[type="submit"]').text()).toBe('搜 索');
  });
  test('检查列表', () => {
    const table = wrapper.find('TableList');
    expect(table.length).toBe(1); 
    // const { props } = table.instance();
    const props = table.props();
    const { columns, dataSource } = props;
    expect(props).toMatchObject({ currentPage: 1, pageSize: 10,totalCount: 10 });
    expect(columns.map(item => item.title)).toEqual(['姓名', '职务', '帐号','帐号状态', '角色', '操作']);
    expect(dataSource.map(item => item.chineseName)).toEqual(['销售部1','市局','测试sj','sj-admin','zhlsj1','zhlsj','管理员']);
  });
  test('检查底部操作栏', () => {
    expect(wrapper.find('.page-footer-buttons Button').length).toBe(2);
    expect(wrapper.find('.page-footer-buttons Button').at(0).text()).toBe('新增人员');
    expect(wrapper.find('.page-footer-buttons Button').at(1).text()).toBe('同步人员');
  });
});


describe('测试组件交互行为是否正常', () => {
  test('搜索关键词”销售部“', (done) => {
    // 输入搜索关键词”销售部“
    console.log('wrapper >>', wrapper, wrapper.instance())
    wrapper.find('.page-header Input[placeholder="请输入关键字进行搜索"]').props().onChange('销售部');
    // wrapper.find('.page-header Input[placeholder="请输入关键字进行搜索"]').simulate('change', 
    //   {taget: { value : 'aaa' } }
    // )
    // mock组件的getData方法
    const spyGetData = jest.spyOn(wrapper.find('UserManage').instance(), 'getData');
    // 搜索
    // wrapper.find('.page-header button[type="submit"]').simulate('click')
    wrapper.find('Form.flexrow').props().onSubmit({
      preventDefault: () => {}
    });
    // 检查state是否符合预期
    expect(wrapper.find('UserManage').state().condition.keyword).toBe('销售部');
    // 确认是否正确调用了getData方法
    expect(spyGetData).toBeCalled();
    expect(spyGetData).toBeCalledTimes(1);
    done();
  });
  test('选中”文二路“', () => {
    // mock组件的getData方法
    const spyGetData = jest.spyOn(wrapper.find('UserManage').instance(), 'getData');
    const tree = wrapper.find('.page-body Sider TreeList Tree').at(0);
    const selectedNodes = [{ props: { title: '文二路' } }];
    tree.props().onSelect(['370202150000'], { selectedNodes });
    // 确认是否正确调用了getData方法
    expect(spyGetData).toBeCalled();
    expect(spyGetData).toBeCalledTimes(1);
    // 检查state是否符合预期
    expect(wrapper.find('UserManage').state().condition.keyword).toBe(''); // 切换选中树节点会清空搜索关键词
    expect(wrapper.find('UserManage').state().condition.deptCode).toBe('370202150000');
  });
  test('全部操作执行完成对组件的state进行快照测试', () => {
    expect(wrapper.find('UserManage').state()).toMatchSnapshot();
    expect(wrapper.find('.page-body Sider TreeList').state()).toMatchSnapshot();
  });
})
