import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// test file
import { shallow, mount, render } from 'enzyme';


it('Render Home', () => {
	const wrapper = shallow(<Home />);
	expect(wrapper.contains(<h2>Detail Rekening</h2>)).toEqual(true);
});