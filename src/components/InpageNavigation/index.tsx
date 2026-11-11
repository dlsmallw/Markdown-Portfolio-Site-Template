import { useScrollSpy } from '@utils/event-listeners';
import InpageNavButton from './Button';
import InpageNavbarContainer from './Container';

import type { SectionData } from "@typing/data";
import { useEffect, type HTMLAttributes } from 'react';

const OBSERVER_OPTIONS = { 
    root: null, 
    rootMargin: `-200px 0px 0px 0px`, 
    threshold: 0 
};

interface InpageNavbarProps extends HTMLAttributes<HTMLDivElement> {
    sectionState: string | null;
    sections: SectionData[];
    targetSectionRef: React.RefObject<string | null>;
    handleScroll: (sectionRef: React.RefObject<HTMLDivElement | null>) => void;
}

const InpageNavbar: React.FC<InpageNavbarProps> = ({ sectionState, sections, targetSectionRef, handleScroll, ...props }) => {
    const activeSection = useScrollSpy(
        sections?.map((section) => {
            return section.id;
        }), 
        sectionState ?? undefined, 
        OBSERVER_OPTIONS
    );

    useEffect(() => {
        targetSectionRef.current = activeSection;
    }, [activeSection, targetSectionRef])

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
                                if (section.ref) handleScroll(section.ref);
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