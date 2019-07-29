import React from 'react'
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">My orders</NavigationItem>
            <NavigationItem link="/auth">Authorization</NavigationItem>
        </ul>
    )
}

export default NavigationItems
