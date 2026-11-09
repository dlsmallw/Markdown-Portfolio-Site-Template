import React, { type HTMLAttributes } from 'react';

import { WrappingContainer, type WrappingContainerProps } from '../../WrappingContainer';

import styles from './component.module.css';

const EducationBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    const schoolHeader = React.Children.toArray(props.children).find((child) => (
        React.isValidElement(child) && 
        child.key.includes('school-header')
    ));

    const children = React.Children.toArray(props.children).filter((child) => (
        React.isValidElement(child) && 
        !child.key.includes('school-header')
    ));
    
    return (
        <div {...props} className={`${styles.educationBlock} ${props.className ?? ''}`} >
            {schoolHeader}
            <div className={styles.eduBlockContent}>
                {children}
            </div>
        </div>
    );
}

const SchoolHeader: React.FC<WrappingContainerProps> = ({ ...props }) => {
    return (
        <WrappingContainer {...props} className={`${styles.schoolHeader} ${props.className ?? ''}`} />
    );
}

const DegreeProgramContainer: React.FC<WrappingContainerProps> = ({ ...props }) => {
    return (
        <WrappingContainer {...props} className={`${styles.degreeProgramContainer} ${props.className ?? ''}`} 

        />
    );
}

const DegreeDetailsContainer: React.FC<WrappingContainerProps> = ({ ...props }) => {
    return (
        <WrappingContainer {...props} className={`${styles.degreeDetailsContainer} ${props.className ?? ''}`} />
    );
}

const RelevantCoursesContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div {...props} className={`${styles.relevantCoursesContainer} ${props.className ?? ''}`} />
    );
}

const ComponentRegistry = {
    ['education-block']: EducationBlock,
    ['school-header']: SchoolHeader,
    ['degree-program']: DegreeProgramContainer,
    ['degree-details']: DegreeDetailsContainer,
    ['relevant-courses']: RelevantCoursesContainer,
};

export default ComponentRegistry;