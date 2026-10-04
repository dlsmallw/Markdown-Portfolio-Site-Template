import { type AnchorHTMLAttributes } from "react";
import { useNavigate } from "react-router";

import { inlineTryCatch } from "@utils/ErrorHandling";
import { LinkComponent } from "..";

import styles from './component.module.css';

const InternalButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <LinkComponent 
            {...props} 
            className={`${styles.button} ${props.className}`} 
            onClick={() => {
                const navigate = useNavigate();
                navigate(props.href);
            }}
        />
    )
}

const ExternalButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <LinkComponent 
            {...props} 
            className={`${styles.button} ${props.className}`} 
            target="_blank" 
            rel="noopener noreferrer" 
        />
    )
}

const EmailButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <LinkComponent 
            {...props} 
            className={`${styles.button} ${props.className}`} 
            onClick={(event) => {
                event.preventDefault();
                window.open(props.href, 'mail');
            }}   
        />
    )
}

const DownloadButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    if (!props.download) props.download = inlineTryCatch(() => props.href.split("/").pop(), "Resume.pdf")

    return (
        <LinkComponent {...props} className={`${styles.button} ${props.className}`} />
    )
}

const ProjectButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <div className={styles.projectButtonLinkContainer}>
            <LinkComponent 
                {...props} 
                className={`${styles.projectButton} ${props.className ?? ""}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                
            />
        </div>
    );
}

const ButtonComponentRegistry = {
    ['external-button']: ExternalButtonComponent,
    ['internal-button']: InternalButtonComponent,
    ['email-button']: EmailButtonComponent,
    ['download-button']: DownloadButtonComponent,
    ['project-button']: ProjectButtonComponent,
}

export default ButtonComponentRegistry;