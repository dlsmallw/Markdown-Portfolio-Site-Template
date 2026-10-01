import { type ImgHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

import styles from './component.module.css';
import React from "react";

interface ImageComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
    ref: React.RefObject<HTMLDivElement | HTMLImageElement | null>;
}

const ImageComponent = React.memo(function Image(props: ImageComponentProps) {
    const [svg, setSvg] = useState("");

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseEnter?.(e), [props.onMouseEnter]
    );

    const handleMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseLeave?.(e), [props.onMouseLeave]
    );
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => props.onMouseMove?.(e), [props.onMouseMove]
    );

    const isSVG = (url: string) => {
        if (!url) return false;

        const cleanURL = url.split('?')[0].split('#')[0];
        const result = cleanURL.toLowerCase().endsWith('.svg') ||
            url.toLowerCase().startsWith('data:image/svg+xml');

        return result;
    }

    useEffect(() => {
        if (props.src && isSVG(props.src)) {
            fetch(props.src)
                .then(res => res.text())
                .then(setSvg);
        }
    }, [props.src]);

    return (
        <>
            {props.src && !isSVG(props.src) ? (
                <img {...props} ref={props.ref as React.RefObject<HTMLImageElement>} />
            ) : (
                <div
                    {...props}
                    ref={props.ref as React.RefObject<HTMLDivElement>}
                    dangerouslySetInnerHTML={{ __html: svg }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                />
            )}
        </>
    )
})

export default ImageComponent;