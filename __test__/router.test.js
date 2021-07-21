import React from 'react';
import { Provider } from 'react-redux';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Routes from '@configs/router.config'
import configure from '@middleware/configureStore';

jest.mock('@components/logo/logo');
jest.mock('@configs/router.config');
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
  wrapper = mount(
    <Provider store={configure({ })}>
        <Routes />
    </Provider>
  );
})

describe('测试router', () => {
  test('默认进入概览页面', (done) => {
    console.log('wrapper.debug() 输出结果：', wrapper.debug())
    expect(wrapper.find('h1').text()).toBe('概览');
    setTimeout(done, 6000)
  });
  test('切换图表页面', () => {
    wrapper.find('Router').props().history.push('/echarts');
    wrapper.update();
    expect(wrapper.find('h1').text()).toBe('图表');
  });
  test('切换编辑器页面', () => {
    wrapper.find('Router').props().history.push('/editor');
    wrapper.update();
    expect(wrapper.find('h1').text()).toBe('编辑器');
  });
  test('切换用户管理页面', () => {
    wrapper.find('Router').props().history.push('/set$/userManage');
    wrapper.update();
    expect(wrapper.find('h1').text()).toBe('用户管理');
  });
  test('切换角色管理页面', () => {
    wrapper.find('Router').props().history.push('/set$/roleManage');
    wrapper.update();
    expect(wrapper.find('h1').text()).toBe('角色管理');
  });
  test('切换权限管理页面', () => {
    wrapper.find('Router').props().history.push('/set$/moduleManage');
    wrapper.update();
    expect(wrapper.find('h1').text()).toBe('权限管理');
  });
});