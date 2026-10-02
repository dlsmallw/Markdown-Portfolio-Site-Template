import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { useScrollSpy } from '@utils/EventListeners';
import type { AppDataContextType } from '../../typing/DataLoading';

import { 
    PageSection, 
    SectionBorder, 
    DummyRightPanel, 
    InpageNavButton, 
    InpageNavbarContainer
} from '../../components';

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

    useEffect(() => {
        window.addEventListener('resize', handleMaintainSection);
        handleInitTargetRef();

        return () => {
            window.removeEventListener('resize', handleMaintainSection)
        }
    }, []);

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

            <DummyRightPanel id='dummy-right-grid' />
        </div>
    );
}

export default Home;