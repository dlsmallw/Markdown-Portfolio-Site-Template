import React from 'react';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
        <Nav.Link style={{
            ...CustomStyles.navLinkContainer,
            color: location.pathname === to ? '#fff' : CustomStyles.navbarText.color,
            opacity: location.pathname !== to && isHovered ? 0.7 : 1,
            cursor: location.pathname !== to ? 'pointer' : 'default',
            borderBottom: `2px solid ${location.pathname === to ? '#61dafb' : 'transparent'}`,
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
        <BSNavbar className='Navbar-Container' expand="sm" sticky="top" style={CustomStyles.navbar}>
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
        width: '100%',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        height: 'max(8vh, 50px)',
    },
    navContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    navbarText: {
        color: '#E7E7E9',
    },
    navLinkContainer: {
        margin: '0 5px 0 5px',
        transition: 'opacity 0.3s ease',
        height: '100%',
        alignItems: 'center',
    },
};

export default Navbar;