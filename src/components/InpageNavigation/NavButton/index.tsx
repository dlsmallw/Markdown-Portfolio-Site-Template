import { type HTMLAttributes, useState } from "react";

import styles from './component.module.css';

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

export default InpageNavButton;