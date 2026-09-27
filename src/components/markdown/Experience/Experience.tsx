import { HTMLAttributes } from "react";
import WrappingContainer from "../../WrappingContainer/WrappingContainer";
import { useIsWrapped } from "../../../util/WrappingUtil";

import styles from './Experience.module.css';
interface ExperienceBlockProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    company: string;
    startdate: string;
    enddate?: string;
};

const ExperienceBlock: React.FC<ExperienceBlockProps> = ({ children, title, company, startdate, enddate }) => {
    const { containerRef, isWrapped } = useIsWrapped();

    return (
        <div className={`${styles.experienceBlock} experience-block`}>
            <h3>{title}</h3>
            <div className={`${styles.companyDatesContainer} company-dates-container`} >
                <WrappingContainer ref={containerRef} isWrapped={isWrapped} separator="|">
                    <span className={`${styles.companyNameText}`} >{company}</span>
                    {startdate && <span className={`${styles.dateText}`} >{`${startdate} - ${enddate ? enddate : 'Present'}`}</span>}
                </WrappingContainer>
            </div>
            {children}
        </div>
        
    )
}

const ExperienceComponentRegistry = {
    experienceblock: (props: ExperienceBlockProps) => {
        return <ExperienceBlock {...props} />
    }
};

export default ExperienceComponentRegistry;