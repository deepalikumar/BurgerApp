import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.css';
import TooBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
const layout = (props) => (
    <Aux>
        <TooBar />
        <SideDrawer />
            <main className={styles.Content}> 
                {props.children}
            </main>
    </Aux>
);

export default layout;