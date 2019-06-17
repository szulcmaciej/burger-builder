import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    inputChangedHandler = (event, inputId) => {
        //TODO
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {...updatedOrderForm[inputId]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputId] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm
        })
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }

        axios.post('/orders.json', order)
            .then(response => {
                // console.log(response);
                // this.setState({loading: false, ordering: false});
                this.setState({ loading: false });
                this.props.history.push('/my-orders');
            })
            .catch(error => {
                console.log(error);
                // this.setState({loading: false, ordering: false});
                this.setState({ loading: false });
            });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <div className={classes.ContactData}>
                <h1>Enter your contact data</h1>
                <form>
                    {formElementsArray.map(formElem => (
                        <Input
                            key={formElem.id}
                            elementType={formElem.config.elementType}
                            elementConfig={formElem.config.elementConfig}
                            value={formElem.config.value}
                            change={(event) => this.inputChangedHandler(event, formElem.id)} />
                    ))}

                    <Button type="Success" click={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
        if (this.state.loading) {
            form = (
                <Spinner />
            );
        }

        return form;
    }
}

export default ContactData
