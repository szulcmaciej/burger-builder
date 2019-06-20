import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'


export class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         bacon: 1,
    //         cheese: 1
    //     },
    //     price: 0
    // }

    // componentDidMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){
    //         if (param[0] === 'price'){
    //             price = param[1];
    //         }
    //         else{
    //             ingredients[param[0]] = parseInt(param[1]);
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         price: price
    //     })
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div className={classes.Checkout}>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData ingredients={this.props.ingredients} price={this.props.price} {...props}/>} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    price: state.totalPrice
})

// const mapDispatchToProps = dispatch => ({
    
// })


export default connect(mapStateToProps)(Checkout);
