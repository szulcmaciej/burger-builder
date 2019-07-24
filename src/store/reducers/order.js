import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: null,
    orders: [],
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const finishedOrder =  {
                    id: action.orderId,
                    ...action.orderData
                }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(finishedOrder),
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.FETCH_ORDERS_START:
            // console.log('fetch start');
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            // console.log('fetch success');
            // console.log(action.orders);
            return {
                ...state,
                loading: false,
                orders: action.orders
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            // console.log('fetch fail');
            // console.log(action.error);
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default reducer