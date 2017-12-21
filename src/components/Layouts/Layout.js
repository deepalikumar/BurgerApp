import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.css';
import TooBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: true
        }
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    render(){
        return (
            <Aux>
            <TooBar />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}> 
                    {this.props.children}
                </main>
        </Aux>
        );
    }
};

export default Layout;