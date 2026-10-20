import InpageNavButton from './NavButton';
import InpageNavbarContainer from './NavContainer';



import type { SectionData } from "@typing/DataLoading";
import type { HTMLAttributes } from 'react';

interface InpageNavbarProps extends HTMLAttributes<HTMLDivElement> {
    sections: SectionData[];
    activeSection: string;
    handleScroll: (sectionRef: React.RefObject<HTMLDivElement>) => void;
    onBtnPress?: (section: SectionData) => void;
}

const InpageNavbar: React.FC<InpageNavbarProps> = ({ sections, activeSection, handleScroll, onBtnPress, ...props }) => {
    return (
        <InpageNavbarContainer {...props} >
            {sections ? sections.map((section, index) => {
                    let isActive = false;

                    if (!activeSection && index === 0) isActive = true;
                    else isActive = activeSection === `${section.id}-section`;

                    return (
                        <InpageNavButton 
                            id={`${section.id}-section-nav`}
                            key={`${section.id}-nav-btn`}
                            isActive={isActive}  
                            onClick={() => {
                                handleScroll(section.ref);
                            }}
                        >{section.navLabel}</InpageNavButton>
                    )
                }) : null}
        </InpageNavbarContainer>
    )
}

export { InpageNavButton, InpageNavbarContainer };
export default InpageNavbar;