import PageSection from '../PageSection';

const ProjectsSection: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null> }> = ({ scrollRef }) => {
    return (
        <PageSection scrollRef={scrollRef} id="project-section">
            <h1>Projects</h1>
            <p style={CustomStyles.contentText}>Here are some of my projects.</p>
            <p style={CustomStyles.contentText}>lorem ipsum dolor sit amet consectetur adipiscing elit veniam in aute quo laboris in omnis cupiditate qui ut similique vel pariatur cum quod consequatur ut aliquip omnis voluptas esse velit veniam quas do mollitia temporibus cum cillum sint et omnis accusamus voluptas non ea est qui irure aute non cumque</p>
        </PageSection>
    )
}

const CustomStyles: Record<string, React.CSSProperties> = {
    contentText: {
        fontSize: 'clamp(0.5rem, 1rem + 2vmin, 1.25rem)',
    },
};

export default ProjectsSection;