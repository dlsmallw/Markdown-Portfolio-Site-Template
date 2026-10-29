import React, { useEffect, useLayoutEffect, useRef, type HTMLAttributes } from 'react';
import { useOutletContext } from 'react-router';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

import type { AppDataContextType, PageDataProps } from '@typing/DataLoading';
import { useAppState } from '@layouts/App';
import { PageSection, PDFPreviewer } from '@components';
import { LeftSideBar, ContentContainer } from '@layouts/Page';

import PageContainer from '@layouts/Page';
import ComponentRegistry from '@components/markdown';
import InpageNavbar from '@components/InpageNavigation';

import styles from './component.module.css';

export const ResumePage: React.FC = () => {
    const { resumePDFFileURL } = useOutletContext<AppDataContextType>();

    return (
        <PageContainer>
            <ContentContainer scrollable={false} className={styles.resumeContainer}>
                <PDFPreviewer fileURL={resumePDFFileURL} />
            </ContentContainer>
        </PageContainer>
    )
}

export const SitePage: React.FC<{ id?: string }> = ({ id }) => {
    const context = useOutletContext<AppDataContextType>();

    const pageProps = context[id] as PageDataProps;
    const pageData = pageProps.pageData;

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

        targetSectionRef.current = current.id;
    };

    const handleMaintainSection = () => {
        const targetSection = targetSectionRef.current;
        if (targetSection) {
            const element = (pageData.sectionData.find((section) => section.id === targetSection)?.ref)?.current;
            if (!element) return;

            element.scrollIntoView({behavior: 'instant' as unknown as ScrollBehavior, block: 'start'});
        }
    }

    const SideNavbar = ({ className }: { className?: string }) => {
        return <InpageNavbar className={className} sectionState={pageProps.sectionState} sections={pageData.sectionData} targetSectionRef={targetSectionRef} handleScroll={handleScroll} />;
    }

    useEffect(() => {
        window.addEventListener('resize', handleMaintainSection);
        
        return () => {
            window.removeEventListener('resize', handleMaintainSection);
            pageProps.setSectionState(targetSectionRef.current);
            setSidebarContent(null);
        }
    }, []);

    useLayoutEffect(() => {
        if (pageProps.sectionState) {
            targetSectionRef.current = pageProps.sectionState;
        }

        if (pageProps && pageData && pageData.sectionData.length > 0) {
            setSidebarContent(<SideNavbar className={styles.sideNavbar} />);
        } else {
            setSidebarContent(null);
        }
    }, [])

    return (
        <PageContainer>
            <LeftSideBar>
                <SideNavbar />
            </LeftSideBar>
            
            {pageData.markdown ? (
                <ContentContainer className={id ? styles[id] : ''} scrollPos={pageProps.scrollPos} setScrollPos={pageProps.setScrollPos} >
                    <ReactMarkdown 
                        components={{
                            ...ComponentRegistry,
                            ...{
                                ['section-container']: (props: { navLabel: string; } & Partial<HTMLAttributes<HTMLDivElement>>) => {
                                    const numSections = pageData.sectionData.length;
                                    const sectionIndex = pageData.sectionData.findIndex((section) => section.id === props.id);
                                    const isLastSection = sectionIndex === numSections - 1;
                                    
                                    return (
                                        <PageSection 
                                            {...props} 
                                            key={`s-${sectionIndex}`}
                                            scrollRef={pageData.sectionData[sectionIndex]?.ref} 
                                            className={`${props.className}`} 
                                            lastSection={isLastSection} 
                                        />
                                    )
                                }
                            }
                        }} rehypePlugins={[rehypeRaw]}
                    >
                        {`${pageData.markdown.value}`}
                    </ReactMarkdown>
                </ContentContainer>
            ) : (
                <div className={styles.loadingContainer}>Loading...</div>
            )}
        </PageContainer>
    );
}

export default SitePage;