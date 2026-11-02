import styles from  './component.module.css';
import { useEffect, useState } from 'react';
import React from 'react';
import type { IconBaseProps } from 'react-icons/lib';

interface IconProps extends IconBaseProps {
    iconkey: string;
}

export const CustomIcon: React.FC<IconProps> = ({ iconkey, ...props }) => {
    const [importedComponent, setImportedComponent] = useState(null);

    useEffect(() => {
        const importComp = async () => {
            if (!iconkey) return;

            const modSubDir = iconkey.slice(0, 2).toLowerCase();
            const module = await import(`/node_modules/react-icons/${modSubDir}`);
            const LoadedComponent = module[iconkey];

            if (!LoadedComponent) return;

            setImportedComponent(<LoadedComponent {...props} size={props.size ?? 32} />)
        }
        
        importComp();
    }, []);

    return (
        <>
            {importedComponent}
        </>
    );
}

export const EmailIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <CustomIcon {...props} iconkey='MdOutlineEmail' />
}

export const DownloadIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <CustomIcon {...props} iconkey='FiDownload' />
}

export const ResumeIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <CustomIcon {...props} iconkey='GrDocumentText' />
}

export const GitHubIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <CustomIcon {...props} iconkey='ImGithub' />
}

export const LinkedInIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <CustomIcon {...props} iconkey='FaLinkedin' />
}


const IconComponentRegistry = {
    ['react-icon']: CustomIcon,
    ['email-icon']: EmailIcon,
    ['download-icon']: DownloadIcon,
    ['resume-icon']: ResumeIcon,
    ['github-plain-icon']: GitHubIcon,
    ['linkedin-icon']: LinkedInIcon,
}

export default IconComponentRegistry;