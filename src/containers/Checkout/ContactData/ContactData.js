import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                // console.log(response);
                // this.setState({loading: false, ordering: false});
                this.setState({loading: false});
                this.props.history.push('/my-orders');
            })
            .catch(error => {
                console.log(error);
                // this.setState({loading: false, ordering: false});
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <div className={classes.ContactData}>
                <h1>Enter your contact data</h1>
                <form>
                    <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                    <Input inputtype="input" type="email" name="email" placeholder="Email" />
                    <Input inputtype="input" type="text" name="street" placeholder="Street" />
                    <Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code" />
                    {/* <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postalCode" placeholder="Postal Code" /> */}
                    <Button type="Success" click={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
        if (this.state.loading){
            form = (
                <Spinner />
            );
        }

        return form;
    }
}

export default ContactData
