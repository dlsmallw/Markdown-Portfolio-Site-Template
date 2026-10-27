import { useScrollSpy } from '@utils/EventListeners';
import InpageNavButton from './NavButton';
import InpageNavbarContainer from './NavContainer';

import type { SectionData } from "@typing/DataLoading";
import { useEffect, type HTMLAttributes } from 'react';

const OBSERVER_OPTIONS = { 
    root: null, 
    rootMargin: `-200px 0px 0px 0px`, 
    threshold: 0 
};

interface InpageNavbarProps extends HTMLAttributes<HTMLDivElement> {
    sectionState: string;
    sections: SectionData[];
    targetSectionRef: React.RefObject<string | null>;
    handleScroll: (sectionRef: React.RefObject<HTMLDivElement>) => void;
    onBtnPress?: (section: SectionData) => void;
}

const InpageNavbar: React.FC<InpageNavbarProps> = ({ sectionState, sections, targetSectionRef, handleScroll, onBtnPress, ...props }) => {
    const activeSection = useScrollSpy(
        sectionState, 
        sections?.map((section) => {
            return section.id;
        }), 
        OBSERVER_OPTIONS
    );

    useEffect(() => {
        targetSectionRef.current = activeSection;
    }, [activeSection])

    return (
        <InpageNavbarContainer {...props} >
            {sections ? sections.map((section, index) => {
                    let isActive = false;

                    if (!activeSection && index === 0) isActive = true;
                    else isActive = activeSection === section.id;

                    return (
                        <InpageNavButton 
                            id={`${section.id}-nav`}
                            key={`${section.id}-nav-btn`}
                            isActive={isActive}  
                            onClick={() => {
                                handleScroll(section.ref);
                            }}
                        >
                            {section.navLabel}
                        </InpageNavButton>
                    )
                }) : null}
        </InpageNavbarContainer>
    )
}

export { InpageNavButton, InpageNavbarContainer };
export default InpageNavbar;