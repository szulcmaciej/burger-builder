import React, { Component } from 'react'
import classes from './Layout.module.css';
import Toolbar from '../navigation/Toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

class Layout extends Component {
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

    render() {
        return (
            <div className={classes.Layout}>
                <div>
                    <Toolbar
                        toggleDrawer={this.toggleDrawer}
                        isAuth={this.props.isAuthenticated} />
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        show={this.state.displayDrawer}
                        hide={this.toggleDrawer} />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null,
})

export default connect(mapStateToProps)(Layout);