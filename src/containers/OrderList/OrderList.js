import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './OrderList.module.css'
import Order from './Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'

export class OrderList extends Component {

    componentDidMount(){
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;
        if(this.props.loading){
            orders = <Spinner />
        }
        else{
            if(this.props.orders){
                orders = this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))
            }
        }

        return (
            <div className={classes.OrderList}>
                <h1>My Orders</h1>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderList, axios))
