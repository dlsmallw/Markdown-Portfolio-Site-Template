import React, { type HTMLAttributes, type ImgHTMLAttributes, useRef } from "react";

import { MediaComponent } from "@components/Media";

import styles from './component.module.css';
import { TooltipText, TooltipWrapper } from "../TooltipWrapper";

export const ImageWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div 
            {...props} 
            className={`${styles.imageCell} ${props.className ?? ''} image-cell`} 
            id={`${props.id ? `${props.id}-` : ''}image-cell`} 
        />
    )
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    tooltip?: boolean;
}

export const MarkdownImage: React.FC<ImageProps> = ({ alt, tooltip = false, ...props }) => {
    const imgRef = useRef<HTMLImageElement | SVGElement | null>(null);
    const src = props.src ? (props.src.trim() !== "" ? props.src : undefined) : undefined;

    const MDImage = <MediaComponent 
        className={`${styles.imageIcon} ${props.className} image-icon`} 
        id={`${props.id ? `${props.id}-` : ''}image-icon`}
        src={src}
        alt={alt}
        mediaRef={imgRef}
    />

    return (
        (tooltip ? (
            <TooltipWrapper className={styles.imageToolTip}>
                <ImageWrapper id={props.id}>
                    {MDImage}
                </ImageWrapper>

                <TooltipText key='tooltip-text'>
                    {alt}
                </TooltipText>
            </TooltipWrapper>
        ) : (
            <ImageWrapper id={props.id}>
                {MDImage}
            </ImageWrapper>
        ))
    )
}

const ComponentRegistry = {
    ['img']: MarkdownImage,
}

export default ComponentRegistry;