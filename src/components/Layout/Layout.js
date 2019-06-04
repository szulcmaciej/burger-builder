import React, {Component} from 'react'
import classes from './Layout.module.css';
import Toolbar from '../navigation/Toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        displayDrawer: false
    }

    toggleDrawer = () => {
        this.setState((prevState) => {
            return {
                displayDrawer: !prevState.displayDrawer
            }
        });
    }

    render(){
        return (
            <div className={classes.Layout}>
                <div>
                    <Toolbar toggleDrawer={this.toggleDrawer}/>
                    <SideDrawer show={this.state.displayDrawer} hide={this.toggleDrawer}/>
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout