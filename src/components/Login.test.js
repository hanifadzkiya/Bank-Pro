import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// test file
import { shallow, mount, render } from 'enzyme';


it('Render Login', () => {
	const wrapper = shallow(<Login />);
	expect(wrapper.contains(<h2>Login</h2>)).toEqual(true);
	expect(wrapper.contains(<input type="submit" value="Login"/>)).toEqual(true);
	expect(wrapper.contains(<h2>Login</h2>)).toEqual(true);
	expect(wrapper.contains(<h2>Login</h2>)).toEqual(true);
	expect(wrapper).toMatchSnapshot();
});

it('rekening check',()=>
{
	const preventDefault = jest.fn();
	const wrapper = shallow(<Login/>);
	wrapper.find('input[type="number"]').simulate('change', {preventDefault, target: {value: 98,name: 'rekening'}});
	expect(wrapper.state('rekening')).toEqual(98);	
});

describe('User login', () => {
	it('fail if no credentials', () => {
		const fakeEvent = { preventDefault: () => console.log('preventDefault') };
		const login = shallow(<Login />);
		expect(login.find('#loginform').length).toBe(1);
		login.find('#loginform').simulate('submit', fakeEvent);
		expect(sessionStorage["rekening"]).toBe(undefined);
	});
})

//
// it('Should change value when onChange was called', () => {
//     const onChange = jest.fn();
//     const props = {
//         label: 'Test Label',
//         type: 'text',
//         input: {
//           onChange
//         },
//         value: 'Hello world',
//         meta: {
//             touched: true,
//             error: 'error'
//         }
//     }
//     const wrapper = mount(< {...props}/>);
//     const event = {
//             target: {
//                 value: '21'
//             }
//         }
//     wrapper.find('TextField').simulate('change', event)
//     expect(onChange).toHaveBeenCalledWith('This is just for test');
// })
