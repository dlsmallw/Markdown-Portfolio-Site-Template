import React, { type ImgHTMLAttributes } from "react";

import { LoadingFallback } from "..";

import './component.module.css';

interface ImageComponentProps extends ImgHTMLAttributes<HTMLImageElement> {
    ref: React.RefObject<HTMLImageElement | null>;
}

const ImageComponent = React.memo(function Image(props: ImageComponentProps) {
    return (
        <>
            {props.src ? (
                <img 
                    {...props} 
                    ref={props.ref as React.RefObject<HTMLImageElement>} 
                />
            ) : (
                <LoadingFallback {...props} />
            )}
        </>
    )
})

export default ImageComponent;