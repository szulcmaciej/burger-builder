import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    base: 4,
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.8
};

const calculateTotalPrice = (ingredients) => {
    let price = INGREDIENT_PRICES.base;
    for (let ingredient in ingredients) {
        price += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
    }
    return price;
}

const addIngredient = (state, action) => {
    const newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient];
    const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: newPrice
    });
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const oldCount = state.ingredients[action.ingredient];
            if (oldCount > 0) {
                const newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient];
                const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] - 1 };
                const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
                const updatedState = updateObject(state, {
                    ingredients: updatedIngredients,
                    totalPrice: newPrice
                });
                return updateObject(state, updatedState);
            }
            else return state;
}

const storeIngredients = (state, action) => {
    const updatedSt = {
        ingredients: action.ingredients,
        totalPrice: calculateTotalPrice(action.ingredients),
        error: false
    }
    return updateObject(state, updatedSt);
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.STORE_INGREDIENTS: return storeIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;