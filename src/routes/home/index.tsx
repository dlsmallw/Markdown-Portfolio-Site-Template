import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { useScrollSpy } from '../../util/EventListeners';
import type { AppDataContextType } from '../../types/DataLoading';

import { 
    PageSection,
    SectionBorder
} from '../../components/Section';

import { 
    DummyRightPanel, 
    InpageNavButton, 
    InpageNavbarContainer 
} from '../../components/InpageNavigation';

import styles from './route.module.css';

const Home: React.FC = () => {
    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement | null>>();
    const { homeData, navbarHeight } = useOutletContext<AppDataContextType>();

    const activeSection = useScrollSpy(homeData.sectionOrder.map((section) => {
        return `${section}-section`;
    }), { root: null, rootMargin: `-${navbarHeight + 200}px 0px 0px 0px`, threshold: 0 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        const current = elementRef.current;

        if (!current) return;

        current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        }); 

        // setTargetSection(current.id);
    };

    const handleMaintainSection = () => {
        if (targetRef?.current) {
            targetRef.current.scrollIntoView({behavior: 'instant' as unknown as ScrollBehavior, block: 'start'});
        }
    }

    const handleInitTargetRef = () => {
        if (homeData.sectionData && !targetRef?.current) {
            setTargetRef(homeData.sectionData[0].ref);
        }
    }
    // console.log(targetSection)
    useEffect(() => {
        
        window.addEventListener('resize', handleMaintainSection);
        handleInitTargetRef();

        return () => {
            window.removeEventListener('resize', handleMaintainSection)
        }
    }, []);

    useEffect(() => {
        // if (homeData && homeData.sectionOrder.length > 0)
        // setTargetSection(homeData.sectionOrder[0]);
    }, [homeData.sectionOrder])

    useEffect(() => {
        // setTargetSection(activeSection);
    }, [activeSection]);

    return (
        <div className={styles.homePage} id="outer-container">
            <InpageNavbarContainer>
                {homeData.sectionData ? homeData.sectionData.map((section, index) => {
                    let isActive = false;
                    if (!activeSection && index === 0) isActive = true;
                    else isActive = activeSection === `${section.id}-section`;
                    return (
                        <InpageNavButton 
                            key={`${section.id}-nav-btn`}
                            isActive={isActive}  
                            onClick={() => {
                                handleScroll(section.ref);
                                setTargetRef(section.ref);
                            }}
                        >{section.navLabel}</InpageNavButton>
                    )
                }) : null}
            </InpageNavbarContainer>

            <div className={styles.contentContainer} id='content-container'>
                {homeData.sectionData ? homeData.sectionData.map((section, index) => {
                    const heightStyle = index === homeData.sectionData.length - 1 ? {height: 'var(--view-height)'} : {};
                    return (
                        <div key={`s-${index}`}>
                            <PageSection 
                                style={{ ...heightStyle }}
                                scrollRef={section.ref} 
                                id={`${section.id}-section`} 
                                key={section.id} 
                                markdown={section.markdown} 
                            />
                            {index < homeData.sectionData.length -1 && (
                                <SectionBorder id='section-border' key={`section-spacer-${index}`} />
                            )}
                        </div>
                    )
                }) : <div className={styles.loadingContainer}>Loading...</div>}
            </div>

            {/* <div className='section-panel' id='dummy-right-grid' /> */}
            <DummyRightPanel id='dummy-right-grid' />
        </div>
    );
}

export default Home;