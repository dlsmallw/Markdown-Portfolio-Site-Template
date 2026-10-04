import { type AnchorHTMLAttributes } from "react";
import { useNavigate } from "react-router";

import { inlineTryCatch } from "@utils/ErrorHandling";
import { LinkComponent } from "..";

import styles from './component.module.css';

const InternalLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <div className={styles.linkContainer}>
            <LinkComponent 
                {...props} 
                className={`${styles.link} ${props.className}`} 
                onClick={() => {
                    const navigate = useNavigate();
                    navigate(props.href);
                }}
            />
        </div>
    )
    
}

const ExternalLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <div className={styles.linkContainer}>
            <LinkComponent 
                {...props} 
                className={`${styles.link} ${props.className}`} 
                target="_blank" 
                rel="noopener noreferrer" 
            />
        </div>
    )
}

const EmailLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <div className={styles.linkContainer}>
            <LinkComponent 
                {...props} 
                className={`${styles.link} ${props.className}`} 
                onClick={(event) => {
                    event.preventDefault();
                    window.open(props.href, 'mail');
                }}   
            />
        </div>
    )
}

const DownloadLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    if (!props.download) props.download = inlineTryCatch(() => props.href.split("/").pop(), "Resume.pdf")

    return (
        <div className={styles.linkContainer}>
            <LinkComponent {...props} className={`${styles.link} ${props.className}`} />
        </div>
    )
}

const LinkComponentRegistry = {
    ['external-link']: ExternalLinkComponent,
    ['internal-link']: InternalLinkComponent,
    ['email-link']: EmailLinkComponent,
    ['download-link']: DownloadLinkComponent,
}

export default LinkComponentRegistry;