const Bold: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <span style={{ fontWeight: 'bold'}}>{children}</span>
    )
}

export { Bold }