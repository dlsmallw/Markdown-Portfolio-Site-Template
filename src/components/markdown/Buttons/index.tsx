import { type HTMLAttributes, useEffect } from "react";

import styles from './component.module.css';
import { useNavigate } from "react-router";

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement> {
    title?: string;
    src?: string;
    target?: string;
    rel?: string;
    download?: string;
}

interface ProjectLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    src: string;
}

const AnchorLink: React.FC<LinkButtonProps> = ({ title, src, target, rel, onClick, children, ...props }) => {
    return (
        <>
            {src && (
                <div className={styles.anchorContainer}>
                    <a 
                        href={src ?? ''} 
                        target={target ?? ''}
                        rel={rel}
                        onClick={onClick}
                        {...props}
                    >
                        {children}
                    </a>
                </div>
            )}
            
        </>
    )
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, src, target, rel, onClick, children, ...props }) => {
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

const ComponentRegistry = {
    sitelink: (props: LinkButtonProps) => {
        return <AnchorLink
                    className={styles.anchorLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                />
    },
    emaillink: (props: LinkButtonProps) => {
        return <AnchorLink
                    className={styles.anchorLink}
                    onClick={(event) => {
                        event.preventDefault();
                        window.open(props.src, 'mail');
                    }}    
                {...props} 
                />
    },
    resumelink: (props: LinkButtonProps) => {
        return <AnchorLink
                    className={`${styles.anchorLink}`}
                    onClick={() => {
                        const navigate = useNavigate();
                        navigate(props.src);
                    }}
                    {...props} 
                />
    },
    downloadlink: (props: LinkButtonProps) => {
        const srcArr = props.src.split("/");
        const fileName = srcArr ? srcArr[srcArr.length - 1] : "Resume.pdf";

        return <AnchorLink
                    className={`${styles.anchorLink} ${styles.downloadLink}`}
                    download={fileName}
                    {...props} 
                />
    },
    sitebutton: (props: LinkButtonProps) => {
        return <LinkButton 
                    className={styles.buttonLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                />
    },
    emailbutton: (props: LinkButtonProps) => {
        return (
            <LinkButton 
                className={styles.buttonLink}
                onClick={(event) => {
                    event.preventDefault();
                    window.open(props.src, 'mail');
                }}    
                {...props} 
            />
        );
    },
    resumebutton: (props: LinkButtonProps) => {
        const srcArr = props.src.split("/");
        const fileName = srcArr ? srcArr[srcArr.length - 1] : "Resume.pdf";

        return (
            <LinkButton 
                className={`${styles.buttonLink} ${styles.resumeButton}`}  
                target="_blank" 
                rel="noopener noreferrer" 
                download={fileName}
                {...props} 
            />
        );
    },
    projectbutton: (props: ProjectLinkProps) => {
        return (
            <div className={styles.projectButtonLinkContainer}>
                <LinkButton 
                    className={styles.projectButtonLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                />
            </div>
        )
    }
}

export default ComponentRegistry;