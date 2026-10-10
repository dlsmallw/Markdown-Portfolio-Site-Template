import styles from  './component.module.css';
import type { ImgHTMLAttributes } from 'react';
import { MarkdownImage } from '../../Images';
import type React from 'react';

import { ICON_ASSETS_PATH } from '@utils/Constants';

export const EmailSVG: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <MarkdownImage 
                {...props}
                className={`${styles.emailIcon}`} 
                id="link" 
                alt="Email"
                tooltip="false"
                src={`${ICON_ASSETS_PATH}/email-icon.svg`}
            />
}

export const DownloadIcon: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <MarkdownImage 
                {...props}
                className={`${styles.downloadIcon}`} 
                id="link" 
                alt="Download"
                tooltip="false"
                src={`${ICON_ASSETS_PATH}/download-icon.svg`}
            />
}

export const ResumeIcon: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <MarkdownImage 
                {...props}
                className={`${styles.resumeIcon}`} 
                id="link" 
                alt="Resume"
                tooltip="false"
                src={`${ICON_ASSETS_PATH}/resume.svg`}
            />
}

export const GitHubPlainIcon: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <MarkdownImage
                {...props}
                className={`${styles.githubIcon} ${props.className}`}
                id="link"
                alt="GitHub"
                tooltip="false"
                src={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"}
            /> 
}

export const LinkedInIcon: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <MarkdownImage
                {...props}
                className={`${styles.linkedinIcon} ${props.className}`}
                id="link"
                alt="LinkedIn"
                tooltip="false"
                src={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"}
            /> 
}


const IconComponentRegistry = {
    ['email-icon']: EmailSVG,
    ['download-icon']: DownloadIcon,
    ['resume-icon']: ResumeIcon,
    ['github-plain-icon']: GitHubPlainIcon,
    ['linkedin-icon']: LinkedInIcon,
}

export default IconComponentRegistry;