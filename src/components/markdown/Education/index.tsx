import { type HTMLAttributes } from "react";
import { Bold } from "../../MiscComponents";

import styles from './component.module.css';

interface TextSpanProps extends HTMLAttributes<HTMLSpanElement> {
    pretext?: string;
}

interface DegreeDatesProps extends HTMLAttributes<HTMLSpanElement> {
    projectedcompletion?: string;
    completiondate?: string;
}

const EducationBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={styles.educationBlock} {...props}/>
    )
}

const DegreeDates: React.FC<DegreeDatesProps> = ({ projectedcompletion, completiondate, ...props }) => {
    const dateFormat: { locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions } = {
        locales: 'en-US',
        options: {
            month: 'long',
            year: 'numeric'
        }
    }

    const pretext = completiondate ? 'Graduated:' : (projectedcompletion ? 'Projected Graduation:' : null);
    const date = completiondate ? new Date(completiondate) : (projectedcompletion ? new Date(projectedcompletion) : null);

    return (
        <>
            {date ? (
                <TextSpan className={styles.degreeDatesText} pretext={pretext ?? ''} {...props}>
                    {date.toLocaleDateString(dateFormat.locales, dateFormat.options)}
                </ TextSpan>) 
                : null
            }
        </>
    )
}

const TextSpan: React.FC<TextSpanProps> = ({ pretext, ...props }) => {
    return (
        <>
            {pretext ? (
                <div className={`${styles.textSpanContainer} ${props.className}`}>
                    <span className={styles.preText} >{pretext}</span>
                    <span className={styles.primaryText} >{props.children}</span>
                </div>
            ) : (
                <span {...props} />
            )}
        </>
    )
}

const RelevantCourses: React.FC<HTMLAttributes<HTMLDivElement>> = ({ title, children, ...props }) => {
    return (
        <div className={styles.relevantCoursesContainer} id='relevant-courses-container' {...props} >
            <Bold>{title ? `${title}: ` : 'Relevant Course: '}</Bold>
            {children}
        </div>
    )
}


const ComponentRegistry = {
    educationblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <EducationBlock {...props} />
    },
    schoolname: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={`${styles.schoolNameText} ${styles.schoolHeader}`} {...props} />
    },
    schoollocation: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={`${styles.schoolLocationText} ${styles.schoolHeader}`} {...props } />
    },
    degreelevel: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={styles.degreeLevelText} {...props } />
    },
    degreemajor: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={styles.degreeMajorText} pretext="Major:" {...props } />
    },
    degreeminor: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={styles.degreeMinorText} pretext="Minor:" {...props } />
    },
    degreegpa: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={styles.degreeGPAText} pretext="GPA:" {...props } />
    },
    degreehonors: (props: HTMLAttributes<HTMLSpanElement>) => {
        return <TextSpan className={styles.degreeHonorsText} pretext="Honors:" {...props } />
    },
    relevantcourses: (props: HTMLAttributes<HTMLDivElement>) => {
        return <RelevantCourses {...props} />
    },
    degreedates: (props: DegreeDatesProps) => {
        return <DegreeDates className={styles.degreeDatesText} {...props} />
    }
};

export default ComponentRegistry;