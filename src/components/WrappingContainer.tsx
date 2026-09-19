import React from "react";
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

interface WrappingContainerProps extends HTMLAttributes<HTMLDivElement> {
    isWrapped: boolean;
    separator?: string;
}

const WrappingContainer = forwardRef<HTMLDivElement, WrappingContainerProps>(({ children, isWrapped, separator, ...props }, ref) => {
    const childArr = React.Children.toArray(children);
    return (
        <div ref={ref} className='wrapping-container' {...props}>
            {childArr.reduce<React.ReactNode[]>((acc, child, index) => {
                acc.push(child);

                if (separator && index < childArr.length - 1) {
                    acc.push(<span style={{ visibility: isWrapped ? 'hidden' : 'visible' }}>{separator}</span>);
                }

                return acc;
            }, [])}
        </div>
        )
    }
)

export default WrappingContainer;