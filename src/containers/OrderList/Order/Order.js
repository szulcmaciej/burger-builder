import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {

    const ingredients = Object.keys(props.ingredients).map((ingredient) => {
        if (props.ingredients[ingredient] > 0){
            return (
                <li key={ingredient}>{ingredient} ({props.ingredients[ingredient]})</li>
            );
        }
        else return null;
        
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Price: <strong>${parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
