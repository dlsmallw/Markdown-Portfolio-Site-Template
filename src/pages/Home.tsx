import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { useScrollSpy } from '../util/ScrollSpy';

import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import StrengthsSection from '../components/sections/StrengthsSection';
import ContactSection from '../components/sections/ContactSection';
import IntroSection from '../components/sections/IntroSection';
import BottomSpacer from '../components/BottomSpacer';

const loremipsum = "lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque";

const NavBtn: React.FC<{ isActive: boolean, onClick: () => void, children: React.ReactNode }> = ({ isActive, onClick, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button onClick={onClick} style={{
            ...CustomStyles.navBtn, 
            borderRight: isActive ? '1px solid #ccc' : '1px solid transparent',
            opacity: isHovered ? 0.7 : 1,
            backgroundImage: isHovered ? 'linear-gradient(to right, transparent, #cccccc36)' : 'none',
            transition: 'opacity 0.3s ease-in-out, background-image 0.3s ease-in-out',
        }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {children}
        </button>
    )
}

const InpageNavbarContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return ( 
        <div style={CustomStyles.inpageNavbarGrid}>
            <div style={CustomStyles.inpageNavbar}>
                {children}
            </div>
        </div>
    )
}

const ContentContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div style={CustomStyles.contentContainer}>
            {children}
        </div>
    )
}

const Home: React.FC = () => {
    const [sections, setSections] = useState<{ id: string, ref: RefObject<HTMLDivElement | null>, header: string, content: string }[]>();

    const compMap: Record<string, React.FC<{ scrollRef: RefObject<HTMLDivElement | null>}>> = {
        'intro': IntroSection,
        'about': AboutSection,
        'skill': SkillsSection,
        'experience': ExperienceSection,
        'education': EducationSection,
        'project': ProjectsSection,
        'strength': StrengthsSection,
        'contact': ContactSection
    }

    const activeSection = useScrollSpy(['intro-section', 'about-section', 'skill-section', 'experience-section', 'education-section', 'project-section', 'strength-section', 'contact-section'], { threshold: 0.80 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        elementRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    };

    useEffect(() => {
        const defaultSections: { id: string, ref: RefObject<HTMLDivElement | null>, header: string, content: string }[] = [
            { id: 'intro', ref: createRef(), header: 'Introduction', content: loremipsum },
            { id: 'about', ref: createRef(), header: 'About', content: loremipsum },
            { id: 'skill', ref: createRef(), header: 'Skills', content: loremipsum },
            { id: 'experience', ref: createRef(), header: 'Experience', content: loremipsum },
            { id: 'education', ref: createRef(), header: 'Education', content: loremipsum },
            { id: 'project', ref: createRef(), header: 'Featured Projects', content: loremipsum },
            { id: 'strength', ref: createRef(), header: 'Strengths', content: loremipsum },
            { id: 'contact', ref: createRef(), header: 'Contact Details', content: loremipsum }
        ]

        setSections(defaultSections);
    }, []);

    return (
        <div id="home-container" style={{
            ...CustomStyles.outerContainer,
        }}>
            <InpageNavbarContainer>
                {sections?.map((section) => {
                    return (
                        <NavBtn isActive={activeSection === `${section.id}-section`} onClick={() => handleScroll(section.ref)}>{section.header}</NavBtn>
                    )
                })}
            </InpageNavbarContainer>

            <ContentContainer>
                {sections?.map((section) => {
                    const CompType = compMap[section.id];
                    return (
                        <CompType scrollRef={section.ref} />
                    )
                })}

                <BottomSpacer />
            </ContentContainer>
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
    contentText: {
        fontSize: 'clamp(0.5rem, 1rem + 2vmin, 1.25rem)',
    },
    inpageNavbarGrid: {
        position: 'sticky',
        top: 'calc(max(8vh, 50px) + 10px)',
        height: 'calc(100vh - calc(max(8vh, 50px) + 20px))',
        overflowY: 'auto',
        margin: '10px 0 10px 0',
        display: 'flex',
        justifyContent: 'right',
        
        borderRight: '1px solid #cccccc2d',
        width: '100%',
        paddingLeft: '10px',
        scrollbarWidth: 'none',
    },
    inpageNavbar: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 'fit-content',
    },
    navBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'left',
        paddingRight: 'min(20px, 2vw)',
        minWidth: '140px',
        fontSize: 'clamp(0.5rem, 1rem + 2vmin, 1.25rem)',
    },
    pageSection: {
        scrollMarginTop: 'calc(max(8vh, 50px) + 20px)',
        textAlign: 'left',
        paddingBottom: '10px',
    },
};

export default Home;