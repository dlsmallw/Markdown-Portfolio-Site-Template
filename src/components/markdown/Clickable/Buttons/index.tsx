import { type AnchorHTMLAttributes } from "react";
import { useNavigate, type To } from "react-router";

import { inlineTryCatch } from "@utils/ErrorHandling";
import { LinkComponent } from "../Links";

import styles from './component.module.css';

export const InternalButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    const navigate = useNavigate();
    return (
        <LinkComponent 
            {...props} 
            className={`${styles.button} ${props.className}`} 
            onClick={() => { if (props.href) navigate(props.href as To); }}
        />
    )
}

export const ExternalButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <LinkComponent 
            {...props} 
            className={`${styles.button} ${props.className}`} 
            target="_blank" 
            rel="noopener noreferrer" 
        />
    )
}

export const EmailButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
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

export const DownloadButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    if (!props.download) props.download = inlineTryCatch(() => props.href?.split("/").pop(), "Resume.pdf")

    return (
        <LinkComponent {...props} className={`${styles.button} ${props.className}`} />
    )
}

export const ProjectButtonComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
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
    
}

export default ButtonComponentRegistry;