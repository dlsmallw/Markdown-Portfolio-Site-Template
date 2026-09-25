import React from 'react';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Navbar.module.css';

const NavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = React.useState(false);

    const handleNavigation = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetPath: string) => {
        e.preventDefault();
        // Block navigation if already on this page
        if (location.pathname === targetPath) {
        return; 
        }
        navigate(targetPath);
    };

    return (
        <Nav.Link className='nav-link-container' style={{
            color: location.pathname === to ? 'var(--text-muted)' : 'var(--text-main)',
            opacity: location.pathname !== to && isHovered ? 0.7 : 1,
            cursor: location.pathname !== to ? 'pointer' : 'default',
            borderBottom: `2px solid ${location.pathname === to ? 'var(--border-color)' : 'transparent'}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => handleNavigation(e, to)}
        >
            {children}
        </Nav.Link>
    );
}

const Navbar: React.FC = () => {
    return (
        <BSNavbar className='Navbar-Container' expand="sm" sticky="top">
            <Container className="justify-content-center">
                <Nav className='navbar-inner-container' >
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/portfolio">Portfolio</NavLink>
                </Nav>
            </Container>
        </BSNavbar>
    )
}

export default Navbar;