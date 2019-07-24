import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    }
}

export const storeIngredients = ingredients => {
    return {
        type: actionTypes.STORE_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            let ingredients = response.data;
            dispatch(storeIngredients(ingredients));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
};