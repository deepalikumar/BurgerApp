import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient types='bread-top' />
            <BurgerIngredient types='cheese' />
            <BurgerIngredient types='salad' />
            <BurgerIngredient types='meat' />
            <BurgerIngredient types='bread-bottom' />
        </div>
    );
};

export default burger;