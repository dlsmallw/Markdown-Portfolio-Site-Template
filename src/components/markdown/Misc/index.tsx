import React, { type HTMLAttributes } from "react";
import { inlineTryCatch } from "../../../util/ErrorHandling";

import './component.module.css';

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
const ComponentRegistry = {
    ...{
        p: (props: HTMLAttributes<HTMLParagraphElement>) => {
            return <p {...props} />
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


export default ComponentRegistry;