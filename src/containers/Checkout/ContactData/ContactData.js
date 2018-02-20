import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: 
        {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIPCODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryOption: {

                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'cheapest',
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
       event.preventDefault();
       const formData = {};
       console.log("Here");
       for (let formElementIdentifier in this.state.orderForm) {
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
       }
       const order = {
           ingredient: this.props.ings,
           price: this.props.price,
           orderData: formData
         }
        console.log("order:", order);
         this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        // if(rules.isEmail) {
        //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+
        //     isValid = 
        // }

        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, controlName ) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement =  {
            ...updatedOrderForm[controlName] 
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched  = true;
        console.log(updatedFormElement);
        updatedOrderForm[controlName]  = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm, formIsValid: formIsValid
        })
    }
    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm ) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (                
        <form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button buttonType="Success" clicked={this.orderHandler} 
            disabled={!this.state.formIsValid}> ORDER </Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}> 
                <h4> Enter your contact data </h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));

