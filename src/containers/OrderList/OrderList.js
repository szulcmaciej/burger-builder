import React, { Component } from 'react'
import classes from './OrderList.module.css'
import Order from './Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class OrderList extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        this.fetchOrders();
    }

    fetchOrders(){
        // this.setState({
        //     orders: [
        //         {
        //             ingredients: {
        //                 bacon: 1,
        //                 cheese: 1,
        //                 meat: 0
        //             },
        //             price: 10
        //         },
        //         {
        //             ingredients: {
        //                 bacon: 1,
        //                 cheese: 1,
        //                 meat: 0
        //             },
        //             price: 10
        //         },
        //     ]
        // })

        axios.get('/orders.json')
            .then(response => {
                const orders = [];
                if (response && response.data){
                    for (let key in response.data){
                        orders.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                }

                this.setState({
                    orders: orders,
                    loading: false
                });
            })
            .then(error => console.log(error));
    }

    render() {
        let orders = null;
        if(this.state.loading){
            orders = <Spinner />
        }
        else{
            if(this.state.orders){
                orders = this.state.orders.map(order => (
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

export default withErrorHandler(OrderList, axios)
