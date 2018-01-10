import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address:  {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = () => {
        
    }
    render () {
        return (
            <div className={classes.ContactData}> 
                <h4> Enter your contact data </h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="email" placeholder="a@abc.com" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button buttonType="Success" clicked={this.orderHandler}> ORDER </Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
