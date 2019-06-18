import React from 'react'
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;

    const inputElemClasses = [classes.InputElement];
    if (props.shouldValidate && props.invalid && props.touched){
        inputElemClasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case 'input':
            inputElement = (
                <input 
                    className={inputElemClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.change} />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea 
                    className={inputElemClasses.join(' ')} {
                    ...props.elementConfig} 
                    value={props.value}
                    onChange={props.change} />
            );
            break;

        case 'select':
            inputElement = (
                <select
                    className={inputElemClasses.join(' ')}
                    value={props.value}
                    onChange={props.change} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                        
                </select>
            );
            break;
        default:
            inputElement = (
                <input 
                    className={inputElemClasses.join(' ')} 
                        {...props.elementConfig} 
                            value={props.value}
                            onChange={props.change} />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}  
        </div>
    )
}

export default Input
