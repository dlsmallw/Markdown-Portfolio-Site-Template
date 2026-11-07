import React, { type HTMLAttributes, useEffect, useRef, useState } from "react";

import styles from './component.module.css';

export const TooltipWrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ttCoords, setTTCoords] = useState({ left: 0, top: 0 });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const handleElemMouseMove = (e: MouseEvent) => {
        if (!isHovered) return;

        const x = e.clientX;
        const y = e.clientY;

        setTTCoords({
            left: x + 15,
            top: y + 15,
        });
    }

    const tooltipText = React.Children.toArray(props.children).find((child) => (
        React.isValidElement(child) && 
        child.key.includes('tooltip-text')
    ));

    const children = React.Children.toArray(props.children).filter((child) => (
        React.isValidElement(child) && 
        !child.key.includes('tooltip-text')
    ));

    useEffect(() => {
        const handleScroll = (e: MouseEvent) => {
            const element = contentRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;

            const stillHovering = 
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom &&
                y >= rect.top;

            setIsHovered(stillHovering);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div {...props} ref={containerRef} className={`${styles.tooltipWrapper} ${props.className ?? ''}`}>
            <div 
                ref={contentRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleElemMouseMove as () => void}
                style={{
                    height: 'inherit',
                }}
            >
                {children}
            </div>
            
            <span 
                className={`${styles.cursorToolTip} cursor-tooltip`}
                id={`${props.id ? `${props.id}-` : ''}cursor-tooltip`}
                style={{
                    left: isHovered ? `${ttCoords.left}px` : '0px',
                    top: isHovered ? `${ttCoords.top}px` : '0px',
                    opacity: isHovered ? 1 : 0,
                    visibility: isHovered ? 'visible' : 'hidden'
                }}
            >
                {tooltipText}
            </span>
        </div>
    )
}

export const TooltipText: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return props.children;
}

const ComponentRegistry = {
    ['tooltip-wrapper']: TooltipWrapper,
    ['tooltip-text']: TooltipText
}

export default ComponentRegistry;