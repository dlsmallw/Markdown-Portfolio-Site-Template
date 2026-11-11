import React, { type HTMLAttributes } from "react";

import { inlineTryCatch } from "@utils/error-handling";

import './component.module.css';

interface DateProps extends HTMLAttributes<HTMLSpanElement> {
    locales?: string,
    month?: string;
    day?: string;
    year?: string;
}

const DefaultContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div className={props.className} {...props} />
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

const GroupedSpan: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span {...props} />;
}

const ComponentRegistry = {
    ['grouped']: GroupedSpan,
    ['date']: DateElement,
    ['container']: DefaultContainer,
}


export default ComponentRegistry;