import React from "react";
import Logout from './Logout';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';

it('Render Logout', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper.contains(<h2>Logout</h2>)).toEqual(true);
    expect(wrapper.contains(<p>Tekan tombol untuk logout</p>)).toEqual(true);

    expect(wrapper).toMatchSnapshot();
})