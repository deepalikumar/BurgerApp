import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';


class Checkout extends Component {
    componentWillMount() {
        this.props.onPurchaseInit();
    }
    // state = {
    //     ingredient: null,
    //     totalPrice: 0
    // }
    //   componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredient = {};
    //     let price = 0;
    //     for ( let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredient[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredient: ingredient, totalPrice: price});
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    }

    checkoutContinuedHandler = () => {  
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings ) {
            const purchasedRedirect = this.props.purchased? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredient={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => (dispatch(actions.purchaseInit()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);