import type { AnchorHTMLAttributes } from "react"

import {
    EmailButtonComponent,
    ExternalButtonComponent,
    InternalButtonComponent,
    DownloadButtonComponent
} from '@components/markdown/Clickable/Buttons';

import {
    EmailSVG,
    DownloadIcon,
    ResumeIcon,
    GitHubPlainIcon,
    LinkedInIcon
} from '../../Icons';

const EmailButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <EmailButtonComponent {...props} >
            <EmailSVG />
            {props.children ?? props.href.split(":")[1]}
        </EmailButtonComponent>
    )
}

const ResumePreviewButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <InternalButtonComponent {...props} >
            <ResumeIcon />
            {props.children ?? "View Resume"}
        </InternalButtonComponent>
    )
}

const ResumeDownloadButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <DownloadButtonComponent {...props} >
            <DownloadIcon />
            {props.children ?? "Download Resume"}
        </DownloadButtonComponent>
    )
}

const GitHubButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    const alt = "GitHub";

    return (
        <ExternalButtonComponent {...props} >
            <GitHubPlainIcon />
            {props.children ?? props.href.replace('https://', '') ?? alt}
        </ExternalButtonComponent>
    )
}

const LinkedInButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    const alt = "LinkedIn";

    return (
        <ExternalButtonComponent {...props} >
            <LinkedInIcon />
            {props.children ?? props.href.replace('https://', '') ?? alt}
        </ExternalButtonComponent>
    )
}

const ButtonPresetsComponentRegistry = {
    ['email-button-preset']: EmailButton,
    ['resume-preview-button']: ResumePreviewButton,
    ['resume-download-button']: ResumeDownloadButton,
    ['github-button-preset']: GitHubButton,
    ['linkedin-button-preset']: LinkedInButton
}

export default ButtonPresetsComponentRegistry;