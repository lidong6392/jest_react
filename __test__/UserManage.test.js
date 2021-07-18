import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserManage from '../app/pages/set/userManage';

jest.mock('@apis/manage');

Enzyme.configure({ adapter: new Adapter() });

const { shallow, mount, render } = Enzyme;

const flushPromises = () => {
  return new Promise(resolve => {setImmediate(resolve)});
}

let wrapper = null;

beforeAll(() => {
  wrapper = mount(<UserManage />);
})

describe('检查组件渲染是否正常', () => {
  /*
  test('检查组件html结构', () => {
    return flushPromises().then(() => {
      console.log(wrapper.html());
    })
  });
  */

  /*
  test('检查组件html结构2', (done) => {
    setImmediate(() => {
      console.log(wrapper.html());
      done()
    });
  });
  */

  test('检查组件html结构3', () => {
    console.log(wrapper.html());
  });
});

