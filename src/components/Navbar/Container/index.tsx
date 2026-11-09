import React, { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Navbar as BSNavbar, Container, Nav, Offcanvas, type NavLinkProps } from 'react-bootstrap';

import { ThemeToggle } from '@components';
import HamburgerIcon from '/public/assets/icons/hamburger-menu-icon.svg?react';

import styles from './component.module.css';
import { useIsMobile } from '@utils/EventListeners';

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

const HamburgerButton: React.FC<Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>> = ({ ...props }) => {
    return (
        <Nav 
            {...props}
            className={`${styles.hamburgerButton} ${props.className ?? ''}`} 
            onClick={props.onClick}
        >
            <HamburgerIcon />
        </Nav>
    )
}

const ThemeToggleButton = () => {
    const isMobile = useIsMobile();

    return (
        <Nav
            style={{
                margin: !isMobile ? '0 1rem' : 'unset',
            }}
        >
            <ThemeToggle />
        </Nav>
    )
}

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    sidebarContent?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarContent, ...props }) => {
    const [show, setShow] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!isMobile || !sidebarContent) setShow(false);
    }, [isMobile, sidebarContent])

    return (
        <div className={styles.container}>
            <BSNavbar className={`${styles.navbarContainer} ${props.className}`} sticky="top">
                <Container className='justify-content-center'>
                    <BSNavbar.Collapse id="basic-navbar-nav">

                        <HamburgerButton 
                            className={show ? styles.offCanvasActive : ''} 
                            onClick={() => {
                                setShow(!show);
                            }} 
                            style={{
                                visibility: (isMobile && sidebarContent !== null) ? 'visible': 'hidden',
                                margin: !isMobile ? '0 1rem' : 'unset',
                            }}
                        />
                    
                        <Nav className={`${styles.navbarInnerContainer} mx-auto `} >
                            {__ROUTES__ && __ROUTES__.length > 1 && __ROUTES__.map((route, index) => {
                                return <NavLink key={`page-nav-${index}`} to={route.pathName}>{route.navLabel}</NavLink>
                            })}
                        </Nav>

                        <ThemeToggleButton />
                    </BSNavbar.Collapse>
                </Container>
            </BSNavbar>

            <Offcanvas show={show} onHide={() => setShow(false)}>
                {sidebarContent}
            </Offcanvas>
        </div>
       
    )
}

export default Navbar;