import { useEffect, useState } from 'react';
import { useScrollSpy } from '../util/ScrollSpy';
import { InpageNavBtn, InpageNavbarContainer } from '../components/InpageNavigation';

import BottomSpacer from '../components/BottomSpacer';

import PageSection from '../components/PageSection';
import { VFile } from 'vfile';
import { useOutletContext } from 'react-router-dom';

import layoutJSON from '../data/home/layout.json';
interface AppDataContextType {
    homeSectionData: { id: string, ref: React.RefObject<HTMLDivElement | null>, navLabel: string, markdown: VFile }[] | null,
    portfolioData: {} | null,
    navbarHeight: number
}

const Home: React.FC = () => {
    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement | null>>();

    const { homeSectionData, navbarHeight } = useOutletContext<AppDataContextType>();

    const sectionOrder: string[] = layoutJSON.sectionOrder;
    let activeSection = useScrollSpy(sectionOrder.map((section, index) => {
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

        console.log(navbarHeight);
    }

    const handleInitTargetRef = () => {
        if (homeSectionData && !targetRef?.current) {
            setTargetRef(homeSectionData[0].ref);
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
                {homeSectionData ? homeSectionData.map((section) => {
                    return (
                        <InpageNavBtn isActive={activeSection === `${section.id}-section`} key={`${section.id}-nav-btn`} onClick={() => {
                            handleScroll(section.ref);
                            setTargetRef(section.ref);
                        }}>{section.navLabel}</InpageNavBtn>
                    )
                }) : null}
            </InpageNavbarContainer>

            <div id='content-container'>
                {homeSectionData ? homeSectionData.map((section) => {
                    return (
                        <PageSection scrollRef={section.ref} id={`${section.id}-section`} key={section.id} markdown={section.markdown} />
                    )
                }) : <p>Loading...</p>}

                <BottomSpacer />
            </div>

            <div className='side-panel' id='dummy-right-grid' />
        </div>
    );
}

export default Home;