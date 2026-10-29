import type { AnchorHTMLAttributes } from "react"

import {
    EmailLinkComponent,
    ExternalLinkComponent,
    InternalLinkComponent,
    DownloadLinkComponent
} from '@components/markdown/Clickable/Links';

import {
    EmailSVG,
    DownloadIcon,
    ResumeIcon,
    GitHubPlainIcon,
    LinkedInIcon
} from '../../Icons';

const EmailLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <EmailLinkComponent {...props} >
            <EmailSVG />
            {props.children ?? props.href.split(":")[1]}
        </EmailLinkComponent>
    )
}

const ResumePreviewLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <ExternalLinkComponent {...props} >
            <ResumeIcon />
            {props.children ?? "View Resume"}
        </ExternalLinkComponent>
    )
}

const ResumeDownloadLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return (
        <DownloadLinkComponent {...props} >
            <DownloadIcon />
            {props.children ?? "Download Resume"}
        </DownloadLinkComponent>
    )
}

const GitHubLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    const alt = "GitHub";

    return (
        <ExternalLinkComponent {...props} >
            <GitHubPlainIcon />
            {props.children ?? props.href.replace('https://', '') ?? alt}
        </ExternalLinkComponent>
    )
}

const LinkedInLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    const alt = "LinkedIn";

    return (
        <ExternalLinkComponent {...props} >
            <LinkedInIcon />
            {props.children ?? props.href.replace('https://', '') ?? alt}
        </ExternalLinkComponent>
    )
}

const LinkPresetsComponentRegistry = {
    ['email-link-preset']: EmailLink,
    ['resume-preview-link']: ResumePreviewLink,
    ['resume-download-link']: ResumeDownloadLink,
    ['github-link-preset']: GitHubLink,
    ['linkedin-link-preset']: LinkedInLink
}

export default LinkPresetsComponentRegistry;