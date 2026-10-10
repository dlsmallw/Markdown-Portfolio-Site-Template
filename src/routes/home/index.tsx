import React, { useEffect, useState, type HTMLAttributes } from 'react';
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

export const Home: React.FC = () => {
    const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement | null>>();
    const { homeData, navbarHeight } = useOutletContext<AppDataContextType>();


    const activeSection = useScrollSpy(homeData.sectionData?.map((section) => {
        return `${section.id}-section`;
    }), { root: null, rootMargin: `-${navbarHeight + 200}px 0px 0px 0px`, threshold: 0 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        const current = elementRef.current;

        if (!current) return;

        current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        }); 

        setTargetRef(elementRef);
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
        // handleInitTargetRef();

        // console.log(homeData)
        // const parentElement = document.querySelector('#content-container');
        // const sectionElements = Array.from(parentElement.querySelectorAll<HTMLElement>(':scope > .page-section'));
        // const sectionIDs = sectionElements.map((elem) => elem.id);

        // setSections(sectionIDs);

        return () => {
            window.removeEventListener('resize', handleMaintainSection)
        }
    }, []);

    // useEffect(() => {
    //     if (targetRef.current) {
    //         const id = targetRef.current.id;

    //         if (activeSection && activeSection !== id) {
    //             setTargetRef(activeSection);
    //         }
    //     }
        
    // }, [activeSection]);

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
                                // setTargetRef(section.ref);
                            }}
                        >{section.navLabel}</InpageNavButton>
                    )
                }) : null}
            </InpageNavbarContainer>

            
                {
                    homeData.markdown ? (
                        <div className={styles.contentContainer} id='content-container'>
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
                        </div>
                    ) : <div className={styles.loadingContainer}>Loading...</div>
                }

            <DummyRightPanel id='dummy-right-grid' />
        </div>
    );
}

// const Home: React.FC = () => {
//     const [sections, setSections] = useState<string[]>([]);
//     const [targetRef, setTargetRef] = useState<React.RefObject<HTMLDivElement | null>>();
//     const { homeData, navbarHeight } = useOutletContext<AppDataContextType>();

//     const activeSection = useScrollSpy(homeData.sectionOrder.map((section) => {
//         return `${section}-section`;
//     }), { root: null, rootMargin: `-${navbarHeight + 200}px 0px 0px 0px`, threshold: 0 });

//     const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
//         const current = elementRef.current;

//         if (!current) return;

//         current.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'start',
//             inline: 'nearest'
//         }); 
//     };

//     const handleMaintainSection = () => {
//         if (targetRef?.current) {
//             targetRef.current.scrollIntoView({behavior: 'instant' as unknown as ScrollBehavior, block: 'start'});
//         }
//     }

//     const handleInitTargetRef = () => {
//         if (homeData.sectionData && !targetRef?.current) {
//             setTargetRef(homeData.sectionData[0].ref);
//         }
//     }

//     useEffect(() => {
//         window.addEventListener('resize', handleMaintainSection);
//         handleInitTargetRef();

//         // console.log(homeData)
//         const parentElement = document.querySelector('#content-container');
//         const sectionElements = Array.from(parentElement.querySelectorAll<HTMLElement>(':scope > .page-section'));
//         const sectionIDs = sectionElements.map((elem) => elem.id);

//         setSections(sectionIDs);

//         return () => {
//             window.removeEventListener('resize', handleMaintainSection)
//         }
//     }, []);

//     return (
//         <div className={styles.homePage} id="outer-container">
//             <InpageNavbarContainer>
//                 {homeData.sectionData ? homeData.sectionData.map((section, index) => {
//                     let isActive = false;
//                     if (!activeSection && index === 0) isActive = true;
//                     else isActive = activeSection === `${section.id}-section`;
//                     return (
//                         <InpageNavButton 
//                             key={`${section.id}-nav-btn`}
//                             isActive={isActive}  
//                             onClick={() => {
//                                 handleScroll(section.ref);
//                                 setTargetRef(section.ref);
//                             }}
//                         >{section.navLabel}</InpageNavButton>
//                     )
//                 }) : null}
//             </InpageNavbarContainer>

//             <div className={styles.contentContainer} id='content-container'>
//                 {homeData.sectionData ? homeData.sectionData.map((section, index) => {
//                     const heightStyle = index === homeData.sectionData.length - 1 ? {height: 'var(--view-height)'} : {};
//                     return (
//                         <div key={`s-${index}`}>
//                             <PageSection 
//                                 style={{ ...heightStyle }}
//                                 scrollRef={section.ref} 
//                                 id={`${section.id}-section`} 
//                                 key={section.id} 
//                                 markdown={section.markdown as VFile} 
//                             />
//                             {index < homeData.sectionData.length -1 && (
//                                 <SectionBorder id='section-border' key={`section-spacer-${index}`} />
//                             )}
//                         </div>
//                     )
//                 }) : <div className={styles.loadingContainer}>Loading...</div>}
//             </div>

//             <DummyRightPanel id='dummy-right-grid' />
//         </div>
//     );
// }

export default Home;