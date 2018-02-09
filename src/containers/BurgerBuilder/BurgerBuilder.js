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
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    constructor (props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
            error: true
        }
    }

    componentDidMount () {
        axios.get ('https://react-my-burger-bfd95.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true});
            })
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
        
        let burger = this.state.error ? <p> Sorry!! This burger can't be loaded. </p> : <Spinner /> 
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

        if (this.state.loading) {
            console.log('inside spinner');
            orderSummary = <Spinner />
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
        price: state.totalPrice
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        removeIngredientHandler: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })

    }
}

export default connect(mapsStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder , axios));