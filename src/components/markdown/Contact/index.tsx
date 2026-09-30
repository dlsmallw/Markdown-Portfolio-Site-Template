import { type HTMLAttributes } from "react";

import './component.module.css';
import styles from './component.module.css';

const ContactLinksBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={`${styles.contactLinksBlock} ${props.className}`} {...props} />
    )
}

const ComponentRegistry = {
    contactlinksblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ContactLinksBlock {...props} />
    }
}

export default ComponentRegistry;