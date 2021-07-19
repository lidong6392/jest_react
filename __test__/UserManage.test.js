import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserManage from '../app/pages/set/userManage';

jest.mock('@apis/manage');

Enzyme.configure({ adapter: new Adapter() });

const { shallow, mount, render } = Enzyme;

let wrapper = null;

beforeAll(() => {
  wrapper = mount(<UserManage />);
})

describe('检查组件渲染是否正常', () => {
  test('检查组件html结构', () => {
    // console.log(wrapper.html());
    // console.log(wrapper.debug());
  });
  test('检查树控件渲染是否正常', () => {
    const tree = wrapper.find('.page-body Sider TreeList');
    const instance = tree.instance();
    const { props } = instance;
    expect(wrapper.find('.page-body Sider .page-title').text()).toBe('杭州市');
    expect(tree.length).toBe(1);
    expect(props.trees.length).toBe(1);
    expect(props.trees[0]).toMatchObject({
      id: '1',
      deptName: '杭州市',
      deptCode: '370200000000'
    });
    expect(props.curDeptCode).toBe('370200000000');
  });

  test('检查搜索栏是否正常渲染', () => {
    expect(wrapper.find('.page-header Input[placeholder="请输入关键字进行搜索"]').length).toBe(1);
    expect(wrapper.find('.page-header button[type="submit"]').length).toBe(1);
    expect(wrapper.find('.page-header button[type="submit"]').text()).toBe('搜 索');
  });

  test('检查列表是否正常渲染', () => {
    const table = wrapper.find('TableList');
    expect(table.length).toBe(1);
    const instance = table.instance();
    const { props, state } = instance;
    const { columns, dataSource } = props;
    expect(props).toMatchObject({
      currentPage: 1, 
      pageSize: 10,
      totalCount: 10
    });
    expect(columns.map(item => item.title)).toEqual([
      '姓名', '职务', '帐号',
      '帐号状态', '角色', '操作'
    ]);
    expect(dataSource.map(item => item.chineseName)).toEqual([
      '销售部1', '市局',  '测试sj',
      'sj-admin', 'zhlsj1', 'zhlsj',
      '管理员'
    ]);
  });

  // TODO 底部操作栏

});

describe('检查组件交互行为是否正常', () => {
  test('检查组件html结构', (done) => {
    // wrapper.find('.page-header button[type="submit"]').simulate('click')

    // wrapper.find('.page-header Input[placeholder="请输入关键字进行搜索"]').simulate('change', 
    //   {taget: { value : 'aaa' } }
    // )

    wrapper.find('.page-header Input[placeholder="请输入关键字进行搜索"]').props().onChange('aaa');

    setTimeout(() => {
      wrapper.find('Form.flexrow').props().onSubmit({
        preventDefault: () => {}
      })
      done();
    }, 20)
    
    // 表格操作、 底部操作
  });

})