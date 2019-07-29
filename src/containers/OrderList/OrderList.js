import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './OrderList.module.css'
import Order from './Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'

export class OrderList extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount(){
        // this.fetchOrders();
        this.props.fetchOrders(this.props.token);
    }

    // fetchOrders = () => {
    //     axios.get('/orders.json')
    //         .then(response => {
    //             const orders = [];
    //             if (response && response.data){
    //                 for (let key in response.data){
    //                     orders.push({
    //                         ...response.data[key],
    //                         id: key
    //                     });
    //                 }
    //             }

    //             this.setState({
    //                 orders: orders,
    //                 loading: false
    //             });
    //         })
    //         .then(error => {
    //             if (error){
    //                 console.log(error);
    //             }
    //         });
    // }

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
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token) => dispatch(actions.fetchOrders(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderList, axios))
