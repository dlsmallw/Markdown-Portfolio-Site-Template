import { HTMLAttributes, useEffect, useState } from "react";

import styles from './Button.module.css'

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement> {
    title: string;
    src: string;
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
        <a 
            href={src ?? ''} 
            target={target ?? ''}
            rel={rel}
            className={`${styles.linkButton} link-button`}
            onClick={onClick}
            {...props}
        >
            {children}
            <span className='link-button-text'>{title || src || "Missing title/src attributes"}</span>
        </a>
    )
}

const ProjectLinkBtn: React.FC<ProjectLinkProps> = ({ src, children }) => {
    return (
        <div className={`${styles.projectLinkContainer}`}>
            <a 
                href={src} 
                target='_blank' 
                rel='noopener noreferrer' 
                className={`${styles.projectLinkButton}`}
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                // style={{
                //     backgroundColor: isHovered ? '#0056b3' : '#007bff',
                //     cursor: isHovered ? 'pointer' : 'default'
                // }}
            >
                {children}
            </a>
        </div>
    )
}

const LinkButtonsComponentRegistry = {
    sitelink: (props: LinkButtonProps) => {
        return <LinkButton target="_blank" rel="noopener noreferrer" {...props} />
    },
    emaillink: (props: LinkButtonProps) => {
        return (
            <LinkButton 
                onClick={(event) => {
                    event.preventDefault();
                    window.open(props.src, 'mail');
                }}    
                {...props} 
            />
        );
    },
    projectlink: (props: ProjectLinkProps) => {
        return <ProjectLinkBtn {...props} />
    }
}

export default LinkButtonsComponentRegistry;