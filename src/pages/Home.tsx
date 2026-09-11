import { useEffect, useRef, useState } from 'react';
import logo from '../logo.svg';

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
        <div id="home-container" style={{
            ...CustomStyles.outerContainer,
        }}>
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
                <div id="bottom-spacer" style={{height: `calc(calc(${window.innerHeight}px - calc(max(8vh, 50px) + 20px)) - ${document.getElementById('contact')?.offsetHeight}px)`}}></div>
            </ContentContainer>
        </div>
    );
}

const CustomStyles: Record<string, React.CSSProperties> = {
    outerContainer: {
        display: 'grid',
        
    },
    contentContainer: {
        // top: 'max(calc(8vh + 20px), 70px)',
        margin: '10px auto auto 20px',
        // marginTop: '10px',
        textAlign: 'center',
        width: '50vw',
        // marginBottom: '35vh'
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
        
        // minWidth: 'fit-content',
        paddingLeft: '10px',
        scrollbarWidth: 'none',
    },
    inpageNavbar: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        
        minWidth: 'fit-content',

        
        
        // marginRight: '20px',
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