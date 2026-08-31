import React from 'react';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
    const location = useLocation();
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Nav.Link as={Link} to={to} style={{
            ...CustomStyles.navLinkContainer,
            color: location.pathname === to ? '#fff' : CustomStyles.navbarText.color,
            opacity: location.pathname !== to && isHovered ? 0.7 : 1,
            cursor: location.pathname !== to ? 'pointer' : 'default',
            borderBottom: location.pathname === to ? '2px solid #61dafb' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </Nav.Link>
    );
}

const Navbar: React.FC = () => {
    return (
        <BSNavbar expand="sm" sticky="top" style={CustomStyles.navbar}>
            <Container className="justify-content-center">
                <Nav style={CustomStyles.navContainer}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/portfolio">Portfolio</NavLink>
                </Nav>
            </Container>
        </BSNavbar>
    )
}

const CustomStyles: Record<string, React.CSSProperties> = {
    navbar: {
        backgroundColor: '#21252C',
        padding: '10px 20px',
        width: '100%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    navContainer: {
        justifyContent: 'space-between',
    },
    navbarText: {
        color: '#E7E7E9',
    },
    navLinkContainer: {
        margin: '0 5px 0 5px',
        transition: 'opacity 0.3s ease'
    },
};

export default Navbar;