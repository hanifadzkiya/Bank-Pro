import React from "react";
import Transfer from './Transfer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Login from "./Login";

it('Render Transfer', () => {
    const wrapper = shallow(<Transfer />);
    expect(wrapper.contains(<h2>Transfer</h2>)).toEqual(true);
    expect(wrapper.contains(<p>Pengguna dapat mentransfer uang ke rekening lain di Bank Pro.
        Tidak ada potongan tambahan ketika mentransfer ke rekening bank lain.
        Saat transaksi selesai, ada pesan berhasil atau gagal yang muncul.</p>)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
})


it('check form',()=>
{
    const preventDefault = jest.fn();
    const wrapper = shallow(<Transfer/>);
    wrapper.find('input[type="number"]').simulate('change', {preventDefault, target: {value: 1000,name: 'Nominal'}});
    expect(wrapper.state('Nominal')).toEqual(1000);
});

it('check form2',()=>
{
    const preventDefault = jest.fn();
    const wrapper = shallow(<Transfer/>);
    wrapper.find('input[type="text"]').simulate('change', {preventDefault, target: {value: '1000',name: 'NomorPenerima'}});
    expect(wrapper.state('NomorPenerima')).toEqual('1000');
});