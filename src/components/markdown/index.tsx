import React, { useState, useEffect, type HTMLAttributes } from 'react';
import type { Components } from "react-markdown";

function inlineTryCatch<T, R>(fn: () => T, fallback: R): T | R {
    try {
        return fn();
    } catch (error) {
        return fallback;
    }
}

interface DateProps extends HTMLAttributes<HTMLSpanElement> {
    locales?: string,
    month?: string;
    day?: string;
    year?: string;
}



interface DefaultContainerProps extends HTMLAttributes<HTMLDivElement> {
    classname?: string;
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({ ...props }) => {
    return <div className={props.classname} {...props} />
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

const modules = import.meta.glob<Components>('./**/index.tsx', { eager: true });

let ComponentRegistry: Components = {
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
        container: (props: DefaultContainerProps) => {
            return <DefaultContainer {...props} />
        }
    }
}

for (const path in modules) {
    if (path === './index.tsx') continue;
    const module = await import(path);
    const importRegistry = module.default as Components;
    // console.log(importRegistry)
    ComponentRegistry = {
        ...ComponentRegistry,
        ...importRegistry
    }
};

export default ComponentRegistry;