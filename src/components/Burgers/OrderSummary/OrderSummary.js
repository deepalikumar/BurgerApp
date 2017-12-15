import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
             return (
             <li key={igKey + props.ingredients[igKey]}>
                 <span style={{textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
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
        <p> Contiue to Checkout </p>
   </Aux>
    )

};


export default orderSummary;