import React from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './nav.item'
import Button from '../buttons/button.component';

const NavbarList = ({history}) => {
    const isActive = (history, path) => {
        if(history.location.pathname === path){
            return 'text-primary';
        } else {
            return '';
        }
    };

    return (
        <ul className="flex flex-col flex-wrap font-bold text-center md:mr-5 md:flex-row">
            <NavItem 
                link='/' 
                name='Home' 
                listStyle={isActive(history,'/')}
            />
            <NavItem 
                link='/shop' 
                name='Shop' 
                listStyle={isActive(history,'/shop')}
            />
            <NavItem 
                link='/dashboard' 
                name='Dashboard' 
                listStyle={isActive(history,'/dashboard')}
            />
            <Button
                title='Signout'
                moreStyle='hover:text-primary'
                action= {() => {
                    console.log('signout')
                }}
            />
            <Button
                isButton={false}
                href='/cart'
                title='cart'
                moreStyle='bg-primary text-white uppercase w-15 md:ml-7'
            />
        </ul>
    )
}

export default withRouter(NavbarList);
