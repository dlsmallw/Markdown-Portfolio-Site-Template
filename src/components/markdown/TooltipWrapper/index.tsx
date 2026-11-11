import React, { type HTMLAttributes, useEffect, useRef, useState } from "react";

import styles from './component.module.css';

// Both the state and setState props need to be passed to use the 
// state from a parent.
interface TooltipWrapperProps extends HTMLAttributes<HTMLDivElement> {
    shown?: boolean;
    setShown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ shown, setShown, ...props }) => {
    const [isShown, setIsShown] = useState(shown ?? false);
    const [ttCoords, setTTCoords] = useState({ left: 0, top: 0 });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const handleTTCoordAdjust = (
        inputType: string, 
        rect: DOMRect, 
        x: number, 
        y: number
    ) => {
        const correctedX = x - rect.left;
        const correctedY = y - rect.top;

        if (inputType === 'mouse') {
            setTTCoords({
                left: correctedX + 15,
                top: correctedY + 15,
            });

        } else {
            const correctedLeft = rect.right - rect.left;
            const correctedTop =  (rect.bottom - rect.top) / 3;

            setTTCoords({
                left: correctedLeft,
                top: correctedTop,
            });
        }
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
        const handleShow = () => {
            setIsShown(true);
            if (setShown !== undefined) setShown(true);
        }

        const handleHide = () => {
            setIsShown(false);
            if (setShown !== undefined) setShown(false);
        }

        const handleScroll = (e: PointerEvent) => {
            const inputType = e.pointerType;

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

            if (inputType === 'mouse') {
                if (stillHovering) {
                    handleTTCoordAdjust(inputType, rect, x, y);
                    handleShow();
                }
                else handleHide();
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            const inputType = e.pointerType;

            const element = contentRef.current;
            if (!element) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;

            const insideElement = 
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom &&
                y >= rect.top;

            if (inputType === 'mouse') {
                if (insideElement) {
                    handleTTCoordAdjust(inputType, rect, x, y);
                    handleShow();
                } else {
                    handleHide();
                }
            } 
        }

        const handlePointerDown = (e: PointerEvent) => {
            const inputType = e.pointerType;

            if (inputType === 'mouse') return;

            const element = contentRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;

            const insideContainer = 
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom &&
                y >= rect.top;

            if (!insideContainer || isShown) {
                handleHide();
            } else {
                handleTTCoordAdjust(inputType, rect, x, y);
                handleShow()
            }
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerdown', handlePointerDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [isShown, setShown, shown]);

    return (
        <div 
            {...props} 
            ref={containerRef} 
            className={`${styles.tooltipWrapper} ${props.className ?? ''}`}
        >
            <div style={{
                position: 'relative',
            }}>
                <div 
                    ref={contentRef}
                    style={{
                        height: '100%',
                    }}
                >
                    {children}
                </div>
            
            
                <span 
                    className={`${styles.cursorToolTip} cursor-tooltip`}
                    id={`${props.id ? `${props.id}-` : ''}cursor-tooltip`}
                    style={{
                        left: `${ttCoords.left}px`,
                        top: `${ttCoords.top}px`,
                        opacity: 1,
                        visibility: isShown ? 'visible' : 'hidden'
                    }}
                >
                    {tooltipText}
                </span>
                
            </div>
            
        </div>
    )
}

export const TooltipText: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return props.children
}

const ComponentRegistry = {
    ['tooltip-wrapper']: TooltipWrapper,
    ['tooltip-text']: TooltipText
}

export default ComponentRegistry;