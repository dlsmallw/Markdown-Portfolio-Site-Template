import React, { useState, type HTMLAttributes } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Navbar as BSNavbar, Container, Nav, Offcanvas, type NavLinkProps } from 'react-bootstrap';

import { useIsMobile } from '@utils/event-listeners';

import { ThemeToggle } from '@components';
import HamburgerIcon from '@assets/hamburger-menu-icon.svg?react';

import styles from './component.module.css';

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
        <Nav.Link className={`${styles.navLinkContainer} ${props.className ?? ''}`} 
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
        <Nav style={{ margin: !isMobile ? '0 1rem' : 'unset' }}>
            <ThemeToggle />
        </Nav>
    )
}

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    sidebarContent?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarContent, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const show = isMobile && Boolean(sidebarContent) && isOpen;

    return (
        <div className={styles.container}>
            <BSNavbar className={`${styles.navbarContainer} ${props.className ?? ''}`} sticky="top">
                <Container className='justify-content-center'>
                    <BSNavbar.Collapse id="basic-navbar-nav">

                        <HamburgerButton 
                            className={show ? styles.offCanvasActive : ''} 
                            onClick={() => {
                                setIsOpen((current) => !current);
                            }} 
                            style={{
                                visibility: (isMobile && sidebarContent !== null) ? 'visible': 'hidden',
                                margin: !isMobile ? '0 1rem' : 'unset',
                            }}
                        />
                    
                        <Nav className={`${styles.navbarInnerContainer} mx-auto `} >
                            {/* Dynamically loads and populates nav route buttons based on the file structure from the markdown directory */}
                            {__ROUTES__ && __ROUTES__.length > 1 && __ROUTES__.map((route, index) => {
                                return <NavLink key={`page-nav-${index}`} to={route.pathName}>{route.navLabel}</NavLink>
                            })}
                        </Nav>

                        <ThemeToggleButton />
                    </BSNavbar.Collapse>
                </Container>
            </BSNavbar>

            <Offcanvas show={show} onHide={() => setIsOpen(false)}>
                {sidebarContent}
            </Offcanvas>
        </div>
       
    )
}

export default Navbar;