import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useScrollSpy } from '../../util/ScrollSpy';
import { InpageNavBtn, InpageNavbarContainer } from '../../components/InpageNavigation/InpageNavigation';
import { AppDataContextType } from '../../types/DataLoading';

import BottomSpacer from '../../components/BottomSpacer/BottomSpacer';
import PageSection from '../../components/Section/Section';

import styles from './Home.module.css';

const Home: React.FC = () => {
    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement | null>>();
    const { homeData, navbarHeight } = useOutletContext<AppDataContextType>();

    let activeSection = useScrollSpy(homeData.sectionOrder.map((section, index) => {
        return `${section}-section`;
    }), { root: null, rootMargin: `-${navbarHeight + 45}px 0px 0px 0px`, threshold: 0 });

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
    })

    useEffect(() => {
        
    }, []);

    return (
        <div className='Home-Page' id="outer-container">
            <InpageNavbarContainer>
                {homeData.sectionData ? homeData.sectionData.map((section) => {
                    return (
                        <InpageNavBtn isActive={activeSection === `${section.id}-section`} key={`${section.id}-nav-btn`} onClick={() => {
                            handleScroll(section.ref);
                            setTargetRef(section.ref);
                        }}>{section.navLabel}</InpageNavBtn>
                    )
                }) : null}
            </InpageNavbarContainer>

            <div id='content-container'>
                {homeData.sectionData ? homeData.sectionData.map((section, index) => {
                    return (
                        <div key={`s-${index}`}>
                            <PageSection scrollRef={section.ref} id={`${section.id}-section`} key={section.id} markdown={section.markdown} />
                            {index < homeData.sectionData.length -1 && (
                                <div id='section-border'  key={`section-spacer-${index}`} />
                            )}
                        </div>
                    )
                }) : <p>Loading...</p>}

                <BottomSpacer />
            </div>

            <div className='section-panel' id='dummy-right-grid' />
        </div>
    );
}

export default Home;