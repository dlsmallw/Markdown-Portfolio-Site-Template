import { type AnchorHTMLAttributes } from "react";
import { useNavigate, type To } from "react-router";

import styles from './component.module.css';

export const LinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return <a {...props} />;
}

export const InternalLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.linkContainer}>
            <LinkComponent 
                {...props} 
                className={`${styles.link} ${props.className}`} 
                onClick={() => { if (props.href) navigate(props.href as To); } }
            />
        </div>
    )
    
}

export const ExternalLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
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

export const EmailLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
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

export const DownloadLinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <div className={styles.linkContainer}>
            <LinkComponent {...props} className={`${styles.link} ${props.className}`} />
        </div>
    )
}