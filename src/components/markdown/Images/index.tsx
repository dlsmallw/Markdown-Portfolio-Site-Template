import React, { type ImgHTMLAttributes, useEffect, useRef, useState } from "react";

import { MediaComponent } from "@components/Media";

import styles from './component.module.css';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    tooltip?: string;
}

interface ThemedIconProps extends ImageProps {
    themesrcs: string;
}

interface IconProps extends ImageProps {
    iconTheme: string;
}

function documentAttrObserver(attrName: string, fallback: any = undefined) {
    const [attrValue, setAttrValue] = useState(() => 
        document.documentElement.getAttribute(attrName) || fallback
    );

    useEffect(() => {
        const attrChangeObserver = (mutationList: MutationRecord[]) => {
            for (const mutation of mutationList) {
                if (
                    (mutation.type === 'attributes') &&
                    (mutation.attributeName === attrName)
                ) {
                    const currAttrValue = (mutation.target as Element).getAttribute(attrName);
                    setAttrValue(currAttrValue || fallback);
                }
            }
        };

        const observer = new MutationObserver(attrChangeObserver);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [attrName]
        });

        return () => {
            observer.disconnect();
        }
    }, []);

    return attrValue;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({ themesrcs, src, ...props }) => {
    const theme = documentAttrObserver('data-theme', 'dark') as string;
    const themeSources: Record<string, string> = JSON.parse(themesrcs);

    const Icon: React.FC<IconProps> = ({ iconTheme, ...props }) => {
        const [isHidden, setIsHidden] = useState(iconTheme === theme);

        useEffect(() => {
            setIsHidden(iconTheme !== theme);
        }, [theme]);

        return (
            <div style={{ display: isHidden ? 'none' : 'block' }} >
                <MarkdownImage 
                    {...props} 
                    src={themeSources[iconTheme]} 
                />
            </div>
            
        )
    }
    
    const Component = () => {
        const themes = Object.keys(themeSources);
        if (themeSources && themes.length > 1) {
            return (
                <>
                    {themes.map((iconTheme, index) => {
                        const iconSrc = themeSources[iconTheme];

                        return (
                            <Icon {...props} iconTheme={iconTheme} src={iconSrc} key={`themed-icon-${index}`} />
                        )
                    })}
                </>
            )
        } else {
            return <MarkdownImage {...props} src={src} />
        }
    };

    return <Component />;
}

export const MarkdownImage: React.FC<ImageProps> = ({ alt, tooltip = 'true', ...props }) => {
    const handleElemMouseMove = (e: MouseEvent) => {
        if (!imgRef.current || !isHovered) return;
    
        let xAdjust = 0

        if (containerRef.current && imgRef.current.closest('.skills-grid')) {
            const flexBasis = window.getComputedStyle(containerRef.current).flexBasis;

            if (flexBasis.includes('px')) {
                xAdjust = parseFloat(flexBasis) / 2;
            }
        }
        
        const rect = imgRef.current.getBoundingClientRect();
        const x = xAdjust + e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setTTCoords({
            left: x + 15,
            top: y + 15,
        });
    }

    const [isHovered, setIsHovered] = useState(false);
    const [ttCoords, setTTCoords] = useState({ left: 0, top: 0 });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | SVGElement | null>(null);

    const lastMousePosition = useRef({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            lastMousePosition.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const handleScroll = () => {
            const element = imgRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = lastMousePosition.current.x;
            const y = lastMousePosition.current.y;


            const stillHovering = 
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom &&
                y >= rect.top;

            setIsHovered(stillHovering);
        };

        setTTCoords({ left: 0, top: 0 });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.imageOuterContainer} id={`${props.id ? `${props.id}-` : ''}image-outer-container`}>
            <div ref={containerRef} className={styles.imageCell} id={`${props.id ? `${props.id}-` : ''}image-cell`}>
                <MediaComponent 
                    className={`${styles.imageIcon} ${props.className}`} 
                    id={`${props.id ? `${props.id}-` : ''}image-icon`}
                    src={props.src}
                    alt={alt}
                    ref={imgRef}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleElemMouseMove as () => void}
                />
                       
                {tooltip === 'true' && <span className={`${styles.cursorToolTip} cursor-tooltip`}
                    id={`${props.id ? `${props.id}-` : ''}cursor-tooltip`}
                    style={{
                        left: isHovered ? `${ttCoords.left}px` : '0px',
                        top: isHovered ? `${ttCoords.top}px` : '0px',
                        opacity: isHovered ? 1 : 0,
                        visibility: isHovered ? 'visible' : 'hidden'
                    }}>{alt}</span>
                }
            </div>
        </div>
    )
}

const ComponentRegistry = {
    ['img']: MarkdownImage,
    ['themed-icon']: ThemedIcon,
}

export default ComponentRegistry;