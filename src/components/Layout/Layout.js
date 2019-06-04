import React, {Component} from 'react'
import classes from './Layout.module.css';
import Toolbar from '../navigation/Toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    render(){
        return (
            <div className={classes.Layout}>
                <div>
                    <Toolbar />
                    <SideDrawer show={true}/>
                    {/* Toolbar, SideDrawer, Backdrop */}
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout