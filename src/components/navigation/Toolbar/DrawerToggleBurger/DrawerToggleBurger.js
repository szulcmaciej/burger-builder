import React from 'react'
import classes from './DrawerToggleBurger.module.css';
import PropTypes from 'prop-types';

const DrawerToggleBurger = (props) => {
    return (
        <div className={classes.DrawerToggleBurger} onClick={props.click}>
            <div />
            <div />
            <div />
        </div>
    )
}

DrawerToggleBurger.propTypes = {
    click: PropTypes.func.isRequired
};

export default DrawerToggleBurger
