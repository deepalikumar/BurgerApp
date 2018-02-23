import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burgers/BuildControls/BuildControls';

configure({ adapter: new Adaptor()});

describe('<BurgerBuilder />', () => {
    let wrapper ;

    beforeEach(()=> {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>);
    })

    it("should render <BuildControls /> when recieving ingredients ", () => {
        wrapper.setProps({ings: {salad: 0 }});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})
