import React, { type ImgHTMLAttributes, useMemo } from "react";

import { LoadingFallback, ErrorFallback } from "../";
import SVG from 'react-inlinesvg';

import './component.module.css';

interface SVGComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
    ref: React.RefObject<HTMLDivElement | SVGElement | null>;
}

const LocalSVG: React.FC<SVGComponentProps> = ({ ref, ...props }) => {
    const SVGImageURL = useMemo(() => {
        return React.lazy<React.ComponentType<SVGComponentProps>>(async () => {
            try {
                const module = await import(`${props.src}?react`);
                return {
                    default: module.default as React.ComponentType<SVGComponentProps>
                };
            } catch (e) {
                console.error(`Failed to load SVG Image: ${props.src}`, e);
                return {
                    default: () => <ErrorFallback {...props} />
                };
            }
        });
    }, [props.src]);

    return (
        <React.Suspense fallback={<LoadingFallback {...props} />} >
            <SVGImageURL {...props} ref={ref} />
        </React.Suspense>
    )
}

const SVGComponent = React.memo(function SVGComponentInner(props: SVGComponentProps) {
    const isURL = () => URL.canParse(props.src);

    return (
        <>
            {isURL() ? (
                <SVG 
                    {...(props as unknown as React.ComponentProps<typeof SVG>)}
                    innerRef={props.ref as React.RefObject<SVGElement>}
                    src={props.src}
                />  
            ) : (
                <LocalSVG {...props} />
            )}
        </>
    )
})

export default SVGComponent;