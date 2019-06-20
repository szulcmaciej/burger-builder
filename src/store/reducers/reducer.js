import * as actionTypes from '../actions'

const initialState = {
    ingredients: {
        meat: 0,
        cheese: 0,
        bacon: 0,
        salad: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.8
};

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
                ingredients: action.ingredients
            }
        default:
            return state;
    }
}

export default reducer;