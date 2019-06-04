import React from 'react'
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} click={props.dismiss} />
        <div 
            className={classes.Modal}
            style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0' 
            }}>
            {props.children}
        </div>
    </React.Fragment>
    
)

export default Modal
