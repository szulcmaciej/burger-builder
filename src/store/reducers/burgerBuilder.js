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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient];
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: newPrice
            }
        case actionTypes.REMOVE_INGREDIENT:
            const oldCount = state.ingredients[action.ingredient];
            if (oldCount > 0){
                const newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient];
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: oldCount - 1
                    },
                    totalPrice: newPrice
                };
            }
            else return state;
        case actionTypes.STORE_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: calculateTotalPrice(action.ingredients),
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;