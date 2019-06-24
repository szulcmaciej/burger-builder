import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.5,
//     meat: 1.5,
//     bacon: 0.8
// };

export class BurgerBuilder extends Component {
    state = {
        ordering: false,
        loading: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response => {
            let ingredients = response.data;
            this.props.storeIngredients(ingredients);
        })
        .catch(error => {});
    }

    // componentDidUpdate(){
    //     let purchasable = this.isBurgerPurchasable(this.props.ingredients);
    //     if (this.state.purchasable !== purchasable){
    //         this.setState({
    //             purchasable: purchasable
    //         });
    //     }
    // }

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
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render() {
        const disabled = {...this.props.ingredients};
        for (let key in disabled){
            disabled[key] = disabled[key] <= 0;
        }

        let orderSummary = null;
        
        let burger = <Spinner />;
        if (this.props.ingredients){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabledInfo={disabled}
                        price={this.props.totalPrice}
                        purchasable={this.isBurgerPurchasable(this.props.ingredients)}
                        order={this.orderNowHandler}
                    />
                </React.Fragment>
            );
            
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    orderContinue={this.orderContinueHandler}
                    orderCancel={this.orderCancelHandler}
                    totalPrice={this.props.totalPrice}/>
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

const mapStateToProps = (state) => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
})

const mapDispatchToProps = dispatch => {
    return {
        storeIngredients: (ingredients) => dispatch({type: actionTypes.STORE_INGREDIENTS, ingredients: ingredients}),
        addIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
        removeIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
