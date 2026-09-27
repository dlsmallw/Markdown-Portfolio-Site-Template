import React, { useEffect } from "react";
import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

import styles from './WrappingContainer.module.css';

interface WrappingContainerProps extends HTMLAttributes<HTMLDivElement> {
    isWrapped: boolean;
    separator?: string;
}

const WrappingContainer = forwardRef<HTMLDivElement, WrappingContainerProps>(({ children, isWrapped, separator, ...props }, ref) => {
    const childArr = React.Children.toArray(children);

    // useEffect(() => {
    //     if (props.id === 'major-minor-block')
    //         console.log(`Is Wrapped: ${isWrapped}`);
    // }, [isWrapped, props.id]);

    return (
        <div ref={ref} className={`${styles.wrappingContainer} wrapping-container`} style={{
            display: 'flex',
            flexDirection: isWrapped ? 'column' : 'unset',
        }} {...props}>
            {childArr.reduce<React.ReactNode[]>((acc, child, index) => {
                acc.push(child);

                if (separator && index < childArr.length - 1) {
                    acc.push(<span id='wrapping-separator' key={`sep-${index}`} style={{ 
                        display: isWrapped ? 'none' : 'block',
                    }}>{separator}</span>);
                }

                return acc;
            }, [])}
        </div>
        )
})

export default WrappingContainer;