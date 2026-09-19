import { HTMLAttributes, ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import IntroComponentRegistry from "./sections/IntroComponents";
import SkillsComponentRegistry from "./sections/SkillsComponents";
import React from "react";
import ExperienceComponentRegistry from "./sections/ExperienceComponents";
import EducationComponentRegistry from "./sections/EducationComponents";

const ImgContainer: React.FC<{ props: ImgHTMLAttributes<HTMLImageElement> }> = ({ props }) => {
    const containerRef = useRef<HTMLImageElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [ttCoords, setTTCoords] = useState({
        left: 0,
        top: 0
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imgRef.current) return;
        
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

    useEffect(() => {
        setTTCoords({ left: 0, top: 0 });
    }, []);

    return (
        <div className='img-outer-container'>
            <div ref={containerRef} className='img-cell'>
                <img ref={imgRef} alt={props.alt} {...props} 
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={handleMouseMove}
                />
                <span className='cursor-tooltip'
                    style={{
                        left: isHovered ? `${ttCoords.left}px` : '0px',
                        top: isHovered ? `${ttCoords.top}px` : '0px',
                        opacity: isHovered ? 1 : 0,
                        visibility: isHovered ? 'visible' : 'hidden'
                    }}>{props.alt}</span>
            </div>
        </div>
    )
}

const ComponentRegistry = {
    ...IntroComponentRegistry,
    ...SkillsComponentRegistry,
    ...ExperienceComponentRegistry,
    ...EducationComponentRegistry,
    ...{
        p: (props: HTMLAttributes<HTMLElement>) => {
            const children = React.Children.toArray(props.children);
            if (children.some((child) => React.isValidElement(child) && (child.type !== 'string' && child.type !== 'number'))) {
                const filteredChildren = children.filter(child => React.isValidElement(child));
                return <>{filteredChildren}</>
            } else {
                return <p>{props.children}</p>
            }
        },
        img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
            return (
                <ImgContainer props={props} />
            )
        }
    }
}

export default ComponentRegistry;