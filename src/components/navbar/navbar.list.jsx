import React from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './nav.item'
import Button from '../buttons/button.component';
import { connect } from 'react-redux';
import { logout } from '../../data/reducers/auth';

const NavbarList = ({history,logout,isAuth}) => {
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
            {isAuth && (
                <Button
                    title='Logout'
                    moreStyle='hover:text-primary'
                    action= {() => {
                        logout()
                    }}
                />
            )}
            {!isAuth && (
                <>
                <Button
                    title='Login'
                    moreStyle='hover:text-primary'
                    isButton={false}
                    href='/login'
                />
                <Button
                    title='Register'
                    moreStyle='hover:text-primary'
                    isButton={false}
                    href='/register'
                />
                </>
            )}
            <Button
                isButton={false}
                href='/cart'
                title='cart'
                moreStyle='bg-primary text-white uppercase w-15 md:ml-7'
            />
        </ul>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {logout})(withRouter(NavbarList));
