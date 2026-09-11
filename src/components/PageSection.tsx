const PageSection: React.FC<{ scrollRef: React.RefObject<HTMLDivElement | null>, id: string, children: React.ReactNode }> = ({ scrollRef, id, children }) => {
    return (
        <div className="page-section" key={id} id={id} ref={scrollRef} style={CustomStyles.pageSection}>
            {children}
        </div>
    )
}

const CustomStyles: Record<string, React.CSSProperties> = {
    pageSection: {
        scrollMarginTop: 'calc(max(8vh, 50px) + 20px)',
        textAlign: 'left',
        paddingBottom: '10px',
    },
};

export default PageSection;