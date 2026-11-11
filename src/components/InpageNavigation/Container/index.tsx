import type { HTMLAttributes } from "react";

import styles from './component.module.css';

const InpageNavbarContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return ( 
        <div className={`${styles.inpageNavContainer} ${props.className}`} >
            <div className={styles.inpageNavbar}>
                {props.children}
            </div>
        </div>
    )
}

export default InpageNavbarContainer;