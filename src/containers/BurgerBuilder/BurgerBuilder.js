import React, { Component } from 'react';
import Aux from  '../../hoc/Aux';
import Burger from '../../components/Burgers/Burgers';
import BuildControls from '../../components/Burgers/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ingredients: {
                'salad': 0,
                'cheese': 0,
                'bacon': 0,
                'meat': 0
            }
        }
    }
    render() 
    {
        return(
            <Aux>
                <Burger ingredient={this.state.ingredients} >
                </Burger>
                <BuildControls />
            </Aux>
        );
    }
}

export default BurgerBuilder;