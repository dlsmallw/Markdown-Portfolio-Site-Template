import React, { HTMLAttributes, ImgHTMLAttributes, useEffect, useRef, useState } from "react";

import IntroComponentRegistry from "./markdown/Intro/Intro";
import SkillsComponentRegistry from "./markdown/Skills/Skills";
import ExperienceComponentRegistry from "./markdown/Experience/Experience";
import EducationComponentRegistry from "./markdown/Education/Education";
import ProjectsComponentRegistry from "./markdown/Projects/Projects";
import LinkButtonsComponentRegistry from "./markdown/Buttons/Buttons";
import ContactComponentRegistry from "./markdown/Contact/Contact";
import StrengthComponentRegistry from "./markdown/Strengths/Strengths";
import ImageComponentRegistry from "./markdown/Images/Images";

const ComponentRegistry = {
    ...IntroComponentRegistry,
    ...SkillsComponentRegistry,
    ...ExperienceComponentRegistry,
    ...EducationComponentRegistry,
    ...ProjectsComponentRegistry,
    ...StrengthComponentRegistry,
    ...LinkButtonsComponentRegistry,
    ...ContactComponentRegistry,
    ...ImageComponentRegistry,
    ...{
        p: (props: HTMLAttributes<HTMLParagraphElement>) => {
            const children = React.Children.toArray(props.children);
            if (children.some((child) => React.isValidElement(child) && (child.type !== 'string' && child.type !== 'number'))) {
                const filteredChildren = children.filter(child => React.isValidElement(child));
                return <>{filteredChildren}</>
            } else {
                return <p {...props} />
            }
        },
    }
}

export default ComponentRegistry;