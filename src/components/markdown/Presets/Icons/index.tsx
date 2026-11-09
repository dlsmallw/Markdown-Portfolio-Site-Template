import React from 'react';
import type { IconBaseProps } from 'react-icons/lib';

import { iconRegistry } from '../../../../generated/iconRegistry';
import { MdOutlineEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { GrDocumentText } from 'react-icons/gr';
import { ImGithub } from 'react-icons/im';
import { FaLinkedin } from 'react-icons/fa';

const DEF_SIZE = 32;

interface IconProps extends IconBaseProps {
  iconkey: string;
}

export const DynamicReactIcon: React.FC<IconProps> = ({ iconkey, ...props }) => {
  const IconComponent = iconRegistry[iconkey];
  return IconComponent ? <IconComponent {...props} size={props.size ?? DEF_SIZE} /> : null;
};

export const EmailIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <MdOutlineEmail {...props} size={props.size ?? DEF_SIZE} />
}

export const DownloadIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <FiDownload {...props} size={props.size ?? DEF_SIZE} />
}

export const ResumeIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <GrDocumentText {...props} size={props.size ?? DEF_SIZE} />
}

export const GitHubIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <ImGithub {...props} size={props.size ?? DEF_SIZE} />
}

export const LinkedInIcon: React.FC<IconBaseProps> = ({ ...props }) => {
    return <FaLinkedin {...props} size={props.size ?? DEF_SIZE} />
}

const IconComponentRegistry = {
    ['react-icon']: DynamicReactIcon,
    ['email-icon']: EmailIcon,
    ['download-icon']: DownloadIcon,
    ['resume-icon']: ResumeIcon,
    ['github-plain-icon']: GitHubIcon,
    ['linkedin-icon']: LinkedInIcon,
}

export default IconComponentRegistry;