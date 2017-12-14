import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const burger = (props) => {
    const transformedIngredient = Object.keys(props.ingredient).map(igKey => {
        return [...Array(props.ingredient[igKey])].map ((_,index ) => {
            return <BurgerIngredient key={igKey + index } types={igKey} />
        })
    })
    return (
        <div className={classes.Burger}>
            <BurgerIngredient types='bread-top' />
            {transformedIngredient}
            <BurgerIngredient types='bread-bottom' />
        </div>
    );
};

export default burger;