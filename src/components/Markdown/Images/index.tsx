import React, { type ImgHTMLAttributes, useRef } from "react";

import { MediaComponent } from "@components/Media";

import styles from './component.module.css';

export const MarkdownImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ alt,...props }) => {
    const imgRef = useRef<HTMLImageElement | SVGElement | null>(null);
    const src = props.src ? (props.src.trim() !== "" ? props.src : undefined) : undefined;

    return (
        <div 
            {...props} 
            className={`${styles.imageCell} ${props.className ?? ''} image-cell`} 
            id={`${props.id ? `${props.id}-` : ''}image-cell`} 
        >
            <MediaComponent 
                className={`${styles.imageIcon} ${props.className ?? ''} image-icon`} 
                id={`${props.id ? `${props.id}-` : ''}image-icon`}
                src={src}
                alt={alt}
                mediaRef={imgRef}
            />
        </div>
    )
}

const ComponentRegistry = {
    ['img']: MarkdownImage,
}

export default ComponentRegistry;