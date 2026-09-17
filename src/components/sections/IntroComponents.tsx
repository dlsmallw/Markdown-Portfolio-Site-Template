import { HTMLAttributes } from "react";

const HeadshotContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div id='headshot-container'>
            {children}
        </div>
    )
}

const IntroComponentRegistry = {
    headshotcontainer: (props: HTMLAttributes<HTMLElement>) => { 
        return <HeadshotContainer {...props} children={props.children}></HeadshotContainer>;
    },
}

export default IntroComponentRegistry;