import { HTMLAttributes, useState } from "react";
import { SidePanel } from "../SidePanel/SidePanel";

import styles from './InpageNavigation.module.css';

const DummyRightPanel: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
    return (
        // <div className='section-panel' id='dummy-right-grid' />
        <SidePanel className={styles.dummyRightGrid} />
    )
}

interface InpageNavButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
}

const InpageNavButton: React.FC<InpageNavButtonProps> = ({ isActive, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.inpageNavButtonContainer} 
            style={{
                // borderRight: `2px solid ${isActive ? '#ccc' : 'transparent'}`,
                borderRight: `2px solid ${isActive ? 'color-mix(in srgb, var(--text-main) 30%, transparent)' : 'transparent'}`,
                opacity: isHovered ? 0.7 : 1,
                // backgroundImage: isHovered ? 'linear-gradient(to right, transparent, #cccccc36)' : 'none',
                backgroundImage: isHovered ? 'linear-gradient(to right, transparent, var(--bg-tertiary))' : 'none',
                }} >
            <button className={`${styles.inpageNavButton} ${props.className}`} 
                
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
                {...props} 
            />
        </div>
        
    )
}

const InpageNavbarContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return ( 
        // <div className='side-panel' id='left-grid' >
        //     <div id='inpage-nav-container' >
        //         <div id='inpage-navbar'>
        //             {children}
        //         </div>
        //     </div>
        // </div>

        <SidePanel className={styles.leftGrid} >
            <div className={styles.inpageNavContainer} >
                <div className={styles.inpageNavbar}>
                    {children}
                </div>
            </div>
        </SidePanel>
    )
}

export { InpageNavButton as InpageNavBtn, InpageNavbarContainer, DummyRightPanel };