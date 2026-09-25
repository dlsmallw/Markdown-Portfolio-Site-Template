import { HTMLAttributes, useEffect, useState } from "react";

interface EmailLinkButtonProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    src: string;
}

interface LinkButtonProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    src: string;
    target?: string;
    rel?: string;
}

interface ProjectLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    src: string;
}

const EmailLinkButton: React.FC<EmailLinkButtonProps> = ({ children, title, src }) => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const elements = document.querySelectorAll(".link-button .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        });
    }, []);

    return (
        <a 
            href={src} 
            className='link-button'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                // backgroundColor: isHovered ? '#0056b3' : '#007bff',
                cursor: isHovered ? 'pointer' : 'default'
            }}
            onClick={(event) => {
                event.preventDefault();
                window.open(src, 'mail');
            }}
        >
            {children}
            <span className='link-button-text'>{title || src || "Missing title/src attributes"}</span>
        </a>
    )
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, title, src, target, rel }) => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const elements = document.querySelectorAll(".link-button .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        });
    }, []);


    return (
        <a 
            href={src} 
            target={target}
            rel={rel}
            className='link-button'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                // backgroundColor: isHovered ? '#0056b3' : '#007bff',
                cursor: isHovered ? 'pointer' : 'default'
            }}
        >
            {children}
            <span className='link-button-text'>{title || src || "Missing title/src attributes"}</span>
        </a>
    )
}

const ProjectLinkBtn: React.FC<ProjectLinkProps> = ({ src, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='project-link-btn-container'>
            <a 
                href={src} 
                target='_blank' 
                rel='noopener noreferrer' 
                className='project-link-btn'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor: isHovered ? '#0056b3' : '#007bff',
                    cursor: isHovered ? 'pointer' : 'default'
                }}
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
    emaillink: (props: EmailLinkButtonProps) => {
        return <EmailLinkButton {...props} />
    },
    projectlink: (props: ProjectLinkProps) => {
        return <ProjectLinkBtn {...props} />
    }
}

export default LinkButtonsComponentRegistry;