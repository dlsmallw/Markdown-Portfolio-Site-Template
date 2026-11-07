import React, { useEffect, useState, type HTMLAttributes } from "react";

import { useIsWrapped } from "@utils/EventListeners";

import styles from './component.module.css';

export interface WrappingContainerProps extends HTMLAttributes<HTMLDivElement> {
    separator?: string;
}

export const WrappingContainer: React.FC<WrappingContainerProps> = ({ separator, ...props }) => {
    const [className, setClassName] = useState<string | undefined>(undefined);

    const { containerRef, isWrapped } = useIsWrapped();
    
    const childArr = React.Children.toArray(props.children).filter(
        (item) => !(typeof item === 'string' && /^\s*$/.test(item))
    );

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;
        
        const children = Array.from(container.children);

        if (!children || children.length < 2) return;
        setClassName(children[children.length - 1].className);
    }, [containerRef]);

    return (
        <div 
            {...props}
            ref={containerRef} 
            className={`${styles.wrappingContainer} ${props.className ?? ''}`}
            style={{
                flexDirection: isWrapped ? 'column' : 'unset',
            }}
        >
            {childArr.reduce<React.ReactNode[]>((acc, child, index) => {
                if (React.isValidElement(child)) {
                    acc.push(child);

                    if (separator && index < childArr.length - 1) {
                        acc.push(<span className={className} id='wrapping-separator' key={`sep-${index}`} style={{ 
                            display: isWrapped ? 'none' : 'block',
                        }}>{separator}</span>);
                    }
                }

                return acc;
            }, [])}
        </div>
        )
};

const ComponentRegistry = {
    ['wrapping-container']: WrappingContainer
}

export default ComponentRegistry;