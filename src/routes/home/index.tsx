import React, { useEffect, useLayoutEffect, useRef, type HTMLAttributes } from 'react';
import { useOutletContext } from 'react-router';

import type { AppDataContextType } from '@typing/DataLoading';

import { 
    PageSection, 
} from '@components';

import {
    LeftSideBar,
    ContentContainer
} from '@layouts/Page';

import PageContainer from '@layouts/Page';

import styles from './route.module.css';
import ReactMarkdown from 'react-markdown';
import ComponentRegistry from '@components/markdown';
import rehypeRaw from "rehype-raw";
import InpageNavbar from '@components/InpageNavigation';
import { useAppState } from '@layouts/App';

export const Home: React.FC = () => {
    const { homeProps } = useOutletContext<AppDataContextType>();
    const homeData = homeProps.pageData;

    const { setSidebarContent } = useAppState();

    const targetSectionRef = useRef<string | null>(null);

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        const current = elementRef.current;

        if (!current) return;

        current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        }); 

        targetSectionRef.current = `${current.id}-section`;
    };

    const handleMaintainSection = () => {
        const targetSection = targetSectionRef.current;
        if (targetSection) {
            const element = (homeData.sectionData.find((section) => section.id === targetSection.split('-')[0])?.ref)?.current;
            if (!element) return;

            element.scrollIntoView({behavior: 'instant' as unknown as ScrollBehavior, block: 'start'});
        }
    }

    const SideNavbar = ({ className }: { className?: string }) => {
        return (
            <InpageNavbar className={className} sectionState={homeProps.sectionState} sections={homeData.sectionData} targetSectionRef={targetSectionRef} handleScroll={handleScroll} />
        )
    }

    useEffect(() => {
        window.addEventListener('resize', handleMaintainSection);
        
        return () => {
            window.removeEventListener('resize', handleMaintainSection);
            homeProps.setSectionState(targetSectionRef.current);
            setSidebarContent(null);
        }
    }, []);

    useLayoutEffect(() => {
        if (homeProps.sectionState) {
            targetSectionRef.current = homeProps.sectionState;
        }

        setSidebarContent(<SideNavbar className={styles.sideNavbar} />);
    }, [])

    return (
        <PageContainer>
            <LeftSideBar>
                <SideNavbar />
            </LeftSideBar>

            {
                homeData.markdown ? (
                    <ContentContainer scrollPos={homeProps.scrollPos} setScrollPos={homeProps.setScrollPos} >
                        <ReactMarkdown 
                            components={{
                                ...ComponentRegistry,
                                ...{
                                    ['section-container']: (props: { navLabel: string; } & Partial<HTMLAttributes<HTMLDivElement>>) => {
                                        const numSections = homeData.sectionData.length;
                                        const sectionIndex = homeData.sectionData.findIndex((section) => `${section.id}-section` === props.id);
                                        const isLastSection = sectionIndex === numSections - 1;
                                        
                                        return (
                                            <PageSection 
                                                {...props} 
                                                key={`s-${sectionIndex}`}
                                                scrollRef={homeData.sectionData[sectionIndex]?.ref} 
                                                className={`${props.className}`} 
                                                lastSection={isLastSection} 
                                            />
                                        )
                                    }
                                }
                            }} rehypePlugins={[rehypeRaw]}
                        >
                            {`${homeData.markdown.value}`}
                        </ReactMarkdown>
                    </ContentContainer>
                ) : <div className={styles.loadingContainer}>Loading...</div>
            }

        </PageContainer>
    );
}

export default Home;