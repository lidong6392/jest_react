
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ModuleManage from '../app/pages/set/moduleManage';


Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount, render } = Enzyme;

let wrapper = null;

beforeAll(() => {
  console.log('ModuleManage >>>', ModuleManage);

  wrapper = mount(<ModuleManage />);
})


describe('检查组件渲染是否正常', () => {
  test('检查组件渲染是否正常', () => {
    
    console.log('wrapper.debug() >>>', wrapper.debug())
  });
});

