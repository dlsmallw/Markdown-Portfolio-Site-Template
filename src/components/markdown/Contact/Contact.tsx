import { HTMLAttributes } from "react";

import styles from './Contacts.module.css'

const ContactLinksBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={`${styles.contactLinksBlock} ${props.className}`} {...props} />
    )
}

const ContactComponentRegistry = {
    contactlinksblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ContactLinksBlock {...props} />
    }
}

export default ContactComponentRegistry;