import React, { Component } from 'react';
import Aux from  '../../hoc/Aux/Aux';
import Burger from '../../components/Burgers/Burgers';
import BuildControls from '../../components/Burgers/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burgers/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axiosOrder';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
    constructor (props) {
        super(props);
        this.state = {
            purchasing: false
        }
    }

    componentDidMount () {
       this.props.initIngredients();     
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                        .map(igKey => {
                            return ingredients[igKey];
                        }).reduce((sum, el) => {
                            return sum + el;
                        },0);
        return sum > 0;
        
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })  
    }

    purchaseCancelHandler = () => {

        this.setState({
            purchasing: false
        })
    }
   
    purchaseContinueHandler = () => {

        // const queryParams = [];
        // for (let ingKey in this.state.ingredients ) {
        //     queryParams
        //     .push(encodeURIComponent(ingKey) + '=' + 
        //     encodeURIComponent(this.state.ingredients[ingKey]) )
        // }

        // queryParams.push('price' + this.props.total);
        // const queryString = queryParams.join('&');

        
        this.props.history.push('/checkout');   

    }
    render() 
    {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = this.props.error ? <p> Sorry!! This burger can't be loaded. </p> : <Spinner /> 
        if (this.props.ings) {
            burger = (
                <Aux>
]                    <Burger ingredient={this.props.ings} >
                    </Burger>
                    <BuildControls addIngredient={this.props.addIngredientHandler}
                                removeIngredient={this.props.removeIngredientHandler}
                                disabled={disableInfo}
                                purchasable={this.updatePurchaseState(this.props.ings)}
                                price={this.props.price}
                                ordered={this.purchaseHandler}/>
                
                </Aux>
            );
            orderSummary =  <OrderSummary ingredients={this.props.ings} purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}/>
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error 
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingName) => 
            dispatch(burgerBuilderActions.addIngredients(ingName)),
        removeIngredientHandler: (ingName) => 
            dispatch(burgerBuilderActions.removeIngredients(ingName)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients())

    }
}

export default connect(mapsStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder , axios));