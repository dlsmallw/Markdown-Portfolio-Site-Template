import React, { useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import { useOutletContext } from 'react-router';

import { useScrollSpy } from '@utils';
import type { AppDataContextType } from '@typing/DataLoading';

import { 
    PageSection, 
    SectionBorder, 
    DummySidePanel, 
    InpageNavButton,
    InpageNavbarContainer
} from '@components';

import styles from './route.module.css';
import ReactMarkdown from 'react-markdown';
import ComponentRegistry from '@components/markdown';
import rehypeRaw from "rehype-raw";

interface ScrollWrapperProps extends HTMLAttributes<HTMLDivElement> {
    scrollPos: number;
    setScrollPos: React.Dispatch<React.SetStateAction<number>>;
}

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ scrollPos, setScrollPos, ...props }) => {
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

const PageContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return (
        <div {...props} className={styles.pageContainer} />
    );
}

export default PageContainer;