import type { HTMLAttributes } from "react";

import styles from './component.module.css';

const InpageNavbarContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return ( 
        <div className={styles.inpageNavContainer} >
            <div className={styles.inpageNavbar}>
                {props.children}
            </div>
        </div>
    )
}

export default InpageNavbarContainer;