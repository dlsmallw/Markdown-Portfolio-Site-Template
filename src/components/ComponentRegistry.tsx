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
import WrappingContainerComponentRegistry from "./WrappingContainer/WrappingContainer";

interface DateProps extends HTMLAttributes<HTMLSpanElement> {
    locales?: string,
    month?: string;
    day?: string;
    year?: string;
}

function inlineTryCatch<T, R>(fn: () => T, fallback: R): T | R {
    try {
        return fn();
    } catch (error) {
        return fallback;
    }
}

const DefaultContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} />
}

const DateElement: React.FC<DateProps> = ({ locales, month, day, year, ...props }) => {
    const date = inlineTryCatch(() => props.children ? new Date(String(props.children)) : undefined, undefined);
    const dateFormat: { locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions } = {
        locales: inlineTryCatch(() => locales as Intl.LocalesArgument, 'en-US'),
        options: {
            month: inlineTryCatch(() => month as Intl.DateTimeFormatOptions['month'], 'short'),
            day: inlineTryCatch(() => day as Intl.DateTimeFormatOptions['day'], undefined),
            year: inlineTryCatch(() => year as Intl.DateTimeFormatOptions['year'], 'numeric'),
        }
    }

    return (
        <>
            {date && <span {...props} >{date.toLocaleDateString(dateFormat.locales, dateFormat.options)}</span>}
        </>
    )
}

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
    ...WrappingContainerComponentRegistry,
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
        grouped: (props: HTMLAttributes<HTMLSpanElement>) => {
            return <span {...props} />
        },
        date: (props: HTMLAttributes<HTMLSpanElement>) => {
            return <DateElement {...props} />
        },
        container: (props: HTMLAttributes<HTMLDivElement>) => {
            return <DefaultContainer {...props} />
        }
    }
}

export default ComponentRegistry;