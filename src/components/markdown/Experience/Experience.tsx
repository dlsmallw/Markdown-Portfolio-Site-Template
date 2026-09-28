import { HTMLAttributes } from "react";

import styles from './Experience.module.css';

interface PositionBlockProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    startdate: string;
    enddate?: string;
};

interface PositionPeriodProps extends HTMLAttributes<HTMLSpanElement> {
    start: string;
    end?: string;
};

const ExperienceBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div className={styles.experienceBlock} {...props} />
};


const PositionBlock: React.FC<PositionBlockProps> = ({ title, startdate, enddate, children, ...props }) => {
    return (
        <div className={`${styles.positionBlock}`} {...props} >
            {children}
        </div>
    )
};

const PositionTitle: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
    return <span className={styles.positionText} {...props} />;
};

const PositionPeriod: React.FC<PositionPeriodProps> = ({ start, end, ...props }) => {
    const dateFormat: {locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions} = {
        locales: 'en-US',
        options: {
            month: 'long',
            year: 'numeric'
        }
    }

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (!startDate) {
        return null;
    }

    return (
        <span className={styles.dateText} {...props}>
            {`${startDate.toLocaleDateString(dateFormat.locales, dateFormat.options)} - ${endDate ? endDate.toLocaleDateString(dateFormat.locales, dateFormat.options) : 'Present'}`}
        </span>
    );
};

const ExperienceComponentRegistry = {
    experienceblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <ExperienceBlock {...props} />;
    },
    positionblock: (props: PositionBlockProps) => {
        return <PositionBlock {...props} />;
    },
    positiontitle: (props: HTMLAttributes<HTMLDivElement>) => {
        return <PositionTitle {...props} />;
    },
    positionperiod: (props: PositionPeriodProps) => {
        return <PositionPeriod {...props} />;
    }

};

export default ExperienceComponentRegistry;