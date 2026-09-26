import { HTMLAttributes } from "react";

import styles from './SidePanel.module.css'

const SidePanel: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.sidePanel} ${props.className}`} />
}

export { SidePanel };