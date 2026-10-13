import React, { useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { useOutletContext } from 'react-router';

import { useScrollSpy } from '@utils';
import type { AppDataContextType } from '@typing/DataLoading';

import { 
    PageSection, 
    SectionBorder, 
    DummyRightPanel, 
    InpageNavButton,
    InpageNavbarContainer
} from '@components';

import styles from './route.module.css';
import ReactMarkdown from 'react-markdown';
import ComponentRegistry from '@components/markdown';
import rehypeRaw from "rehype-raw";

interface ScrollWrapperProps extends HTMLAttributes<HTMLDivElement> {
    scrollPos: number;
    setScrollPos: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ scrollPos, setScrollPos, ...props }) => {
    const [currScrollPos, setCurrScrollPos] = useState(scrollPos);
    const scrollStateRef = useRef(currScrollPos);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollStateRef.current = currScrollPos;
    }, [currScrollPos]);

    useEffect(() => {
        return () => {
            setScrollPos(scrollStateRef.current);
        }
    }, []);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            top: scrollPos,
            behavior: 'instant',
        });
    }, []);

    return (
        <div {...props} ref={containerRef} onScroll={(e) => setCurrScrollPos(e.currentTarget.scrollTop)} />
    )
}

export const Home: React.FC = () => {
    const { homeProps, navbarHeight } = useOutletContext<AppDataContextType>();
    const homeData = homeProps.pageData;

    const [isMounted, setIsMounted] = useState(false);
    

    const activeSection = useScrollSpy(
        homeProps.sectionState, 
        homeData.sectionData?.map((section) => {
            return `${section.id}-section`;
        }), 
        { 
            root: null, 
            rootMargin: `-${navbarHeight + 200}px 0px 0px 0px`, 
            threshold: 0 
        }
    );

    const targetSectionRef = useRef<string | null>(null);

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
        const targetSection = targetSectionRef.current;
        if (targetSection) {
            console.log(targetSection);
            const element = (homeData.sectionData.find((section) => section.id === targetSection.split('-')[0])?.ref)?.current;
            console.log(element);
            if (!element) return;

            element.scrollIntoView({behavior: 'instant' as unknown as ScrollBehavior, block: 'start'});
        }
    }

    useEffect(() => {
        if (isMounted) {
            targetSectionRef.current = activeSection;
        }
    }, [activeSection])

    useEffect(() => {
        window.addEventListener('resize', handleMaintainSection);
        setIsMounted(true);
        
        return () => {
            window.removeEventListener('resize', handleMaintainSection);
            setIsMounted(false);
            homeProps.setSectionState(targetSectionRef.current);
        }
    }, []);

    useLayoutEffect(() => {
        if (homeProps.sectionState) {
            targetSectionRef.current = homeProps.sectionState;
        }
    }, [])

    return (
        <div className={styles.homePage} id="outer-container">
            <InpageNavbarContainer>
                {homeData.sectionData ? homeData.sectionData.map((section, index) => {
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
                                targetSectionRef.current = `${section.id}-section`;
                            }}
                        >{section.navLabel}</InpageNavButton>
                    )
                }) : null}
            </InpageNavbarContainer>

                {
                    homeData.markdown ? (
                        <ScrollWrapper scrollPos={homeProps.scrollPos} setScrollPos={homeProps.setScrollPos} className={styles.contentContainer} id='content-container'>
                            <ReactMarkdown components={{
                                ...ComponentRegistry,
                                ...{
                                    ['section-container']: (props: { navLabel: string; } & Partial<HTMLAttributes<HTMLDivElement>>) => {
                                        const numSections = homeData.sectionData.length;
                                        const sectionIndex = homeData.sectionData.findIndex((section) => `${section.id}-section` === props.id);
                                        const isLastSection = sectionIndex === numSections - 1;
                                        
                                        return (
                                            <div key={`s-${sectionIndex}`}>
                                                <PageSection {...props} className={`${isLastSection ? "last-page-section" : props.className}`} scrollRef={homeData.sectionData[sectionIndex]?.ref} />
                                                {!isLastSection && <SectionBorder id='section-border' key={`section-spacer-${sectionIndex}`} />}
                                            </div>
                                        )
                                    }
                                }
                            }} rehypePlugins={[rehypeRaw]}>
                                {`${homeData.markdown.value}`}
                            </ReactMarkdown>
                        </ScrollWrapper>
                    ) : <div className={styles.loadingContainer}>Loading...</div>
                }

            <DummyRightPanel id='dummy-right-grid' />
        </div>
    );
}

export default Home;