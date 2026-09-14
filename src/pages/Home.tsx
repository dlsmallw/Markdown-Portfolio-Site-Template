import { createRef, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useScrollSpy } from '../util/ScrollSpy';
import { InpageNavBtn, InpageNavbarContainer } from '../components/InpageNavigation';

import BottomSpacer from '../components/BottomSpacer';

import PageSection from '../components/PageSection';
import { VFile } from 'vfile';
import { useOutletContext } from 'react-router-dom';

import layoutJSON from '../data/home/layout.json';

const loremipsum = "lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque";

interface AppDataContextType {
    homeSectionData: { id: string, ref: React.RefObject<HTMLDivElement | null>, navLabel: string, markdown: VFile }[] | null,
    portfolioData: {} | null,
    navbarHeight: number
}

const Home: React.FC = () => {
    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement | null>>();

    const { homeSectionData, navbarHeight } = useOutletContext<AppDataContextType>();

    const sectionOrder: string[] = layoutJSON.sectionOrder;
    const activeSection = useScrollSpy(sectionOrder.map((section, index) => {
        return `${section}-section`;
    }), { root: null, rootMargin: `-${navbarHeight + 45}px 0px 0px 0px`, threshold: 0 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        elementRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        }); 
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

        return () => {
            window.removeEventListener('resize', handleMaintainSection)
        }
    })

    useEffect(() => {
        handleInitTargetRef();
    })

    return (
        <div className='Home-Page' id="outer-container" style={{
            ...CustomStyles.outerContainer,
        }}>
            <InpageNavbarContainer>
                {/* {sectionData.length > 0 && (
                    // <InpageNavBtn isActive={activeSection === `${sectionData[0].id}-section`} onClick={() => handleScroll(sectionData[0].ref)}>{sectionData[0].id}</InpageNavBtn>
                    <div>Populated</div>
                )} */}
                {homeSectionData ? homeSectionData.map((section) => {
                    return (
                        <InpageNavBtn isActive={activeSection === `${section.id}-section`} key={`${section.id}-nav-btn`} onClick={() => {
                            handleScroll(section.ref);
                            setTargetRef(section.ref);
                        }}>{section.navLabel}</InpageNavBtn>
                    )
                }) : null}
            </InpageNavbarContainer>

            <div id='content-container' style={CustomStyles.contentContainer}>
                {/* {sectionData.length > 0 && (
                    <PageSection scrollRef={sectionData[0].ref} id={sectionData[0].id} markdown={sectionData[0].markdown} />
                )} */}
                {homeSectionData ? homeSectionData.map((section) => {
                    return (
                        <PageSection scrollRef={section.ref} id={`${section.id}-section`} key={section.id} markdown={section.markdown} />
                    )
                }) : <p>Loading...</p>}

                <BottomSpacer />
            </div>
        </div>
    );
}

const CustomStyles: Record<string, React.CSSProperties> = {
    outerContainer: {
        display: 'grid',
        
    },
    contentContainer: {
        margin: '10px auto auto 20px',
        textAlign: 'center',
        width: '50vw',
    },
};

export default Home;