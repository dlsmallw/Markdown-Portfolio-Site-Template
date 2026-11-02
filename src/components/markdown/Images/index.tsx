import React, { type ImgHTMLAttributes, useRef } from "react";

import { MediaComponent } from "@components/Media";

import styles from './component.module.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    tooltip?: string;
}

export const MarkdownImage: React.FC<ImageProps> = ({ alt, tooltip = 'true', ...props }) => {
    const imgRef = useRef<HTMLImageElement | SVGElement | null>(null);
    const src = props.src ? (props.src.trim() !== "" ? props.src : null) : null;

    return (
        <div className={styles.imageCell} id={`${props.id ? `${props.id}-` : ''}image-cell`}>
            <MediaComponent 
                className={`${styles.imageIcon} ${props.className}`} 
                id={`${props.id ? `${props.id}-` : ''}image-icon`}
                src={src}
                alt={alt}
                ref={imgRef}
            />
                
        </div>
    )
}

const ComponentRegistry = {
    ['img']: MarkdownImage,
}

export default ComponentRegistry;