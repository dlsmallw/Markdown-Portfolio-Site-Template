import React, { 
    useCallback, 
    type HTMLAttributes, 
    type ImgHTMLAttributes 
} from 'react';

import SVGComponent from './SVG';
import ImageComponent from './Image';

export const LoadingFallback: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return (
        <span 
            {...props} 
            className={`${props.className} icon-loading`}
            style={{
                fontWeight: "bold",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--bg-main)',
                minHeight: '100px',
            }}
        >
            {props.alt}
        </span>
    )
}

export const ErrorFallback: React.FC<HTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <span {...props} className={`${props.className} icon-error`}>⚠️</span>
}

interface MediaComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
    mediaRef: React.RefObject<SVGElement | HTMLImageElement | null>;
    darkModeSrc?: string;
    lightModeSrc?: string;
}

// const MediaComponent = React.memo(function Image(props: MediaComponentProps) {
const MediaComponent: React.FC<MediaComponentProps> = ({ mediaRef, ...props }) => {
    const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseEnter?.(e), 
        [props]
    );

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseLeave?.(e), 
        [props]
    );
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseMove?.(e), 
        [props]
    );

    const isSVG = (url: string) => {
        if (!url) return false;

        const cleanURL = url.split('?')[0].split('#')[0];
        const result = cleanURL.toLowerCase().endsWith('.svg') ||
            url.toLowerCase().startsWith('data:image/svg+xml');

        return result;
    }

    const src = props.src ? (props.src.trim() !== "" ? props.src : null) : null;

    return (
        <>
            {src ? (
                <>
                    {!isSVG(src) ? (
                        <ImageComponent 
                            {...props}
                            src={src}
                            ref={mediaRef as React.RefObject<HTMLImageElement>}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove} 
                        />
                    ) : (
                        <SVGComponent 
                            {...props}
                            ref={mediaRef}
                            src={src}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove} 
                        />
                    )}
                </>
            ) : (
                <LoadingFallback {...props} />
            )}
        </>
    )
};

export { MediaComponent };