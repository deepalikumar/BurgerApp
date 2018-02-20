import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => (
    <header className={classes.TooBar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}> 
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolBar;