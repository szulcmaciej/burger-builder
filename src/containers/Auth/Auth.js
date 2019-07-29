import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions'

export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.trim().length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.trim().length <= rules.maxLength && isValid;
            }
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedControls = {
            ...this.state.controls
        }

        const updatedFormElement = { ...updatedControls[inputId] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedControls[inputId] = updatedFormElement;

        let formIsValid = true;
        for (let key in updatedControls) {
            const formElem = updatedControls[key];
            if (formElem.validation && !formElem.valid) {
                formIsValid = false;
            }
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {formElementsArray.map(formElem => (
                        <Input
                            key={formElem.id}
                            elementType={formElem.config.elementType}
                            elementConfig={formElem.config.elementConfig}
                            value={formElem.config.value}
                            change={(event) => this.inputChangedHandler(event, formElem.id)}
                            invalid={!formElem.config.valid}
                            shouldValidate={formElem.config.validation}
                            touched={formElem.config.touched} />
                    ))}
                    <Button type="Success">Login</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password))
});

export default connect(null, mapDispatchToProps)(Auth)
