import { type HTMLAttributes, useEffect } from "react";

import styles from './component.module.css';

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement> {
    title?: string;
    src?: string;
    target?: string;
    rel?: string;
}

interface ProjectLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    src: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, src, target, rel, onClick, children, ...props }) => {
    useEffect(() => {
        const elements = document.querySelectorAll(".link-button .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        });
    }, []);

    return (
        <>
            {src && (
                <a 
                    href={src ?? ''} 
                    target={target ?? ''}
                    rel={rel}
                    onClick={onClick}
                    {...props}
                >
                    {children}
                </a>
            )}
            
        </>
        
    )
}

const ProjectLinkBtn: React.FC<ProjectLinkProps> = ({ src, children, ...props }) => {
    return (
        <div className={`${styles.projectLinkContainer} ${props.className}`}>
            <a 
                href={src} 
                target='_blank' 
                rel='noopener noreferrer' 
                className={`${styles.projectLinkButton}`}
            >
                {children}
            </a>
        </div>
    )
}

const ComponentRegistry = {
    sitelink: (props: LinkButtonProps) => {
        return <LinkButton 
                    className={styles.linkButton}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                />
    },
    emaillink: (props: LinkButtonProps) => {
        return (
            <LinkButton 
                className={styles.linkButton}
                onClick={(event) => {
                    event.preventDefault();
                    window.open(props.src, 'mail');
                }}    
                {...props} 
            />
        );
    },
    projectlink: (props: ProjectLinkProps) => {
        return (
            <div className={styles.projectLinkContainer}>
                <LinkButton 
                    className={styles.projectLinkButton} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                />
            </div>
        )
        
        
    }
}

export default ComponentRegistry;