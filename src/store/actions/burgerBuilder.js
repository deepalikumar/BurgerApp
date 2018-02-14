import * as actionTypes from './actionsTypes';
import axios from '../../axiosOrder';


export const addIngredients = (name) => {
   return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name  
   }  
}



export const removeIngredients = (name) => {
    return {
         type: actionTypes.REMOVE_INGREDIENT,
         ingredientName: name  
    }  
 }

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch =>  {
        axios.get ('https://react-my-burger-bfd95.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientFailed());
        })
    }
}