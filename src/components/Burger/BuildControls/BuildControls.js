import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Salad', type:'salad'},
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(c => {
                return (
                    <BuildControl
                        label={c.label}
                        key={c.label}
                        added={() => props.ingredientAdded(c.type)}
                        removed={() => props.ingredientRemoved(c.type)}
                        removingDisabled={props.disabledInfo[c.type]}
                        />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.order}>
                {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }
            </button>
        </div>
    )
}

export default BuildControls
