import React from 'react'
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const authElem = props.isAuth ? 
        <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authentication</NavigationItem>

    //  const authElem = <NavigationItem link="/logout">Logout</NavigationItem>;

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">My orders</NavigationItem>
            {authElem}
        </ul>
    )
}

export default NavigationItems
