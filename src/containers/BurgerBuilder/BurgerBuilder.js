import React, { Component } from 'react';
import Aux from  '../../hoc/Aux';
import Burger from '../../components/Burgers/Burgers';

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
                <div> Build Controls </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;