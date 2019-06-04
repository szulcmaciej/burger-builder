import React, { Component } from 'react'
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

class OrderSummary extends Component {
    // componentDidUpdate(){
    //     console.log('summary update');
    // }

    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.ingredients !== this.props.ingredients);
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => (
                <li key={ingKey}>
                    <span style={{ textTransform: "capitalize" }}>{ingKey}</span>: {this.props.ingredients[ingKey]}
                </li>
            ))
        return (
            <div className={classes.OrderSummary}>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p className={classes.center}><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p className={classes.center}>Continue to checkout?</p>
                <div className={classes.buttonWrapper}>
                    <Button type='Success' click={this.props.orderContinue}>YES</Button>
                    <Button type='Danger' click={this.props.orderCancel}>NO</Button>
                </div>
            </div>
        )
    }
}

export default OrderSummary
