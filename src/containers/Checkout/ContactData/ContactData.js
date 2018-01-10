import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address:  {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
       this.setState({loading: true});
       const order = {
           ingredient: this.props.ingredients,
           price: this.props.price,
           customer: {
               name: 'Max',
               address: {
                   street: 'blah',
                   zipCode: '1122',
                   country: 'India'
               },
               email: 'test@test.com',
               deliveryOption: 'Fastest'
            }
         }
        axios.post('/orders.json', order)
           .then(response => {
                this.setState({loading: false})
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading: false})
        });
    }
    render () {
        let form = (                <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="email" placeholder="a@abc.com" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button buttonType="Success" clicked={this.orderHandler}> ORDER </Button>
        </form>);
        if (this.state.loading) {
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

export default ContactData;
