import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.css';
import TooBar from '../Navigation/ToolBar/ToolBar';

const layout = (props) => (
    <Aux>
        <TooBar />
            <main className={styles.Content}> 
                {props.children}
            </main>
    </Aux>
);

export default layout;