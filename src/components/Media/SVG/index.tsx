import React, { type ImgHTMLAttributes, useEffect, useState } from "react";
import SVG from 'react-inlinesvg';

import { LoadingFallback, ErrorFallback } from "../";

interface SVGComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
    ref: React.RefObject<HTMLDivElement | SVGElement | null>;
}

const LocalSVG: React.FC<SVGComponentProps> = ({ ref, ...props }) => {
    const [loadedSVG, setLoadedSVG] = useState<{
        src: string;
        component: React.ComponentType<SVGComponentProps>;
    } | null>(null);
    const [failedSrc, setFailedSrc] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        import(/* @vite-ignore */`${props.src}?react`)
            .then((module) => {
                if (!cancelled) {
                    setLoadedSVG({
                        src: props.src ?? '',
                        component: module.default as React.ComponentType<SVGComponentProps>
                    });
                    setFailedSrc(null);
                }
            })
            .catch((error) => {
                console.error(`Failed to load SVG Image: ${props.src}`, error);
                if (!cancelled) setFailedSrc(props.src ?? null);
            });

        return () => {
            cancelled = true;
        };
    }, [props.src]);

    const SVGImage = loadedSVG ? (loadedSVG.src === props.src ? loadedSVG.component : null) : null;

    if (failedSrc === props.src) return <ErrorFallback {...props} />;
    if (!SVGImage) return <LoadingFallback {...props} />;

    return (
        <SVGImage {...props} ref={ref} />
    )
}

const SVGComponent = React.memo(function SVGComponentInner(props: SVGComponentProps) {
    const { src } = props;

    return (
        <>
            {src && URL.canParse(src) ? (
                <SVG 
                    {...(props as unknown as React.ComponentProps<typeof SVG>)}
                    innerRef={(element) => {
                        const ref = props.ref as React.RefObject<SVGElement | null>;
                        ref.current = element;
                    }}
                    src={src}
                />  
            ) : (
                <LocalSVG {...props} />
            )}
        </>
    )
})

export default SVGComponent;