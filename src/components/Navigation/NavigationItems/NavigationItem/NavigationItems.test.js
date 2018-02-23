import React from 'react';
import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import NavigationItems from '../NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({ adapter: new Adaptor()})

describe('<NavigationItems />', () => {
    it('should render two <NavigationItems /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    } )
});