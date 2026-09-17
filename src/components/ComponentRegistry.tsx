import { HTMLAttributes, ImgHTMLAttributes } from "react";
import IntroComponentRegistry from "./sections/IntroComponents";
import SkillsComponentRegistry from "./sections/SkillsComponents";
import React from "react";

const ComponentRegistry = {
    ...IntroComponentRegistry,
    ...SkillsComponentRegistry,
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
                <div className='img-cell'>
                    <img {...props} alt={props.alt} />
                </div>
            )
        }
    }
}

export default ComponentRegistry;