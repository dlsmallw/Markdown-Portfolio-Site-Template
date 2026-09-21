import { HTMLAttributes } from "react";
import WrappingContainer from "../WrappingContainer";
import { useIsWrapped } from "../../util/WrappingUtil";

type ExperienceProps = {
    children: React.ReactNode;
    title: string;
    company: string;
    startdate: string;
    enddate?: string;
};

const ExperienceBlock: React.FC<ExperienceProps> = ({ children, title, company, startdate, enddate }) => {
    const { containerRef, isWrapped } = useIsWrapped();
    return (
        <div className='experience-block'>
            <h3>{title}</h3>
            <div className='company-dates-container' style={{ 
                    width: '100%', 
                    overflowX: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column',
                }}
            >
                <WrappingContainer ref={containerRef} isWrapped={isWrapped} separator="|">
                    <span id='company-name-span'>{company}</span>
                    {startdate && <span id='date-span' >{`${startdate} - ${enddate ? enddate : 'Present'}`}</span>}
                </WrappingContainer>
            </div>
            {children}
 
        </div>
        
    )
}

const ExperienceComponentRegistry = {
    experienceblock: (props: HTMLAttributes<HTMLDivElement> & Partial<ExperienceProps>) => {
        return <ExperienceBlock title={props.title ?? ""} company={props.company ?? ""} startdate={props.startdate ?? ""} enddate={props.enddate}>{props.children}</ExperienceBlock>
    }
};

export default ExperienceComponentRegistry;