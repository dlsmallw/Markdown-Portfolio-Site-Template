import React, { 
    useCallback, 
    useEffect, 
    type HTMLAttributes, 
    type ImgHTMLAttributes 
} from 'react';

import SVGComponent from './SVG';
import ImageComponent from './Image';


export const LoadingFallback: React.FC<HTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <span {...props} className={`${props.className} svg-icon-loading`}/>
}

export const ErrorFallback: React.FC<HTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <span {...props} className={`${props.className} svg-icon-error`}>⚠️</span>
}

interface MediaComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
    ref: React.RefObject<SVGElement | HTMLImageElement | null>;
    darkModeSrc?: string;
    lightModeSrc?: string;
}

// const MediaComponent = React.memo(function Image(props: MediaComponentProps) {
const MediaComponent: React.FC<MediaComponentProps> = ({ ...props }) => {
    const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseEnter?.(e), 
        [props.onMouseEnter]
    );

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseLeave?.(e), 
        [props.onMouseLeave]
    );
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseMove?.(e), 
        [props.onMouseMove]
    );

    const isSVG = (url: string) => {
        if (!url) return false;

        const cleanURL = url.split('?')[0].split('#')[0];
        const result = cleanURL.toLowerCase().endsWith('.svg') ||
            url.toLowerCase().startsWith('data:image/svg+xml');

        return result;
    }

    return (
        <>
            {props.src ? (
                <>
                    {!isSVG(props.src) ? (
                        <ImageComponent 
                            {...props}
                            ref={props.ref as React.RefObject<HTMLImageElement>}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove} 
                        />
                    ) : (
                        <SVGComponent {...props}
                            ref={props.ref}
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