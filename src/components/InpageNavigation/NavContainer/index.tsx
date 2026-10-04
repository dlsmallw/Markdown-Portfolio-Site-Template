import type { HTMLAttributes } from "react";

import { SidePanel } from "@components/SidePanel";

import styles from './component.module.css';

const InpageNavbarContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return ( 
        <SidePanel className={styles.leftGrid} >
            <div className={styles.inpageNavContainer} >
                <div className={styles.inpageNavbar}>
                    {props.children}
                </div>
            </div>
        </SidePanel>
    )
}

export default InpageNavbarContainer;