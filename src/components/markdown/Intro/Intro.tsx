import { HTMLAttributes, useEffect } from "react";

const HeadshotContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    useEffect(() => {
        const elements = document.querySelectorAll("#intro-section .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        })
    }, []);
    
    return (
        <div id='headshot-container'>
            {children}
        </div>
    )
}

const IntroComponentRegistry = {
    headshotcontainer: (props: HTMLAttributes<HTMLDivElement>) => { 
        return <HeadshotContainer {...props} />
    },
}

export default IntroComponentRegistry;