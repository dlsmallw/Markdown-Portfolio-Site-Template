import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../util/ScrollSpy';
import { InpageNavBtn, InpageNavbarContainer } from '../components/InpageNavigation';

import BottomSpacer from '../components/BottomSpacer';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import * as paths from '../config';
import { processMarkdown } from '../util/Markdown';
import PageSection from '../components/PageSection';
import { create } from 'domain';

const loremipsum = "lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque";

export async function homepageClientLoader({ params }: LoaderFunctionArgs) {
    const introMDRaw = await fetch(new URL('../data/home/intro.md', import.meta.url)).then((response) => response.text());
    const introMarkdown = await processMarkdown(String(introMDRaw));

    return { introMarkdown };
}


const Home: React.FC = () => {
    const [sections, setSections] = useState<{ id: string, ref: RefObject<HTMLDivElement | null>, header: string, content: string }[]>();
    const { introMarkdown } = useLoaderData();

    // const compMap: Record<string, React.FC<{ scrollRef: RefObject<HTMLDivElement | null>}>> = {
    //     'intro': IntroSection,
    //     'about': AboutSection,
    //     'skill': SkillsSection,
    //     'experience': ExperienceSection,
    //     'education': EducationSection,
    //     'project': ProjectsSection,
    //     'strength': StrengthsSection,
    //     'contact': ContactSection
    // }

    const introRef = useRef(null);

    const activeSection = useScrollSpy(['intro-section'], { threshold: 0.80 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        elementRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    };

    useEffect(() => {
        // const defaultSections: { id: string, ref: RefObject<HTMLDivElement | null>, header: string, content: string }[] = [
        //     { id: 'intro', ref: createRef(), header: 'Introduction', content: loremipsum },
        //     { id: 'about', ref: createRef(), header: 'About', content: loremipsum },
        //     { id: 'skill', ref: createRef(), header: 'Skills', content: loremipsum },
        //     { id: 'experience', ref: createRef(), header: 'Experience', content: loremipsum },
        //     { id: 'education', ref: createRef(), header: 'Education', content: loremipsum },
        //     { id: 'project', ref: createRef(), header: 'Featured Projects', content: loremipsum },
        //     { id: 'strength', ref: createRef(), header: 'Strengths', content: loremipsum },
        //     { id: 'contact', ref: createRef(), header: 'Contact Details', content: loremipsum }
        // ]

        // setSections(defaultSections);
    }, []);

    return (
        <div className='Home-Page' id="outer-container" style={{
            ...CustomStyles.outerContainer,
        }}>
            <InpageNavbarContainer>
                <InpageNavBtn isActive={activeSection === `${'intro'}-section`} onClick={() => handleScroll(introRef)} >{'Introduction'}</InpageNavBtn>
                {/* {sections?.map((section) => {

                    return (
                        <InpageNavBtn isActive={activeSection === `${section.id}-section`} onClick={() => handleScroll(section.ref)}>{section.header}</InpageNavBtn>
                    )
                })} */}
            </InpageNavbarContainer>

            <div id='content-container' style={CustomStyles.contentContainer}>
                {/* {sections?.map((section) => {
                    const CompType = compMap[section.id];
                    return (
                        <CompType scrollRef={section.ref} />
                    )
                })} */}

                <PageSection scrollRef={introRef} id={'intro-section'} key={'intro-section'} markdown={introMarkdown} />

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