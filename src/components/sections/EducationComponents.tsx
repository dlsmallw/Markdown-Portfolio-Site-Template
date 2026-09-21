import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useIsWrapped } from "../../util/WrappingUtil";
import WrappingContainer from "../WrappingContainer";
import { Bold } from "../MiscComponents";

const EducationBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='edu-block'>
            {children}
        </div>
    )
}

interface SchoolDetailsProps {
    children: React.ReactNode;
    location: string;
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ children, location }) => {
    const { containerRef, isWrapped } = useIsWrapped();

    return (
        <WrappingContainer ref={containerRef} isWrapped={isWrapped} separator="|" id='school-details-container'>
            <span id='school-name' >{children}</span>
            {location && (
                <>
                    <span id='school-location'>{location}</span>
                </>
            )}
        </WrappingContainer>
    )
}

interface ProgramDetailsProps {
    type: string;
    major: string;
    gpa?: string;
    gpascale?: string;
    minor?: string;
    honors?: string
}



interface DegreeDetailsProps {
    type: string;
    major: string;
    minor?: string;
}

const DegreeDetails: React.FC<DegreeDetailsProps> = ({ type, major, minor }) => {
    const wrapperOne = useIsWrapped();
    const wrapperTwo = useIsWrapped();

    return (
        <WrappingContainer ref={wrapperOne.containerRef} separator="•" isWrapped={wrapperOne.isWrapped} id='degree-details-container' style={{
            fontSize: 'var(--text-base)'
        }}>
            <span id='degree-type'>
                <Bold>{type}</Bold>
            </span>
            <WrappingContainer ref={wrapperTwo.containerRef} separator="•" isWrapped={wrapperTwo.isWrapped} id='major-minor-block' style={{
                fontSize: 'var(--text-base)'
            }}>
                <span id='major-span'>
                    <Bold>{'Major: '}</Bold>{major}
                </span>
                {minor && (
                    <span id='minor-span'>
                        <Bold>{'Minor: '}</Bold>{minor}
                    </span>
                )}
            </ WrappingContainer>
        </WrappingContainer>
    )
}

interface ProgramPerformanceProps {
    gpa?: string;
    gpaScale?: string;
    honors?: string;
}

const ProgramPerformance: React.FC<ProgramPerformanceProps> = ({ gpa, gpaScale, honors }) => {
    const { containerRef, isWrapped } = useIsWrapped();

    return (
        <WrappingContainer ref={containerRef} isWrapped={isWrapped} separator="•" id='program-performance-container'>
            {gpa && <span id='gpa-span'><Bold>{'GPA: '}</Bold>{gpaScale ? `${gpa}/${gpaScale}` : gpa}</span>}
            {honors && <span id='honors-span'><Bold>{'Honors: '}</Bold>{honors}</span>}
        </WrappingContainer>
    )
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ type, gpa, major, gpascale, minor, honors}) => {
    return (
        <div id='program-details-container' >
            <DegreeDetails type={type} major={major} minor={minor}/>
            {(gpa || honors) && <ProgramPerformance gpa={gpa} gpaScale={gpascale} honors={honors}/>}
        </div>
    )
}

const RelevantCourses: React.FC<HTMLAttributes<HTMLDivElement>> = ({ title, children }) => {
    return (
        <div id='relevant-courses-container' style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 'var(--text-base)'
        }}>
            <Bold>{title ? `${title}: ` : 'Relevant Course: '}</Bold>
            {children}
        </div>
    )
}


const EducationComponentRegistry = {
    educationblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <EducationBlock {...props}>{props.children}</EducationBlock>
    },
    schooldetails: (props: HTMLAttributes<HTMLDivElement> & Partial<SchoolDetailsProps>) => {
        return <SchoolDetails location={props.location ?? ""} {...props}>{props.children}</SchoolDetails> 
    },
    programdetails: (props: HTMLAttributes<HTMLDivElement> & Partial<DegreeDetailsProps>) => {
        return <ProgramDetails type={props.type ?? ""} major={props.major ?? ""} {...props}/>
    },
    relevantcourses: (props: HTMLAttributes<HTMLDivElement>) => {
        return <RelevantCourses {...props}>{props.children}</RelevantCourses>
    }
};

export default EducationComponentRegistry;