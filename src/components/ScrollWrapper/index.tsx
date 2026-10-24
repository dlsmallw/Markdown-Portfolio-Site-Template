import { type HTMLAttributes, useState, useRef, useEffect, useLayoutEffect } from "react";

export interface ScrollWrapperProps extends HTMLAttributes<HTMLDivElement> {
    scrollPos?: number;
    setScrollPos?: React.Dispatch<React.SetStateAction<number>>;
}

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ scrollPos, setScrollPos, ...props }) => {
    const [currScrollPos, setCurrScrollPos] = useState(scrollPos);
    const scrollStateRef = useRef(currScrollPos);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollStateRef.current = currScrollPos;
    }, [currScrollPos]);

    useEffect(() => {
        return () => {
            setScrollPos(scrollStateRef.current);
        }
    }, []);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            top: scrollPos,
            behavior: 'instant',
        });
    }, []);

    return (
        <div {...props} ref={containerRef} onScroll={(e) => setCurrScrollPos(e.currentTarget.scrollTop)} />
    )
}

export default ScrollWrapper;