import React, { Component } from 'react';
import Aux from  '../../hoc/Aux';
import Burger from '../../components/Burgers/Burgers';
import BuildControls from '../../components/Burgers/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ingredients: {
                'salad': 0,
                'cheese': 0,
                'bacon': 0,
                'meat': 0
            },

            totalPrice: 4
            
        }
    }

    addIngredientHandler = (type) => {
        const oldTypeCount = this.state.ingredients[type];
        const updatedCount = oldTypeCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };

        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice,
                        ingredients: updatedIngredient });
        
    }
        

    removeIngredientHandler =(type) => {

    } 
    
    render() 
    {
        return(
            <Aux>
                <Burger ingredient={this.state.ingredients} >
                </Burger>
                <BuildControls addIngredient={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;