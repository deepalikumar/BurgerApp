import React from 'react';
import Burger from '../../Burgers/Burgers';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}> 
            <h1> We hope it tastes good!! </h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredient={props.ingredient}/>
            </div>
            <Button 
                buttonType="Danger"
                clicked> CANCEL </Button>
            <Button 
                buttonType="Success"
                clicked> SUCCESS </Button>
        </div>
    );

}

export default checkoutSummary;