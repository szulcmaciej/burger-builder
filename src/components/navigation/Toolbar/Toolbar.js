import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggleBurger from './DrawerToggleBurger/DrawerToggleBurger';
import PropTypes from 'prop-types';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggleBurger click={props.toggleDrawer}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

Toolbar.propTypes = {
    toggleDrawer: PropTypes.func.isRequired
}

export default Toolbar
