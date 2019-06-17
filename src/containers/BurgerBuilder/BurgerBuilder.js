import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.8
};

export class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        ordering: false,
        loading: false
    }

    componentDidUpdate(){
        // console.log('[BurgerBuilder] update');
    }

    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response => {
            let ingredients = response.data;
            let purchasable = this.isBurgerPurchasable(ingredients);
            this.setState({
                ingredients: ingredients,
                purchasable: purchasable
            });
        })
        .catch(error => {});
    }

    isBurgerPurchasable = (ingredients) => {
        let totalIngredients = 0;
        for (let key in ingredients){
            totalIngredients += ingredients[key];
        }
        return totalIngredients > 0;
    }

    orderNowHandler = () => {
        this.setState({ordering: true});
    }

    orderCancelHandler = () => {
        this.setState({ordering: false});
    }

    orderContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        const purchasable = this.isBurgerPurchasable(updatedIngredients);

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
            purchasable: purchasable
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAddition;

            const purchasable = this.isBurgerPurchasable(updatedIngredients);

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice,
                purchasable: purchasable
            });
        }
    } 

    render() {
        const disabled = {...this.state.ingredients};
        for (let key in disabled){
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = null;
        
        let burger = <Spinner />;
        if (this.state.ingredients){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledInfo={disabled}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.orderNowHandler}
                    />
                </React.Fragment>
            );
            
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    orderContinue={this.orderContinueHandler}
                    orderCancel={this.orderCancelHandler}
                    totalPrice={this.state.totalPrice}/>
            );
        }

        if (this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.ordering} dismiss={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
