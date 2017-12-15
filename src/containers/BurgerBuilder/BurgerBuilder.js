import React, { Component } from 'react';
import Aux from  '../../hoc/Aux';
import Burger from '../../components/Burgers/Burgers';
import BuildControls from '../../components/Burgers/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burgers/OrderSummary/OrderSummary';

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

            totalPrice: 4,
            purchasable: false
            
        }
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
                        .map(igKey => {
                            return ingredients[igKey];
                        }).reduce((sum, el) => {
                            return sum + el;
                        },0);
        this.setState({purchasable: sum > 0 })
        
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
        this.updatePurchaseState(updatedIngredient);
    }
        

    removeIngredientHandler =(type) => {
        const oldTypeCount = this.state.ingredients[type];
        if (oldTypeCount <= 0 ) {
            return;
        };
        const newTypeCount = oldTypeCount - 1;
        const priceDeduction = INGREDIENT_PRICES[type];
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = newTypeCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        });

        this.updatePurchaseState(updatedIngredient);
        
    } 
    
    render() 
    {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal >
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredient={this.state.ingredients} >
                </Burger>
                <BuildControls addIngredient={this.addIngredientHandler}
                                removeIngredient={this.removeIngredientHandler}
                                disabled={disableInfo}
                                purchasable={this.state.purchasable}
                                price={this.state.totalPrice}/>
                
            </Aux>
        );
    }
}

export default BurgerBuilder;