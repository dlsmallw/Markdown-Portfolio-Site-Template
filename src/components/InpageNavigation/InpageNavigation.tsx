import { useState } from "react";

import styles from './InpageNavigation.module.css'

const InpageNavBtn: React.FC<{ isActive: boolean, onClick: () => void, children: React.ReactNode }> = ({ isActive, onClick, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button id='inpage-nav-btn' onClick={onClick} style={{
            borderRight: isActive ? '1px solid #ccc' : '1px solid transparent',
            opacity: isHovered ? 0.7 : 1,
            backgroundImage: isHovered ? 'linear-gradient(to right, transparent, #cccccc36)' : 'none',
            
        }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {children}
        </button>
    )
}

const InpageNavbarContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return ( 
        <div className='side-panel' id='left-grid' >
            <div id='inpage-nav-container' >
                <div id='inpage-navbar'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { InpageNavBtn, InpageNavbarContainer }