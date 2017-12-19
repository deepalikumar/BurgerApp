import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => (
    <header className={classes.TooBar}>
        <div> MENU </div>
        <div className={classes.Logo}> 
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolBar;