import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/container.component';

import Logo from '../../assets/logo.png';
import NavbarToggle from './navbar.toggle';
import NavbarList from './navbar.list';

const Navbar = () => {
    //toggle state
    const [active, setActive] = useState(false);

    const menuState = () => {
        setActive(!active);
    }

    return (
        <Container>
            <nav className="navbar">
                <div className="flex items-center justify-between w-full md:w-32">
                    <Link to="/" className="ml-5 w-14 logo animate">
                        <img src={Logo} alt="App Logo"/>
                    </Link>
                    <NavbarToggle active={active} menuState={menuState}/>
                </div>

                <div className={`${active ? 'flex' : 'hidden'} md:flex`}>
                    <NavbarList/>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar
