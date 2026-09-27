import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useScrollSpy } from '../../util/ScrollSpy';

import { AppDataContextType } from '../../types/DataLoading';

import { 
    PageSection,
    SectionBorder,
    BottomSpacer
} from '../../components/Section/Section';

import { 
    DummyRightPanel, 
    InpageNavButton, 
    InpageNavbarContainer 
} from '../../components/InpageNavigation/InpageNavigation';

import styles from './Home.module.css';

const Home: React.FC = () => {
    const [ targetRef, setTargetRef ] = useState<React.RefObject<HTMLDivElement | null>>();
    const { homeData, navbarHeight } = useOutletContext<AppDataContextType>();

    let activeSection = useScrollSpy(homeData.sectionOrder.map((section, index) => {
        return `${section}-section`;
    }), { root: null, rootMargin: `-${navbarHeight + 180}px 0px 0px 0px`, threshold: 0 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        const current = elementRef.current;

        if (!current) return;

        current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        }); 

        activeSection = current.id;
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
    });

    return (
        <div className={styles.homePage} id="outer-container">
            <InpageNavbarContainer>
                {homeData.sectionData ? homeData.sectionData.map((section) => {
                    return (
                        <InpageNavButton 
                            key={`${section.id}-nav-btn`}
                            isActive={activeSection === `${section.id}-section`}  
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
                    return (
                        <div key={`s-${index}`}>
                            <PageSection 
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

                <BottomSpacer />
            </div>

            {/* <div className='section-panel' id='dummy-right-grid' /> */}
            <DummyRightPanel id='dummy-right-grid' />
        </div>
    );
}

export default Home;