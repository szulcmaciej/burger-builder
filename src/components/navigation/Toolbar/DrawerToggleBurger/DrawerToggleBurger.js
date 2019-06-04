import React from 'react'
import classes from './DrawerToggleBurger.module.css';

const DrawerToggleBurger = (props) => {
    return (
        <div className={classes.DrawerToggleBurger} onClick={props.click}>
            <div />
            <div />
            <div />
        </div>
    )
}

export default DrawerToggleBurger
