import { HTMLAttributes, useState } from "react";
import { SidePanel } from "../SidePanel";

import styles from './component.module.css';

const DummyRightPanel: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <SidePanel className={styles.dummyRightGrid} {...props} />;
}

interface InpageNavButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
}

const InpageNavButton: React.FC<InpageNavButtonProps> = ({ isActive, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.inpageNavButtonContainer} 
            style={{
                borderRight: `2px solid ${isActive ? 'color-mix(in srgb, var(--text-main) 30%, transparent)' : 'transparent'}`,
                opacity: isHovered ? 0.7 : 1,
                backgroundImage: isActive ? 'linear-gradient(to right, transparent, var(--bg-tertiary))' : 'none',
                // backgroundColor: isActive ? 'linear-gradient(to right, transparent, color-mix(in srgb, var(--bg-secondary) 30%, transparent))' : 'var(--bg-surface)',
            }} 
        >
            <button 
                className={styles.inpageNavButton}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
                style={{
                    transform: isActive ? 'translateX(-4px)' : 'none',
                    
                }}
                {...props} 
            />
        </div>
        
    )
}

const InpageNavbarContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return ( 
        // <div cla

        <SidePanel className={styles.leftGrid} >
            <div className={styles.inpageNavContainer} >
                <div className={styles.inpageNavbar}>
                    {children}
                </div>
            </div>
        </SidePanel>
    )
}

export { InpageNavButton, InpageNavbarContainer, DummyRightPanel };