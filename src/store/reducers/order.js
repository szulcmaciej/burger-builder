import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    loading: false,
    error: null,
    orders: [],
    purchased: false
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
}

const purchaseBurgerSuccess = (state, action) => {
    const finishedOrder = {
        id: action.orderId,
        ...action.orderData
    }
    const updatedProperties = {
        loading: false,
        orders: state.orders.concat(finishedOrder),
        purchased: true
    };
    return updateObject(state, updatedProperties);
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    });
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false });
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
}

export default reducer