import React from 'react'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => (
            <li key={ingKey}>
                <span style={{textTransform: "capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}
            </li>
        ))
    return (
        <React.Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button type='Success' click={props.orderContinue}>YES</Button>
            <Button type='Danger' click={props.orderCancel}>NO</Button>
        </React.Fragment>
    )
}

export default OrderSummary
