import React, { HTMLAttributes } from 'react';
import { Navbar as BSNavbar, Container, Nav, NavLinkProps } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './component.module.css';
import { ThemeToggle } from '../ThemeToggle';

interface NavigationLinkProps extends NavLinkProps {
    to: string;
}

const NavLink: React.FC<NavigationLinkProps> = ({ to, ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = React.useState(false);

    const handleNavigation = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetPath: string) => {
        e.preventDefault();
        // Block navigation if already on this page
        if (location.pathname === targetPath) return; 
        navigate(targetPath);
    };

    return (
        <Nav.Link className={`${styles.navLinkContainer} ${props.className}`} 
            style={{
                color: location.pathname === to ? 'var(--text-main)' : 'color-mix(in srgb, var(--text-main) 70%, transparent)',
                opacity: location.pathname !== to && isHovered ? 0.7 : 1,
                cursor: location.pathname !== to ? 'pointer' : 'default',
                borderBottom: `2px solid ${location.pathname === to ? 'color-mix(in srgb, var(--text-main) 70%, transparent)' : 'transparent'}`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => handleNavigation(e, to)}
            {...props}
        />
    );
}

const Navbar: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <BSNavbar className={`${styles.navbarContainer} ${props.className}`} sticky="top">
            <Container className='justify-content-center'>
                <BSNavbar.Collapse id="basic-navbar-nav">

                
                    <Nav className={`${styles.navbarInnerContainer} mx-auto `} >
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/portfolio">Portfolio</NavLink>
                    </Nav>
                    <Nav className={`${styles.navbarInnerContainer} `}>
                        <ThemeToggle />
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    )
}

export default Navbar;