import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// test file
import { shallow, mount, render } from 'enzyme';


it('Render App', () => {
	// const wrapper = shallow(<App />);
	// expect(wrapper.contains(<div/>)).toEqual(true);
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});