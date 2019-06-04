import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    const sideDrawerClasses = [classes.SideDrawer];
    if(props.show){
        sideDrawerClasses.push(classes.Open);
    }
    else{
        sideDrawerClasses.push(classes.Close);
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} click={props.hide}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
        
    )
}

export default SideDrawer
