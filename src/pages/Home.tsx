import { useEffect, useRef, useState } from 'react';
import logo from '../logo.svg';

const NavBtn: React.FC<{ isActive: boolean, onClick: () => void, children: React.ReactNode }> = ({ isActive, onClick, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button onClick={onClick} style={{
            ...CustomStyles.navBtn, 
            borderRight: isActive ? '1px solid #ccc' : 'none',
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

const PageSection: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null>, id: string, children: React.ReactNode }> = ({ scrollRef, id, children }) => {
    return (
        <div key={id} id={id} ref={scrollRef} style={CustomStyles.pageSection}>
            {children}
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

function useScrollSpy(sectionIDs: string[], options?: IntersectionObserverInit): string | null { 
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const visibleSections = useRef<Record<string, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                visibleSections.current[entry.target.id] = entry.isIntersecting;
            });

            const currActive = sectionIDs.find(id => visibleSections.current[id]);
            if (currActive) {
                setActiveSection(currActive);
            }
        }, options);

        sectionIDs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        // return observer.disconnect();
    }, [sectionIDs, options]);

    return activeSection;
}

const Home: React.FC = () => {
    const introRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const strengthsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const activeSection = useScrollSpy(['introduction', 'about', 'skills', 'experience', 'education', 'projects', 'strengths', 'contact'], { threshold: 0.80 });

    const handleScroll = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        elementRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    };

    return (
        <div style={CustomStyles.outerContainer}>
            <InpageNavbarContainer>
                <NavBtn isActive={activeSection === 'introduction'} onClick={() => handleScroll(introRef)}>Introduction</NavBtn>
                <NavBtn isActive={activeSection === 'about'} onClick={() => handleScroll(aboutRef)}>About</NavBtn>
                <NavBtn isActive={activeSection === 'skills'} onClick={() => handleScroll(skillsRef)}>Skills</NavBtn>
                <NavBtn isActive={activeSection === 'experience'} onClick={() => handleScroll(experienceRef)}>Experience</NavBtn>
                <NavBtn isActive={activeSection === 'education'} onClick={() => handleScroll(educationRef)}>Education</NavBtn>
                <NavBtn isActive={activeSection === 'projects'} onClick={() => handleScroll(projectsRef)}>Featured Projects</NavBtn>
                <NavBtn isActive={activeSection === 'strengths'} onClick={() => handleScroll(strengthsRef)}>Strengths</NavBtn>
                <NavBtn isActive={activeSection === 'contact'} onClick={() => handleScroll(contactRef)}>Contact</NavBtn>
            </InpageNavbarContainer>

            <ContentContainer>
                <PageSection scrollRef={introRef} id="introduction">
                    <h1>Introduction</h1>
                    <p style={CustomStyles.contentText}>Welcome to my portfolio!</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={aboutRef} id="about">
                    <h1>About Me</h1>
                    <p style={CustomStyles.contentText}>Here's some information about me.</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={skillsRef} id="skills">
                    <h1>Skills</h1>
                    <p style={CustomStyles.contentText}>These are my skills.</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={experienceRef} id="experience">
                    <h1>Experience</h1>
                    <p style={CustomStyles.contentText}>Here's my work experience.</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={educationRef} id="education">
                    <h1>Education</h1>
                    <p style={CustomStyles.contentText}>Here's my educational background.</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={projectsRef} id="projects">
                    <h1>Featured Projects</h1> 
                     <p style={CustomStyles.contentText}>Here are some of my featured projects.</p>
                     <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={strengthsRef} id="strengths">
                    <h1>Strengths</h1>
                    <p style={CustomStyles.contentText}>These are my strengths.</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
                <PageSection scrollRef={contactRef} id="contact">
                    <h1>Contact</h1>
                    <p style={CustomStyles.contentText}>Here's how to contact me.</p>
                    <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
                </PageSection>
            </ContentContainer>
        </div>
    );
}

const CustomStyles: Record<string, React.CSSProperties> = {
    outerContainer: {
        display: 'grid',
        gridTemplateColumns: '0.5fr 1.5fr 0.5fr',
        
        // alignItems: 'start',
        
        // minHeight: '100vh',
        // paddingTop: '8vh',
    },
    contentContainer: {
        // top: 'max(calc(8vh + 20px), 70px)',
        margin: 'auto auto 60vh 20px',
        // marginTop: '20px',
        textAlign: 'center',
        width: '50vw',
        // marginBottom: '35vh'
    },
    contentText: {
        fontSize: 'clamp(0.5rem, 1rem + 2vmin, 1.25rem)',
    },
    inpageNavbarGrid: {
        position: 'sticky',
        top: 'max(calc(8vh + 20px), 70px)',
        overflowY: 'auto',
        height: 'calc(100vh - max(calc(8vh + 20px), 70px) - 10px)',
        
        borderRight: '1px solid #cccccc2d',
        width: 'fit-content',
        minWidth: '150px',
        paddingLeft: '10px',
        scrollbarWidth: 'none',
    },
    inpageNavbar: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'calc(3px + 2vmin)',
        width: '100%',
        marginTop: '3vh',
        marginRight: '20px',
    },
    navBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'left',
        height: 'fit-content',
    },
    pageSection: {
        scrollMarginTop: 'max(calc(8vh + 20px), 70px)',
        textAlign: 'left',
        paddingTop: '10px',
        paddingBottom: '20px',
    },
};

export default Home;