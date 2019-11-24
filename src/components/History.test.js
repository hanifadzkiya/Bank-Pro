import React from "react";
import History from './History';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';

it('Render History', () => {
    const wrapper = shallow(<History />);
    expect(wrapper.contains(<h2>History</h2>)).toEqual(true);
    expect(wrapper.contains(<p>Pada riwayat transaksi, pengguna dapat melihat daftar data berikut: waktu transaksi, jenis transaksi (debit/kredit),
        jumlah transaksi, dan rekening terkait (jika ada).</p>)).toEqual(true);

    expect(wrapper).toMatchSnapshot();
})