import React from 'react'
// import PropTypes from 'prop-types'
import classes from './BuildControl.module.css';

const BuildControl = props => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>
                {props.label}
            </div>
            <button 
                className={classes.Less}
                onClick={props.removed}
                disabled={props.removingDisabled}>
                Less
            </button>
            <button 
                className={classes.More}
                onClick={props.added}>
                More
            </button>
        </div>
    )
}

// BuildControl.propTypes = {

// }

export default BuildControl
