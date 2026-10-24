import type { HTMLAttributes } from "react";

import styles from './component.module.css';

const SidePanel: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.sidePanel} ${props.className} side-panel`} />
}

export { SidePanel };