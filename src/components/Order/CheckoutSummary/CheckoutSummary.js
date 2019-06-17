import React from 'react'
import {withRouter} from 'react-router-dom';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type="Danger" click={() => props.checkoutCancelled()}>Cancel</Button>
            <Button type="Success" click={() => props.checkoutContinued()}>Continue</Button>
        </div>
    )
}

export default withRouter(CheckoutSummary)
