import { HTMLAttributes } from "react";
import { useIsWrapped } from "../../../util/WrappingUtil";
import { Bold } from "../../MiscComponents";

import WrappingContainer from "../../WrappingContainer/WrappingContainer";

import styles from './Education.module.css'

interface DegreeDetailsProps extends HTMLAttributes<HTMLDivElement> {
    type: string;
    major: string;
    minor?: string;
}

interface ProgramDetailsProps extends HTMLAttributes<HTMLDivElement> {
    type: string;
    major: string;
    gpa?: string;
    gpascale?: string;
    minor?: string;
    honors?: string
}

interface ProgramPerformanceProps extends HTMLAttributes<HTMLDivElement> {
    gpa?: string;
    gpaScale?: string;
    honors?: string;
}

interface SchoolDetailsProps extends HTMLAttributes<HTMLDivElement> {
    location: string;
}

const EducationBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div className={styles.educationBlock} {...props}/>
    )
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ location, children, ...props }) => {
    const { containerRef, isWrapped } = useIsWrapped();

    return (
        <WrappingContainer ref={containerRef} isWrapped={isWrapped} separator="|" id='school-details-container' >
            <span className={styles.schoolNameText} id='school-name' >{children}</span>
            {location && <span className={styles.schoolLocationText} id='school-location'>{location}</span>}
        </WrappingContainer>
    )
}

const DegreeDetails: React.FC<DegreeDetailsProps> = ({ type, major, minor }) => {
    const wrapperOne = useIsWrapped();
    const wrapperTwo = useIsWrapped();

    return (
        // <WrappingContainer 
        //     ref={wrapperOne.containerRef} 
        //     separator="•" 
        //     isWrapped={wrapperOne.isWrapped} 
        //     id='degree-outer-container'
        // >
        //     <span id='degree-type'>
        //         <Bold>{type}</Bold>
        //     </span>
        //     <div>
        //         <WrappingContainer ref={wrapperTwo.containerRef} separator="•" isWrapped={wrapperTwo.isWrapped} id='major-minor-inner-container'>
        //             <span id='major-span' >
        //                 <Bold>{'Major: '}</Bold>{major}
        //             </span>
        //             {minor && (
        //                 <span id='minor-span' >
        //                     <Bold>{'Minor: '}</Bold>{minor}
        //                 </span>
        //             )}
        //         </ WrappingContainer>
        //     </div>
        // </WrappingContainer>
        <WrappingContainer 
            ref={wrapperOne.containerRef} 
            separator="•" 
            isWrapped={wrapperOne.isWrapped} 
            id='degree-outer-container'
        >
            <span id='degree-type'>
                <Bold>{type}</Bold>
            </span>
            <span id='major-span' >
                <Bold>{'Major: '}</Bold>{major}
            </span>
            {minor && (
                <span id='minor-span' >
                    <Bold>{'Minor: '}</Bold>{minor}
                </span>
            )}
            
        </WrappingContainer>
    )
}

const ProgramPerformance: React.FC<ProgramPerformanceProps> = ({ gpa, gpaScale, honors, ...props }) => {
    const { containerRef, isWrapped } = useIsWrapped();

    return (
        <WrappingContainer 
            ref={containerRef} 
            isWrapped={isWrapped} 
            separator="•" 
        >
            {gpa && <span id='gpa-span'><Bold>{'GPA: '}</Bold>{gpaScale ? `${gpa}/${gpaScale}` : gpa}</span>}
            {honors && <span id='honors-span'><Bold>{'Honors: '}</Bold>{honors}</span>}
        </WrappingContainer>
    )
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ type, gpa, major, gpascale, minor, honors, ...props}) => {
    return (
        <div className={styles.programDetails} id='program-details-container' {...props} >
            <DegreeDetails type={type} major={major} minor={minor}/>
            {(gpa || honors) && <ProgramPerformance gpa={gpa} gpaScale={gpascale} honors={honors}/>}
        </div>
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


const EducationComponentRegistry = {
    educationblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <EducationBlock {...props} />
    },
    schooldetails: (props: SchoolDetailsProps) => {
        return <SchoolDetails {...props} />
    },
    programdetails: (props: ProgramDetailsProps) => {
        return <ProgramDetails {...props}/>
    },
    relevantcourses: (props: HTMLAttributes<HTMLDivElement>) => {
        return <RelevantCourses {...props} />
    }
};

export default EducationComponentRegistry;