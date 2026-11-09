import React, { type ImgHTMLAttributes, useRef } from "react";

import { MediaComponent } from "@components/Media";

import styles from './component.module.css';
import { TooltipText, TooltipWrapper } from "../TooltipWrapper";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    tooltip?: boolean;
}

export const MarkdownImage: React.FC<ImageProps> = ({ alt, tooltip = false, ...props }) => {
    const imgRef = useRef<HTMLImageElement | SVGElement | null>(null);
    const src = props.src ? (props.src.trim() !== "" ? props.src : null) : null;

    const MDImage = <MediaComponent 
        className={`${styles.imageIcon} ${props.className}`} 
        id={`${props.id ? `${props.id}-` : ''}image-icon`}
        src={src}
        alt={alt}
        ref={imgRef}
    />

    return (
        (tooltip ? (
            <TooltipWrapper className={styles.imageToolTip}>
                <div className={styles.imageCell} id={`${props.id ? `${props.id}-` : ''}image-cell`}>
                    {MDImage}
                </div>
                <TooltipText key='tooltip-text' className={styles.skillsTooltip}>
                    {alt}
                </TooltipText>
            </TooltipWrapper>
        ) : (
            <div className={styles.imageCell} id={`${props.id ? `${props.id}-` : ''}image-cell`}>
                {MDImage}
            </div>
        ))
    )
}

const ComponentRegistry = {
    ['img']: MarkdownImage,
}

export default ComponentRegistry;