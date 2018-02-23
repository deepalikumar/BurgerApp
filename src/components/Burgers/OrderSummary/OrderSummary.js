import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = () =>  {
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
             return (
             <li key={igKey + this.props.ingredients[igKey]}>
                 <span style={{textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
             </li> 
                )
            });
    return (
    <Aux>
        <h3> Your Order </h3>
        <p> Delicous burger from the following ingredients: </p>
        <ul>        
            {ingredientSummary}
        </ul>
        <p><strong> Total Price: {this.props.price.toFixed(2)}</strong> </p>
        <p> Contiue to Checkout ?</p>
        <Button buttonType='Danger' clicked={this.props.purchaseCancelled}> CANCEL </Button>
        <Button buttonType='Success' clicked={this.props.purchaseContinue}>CONTINUE </Button>
   </Aux>
    )
    

};


export default orderSummary;