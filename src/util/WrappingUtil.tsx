import { useEffect, useRef, useState } from "react";

export function useIsWrapped() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isWrapped, setIsWrapped] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const checkIsWrapped = () => {
            const children = Array.from(container.children);

            if (children.length < 2) return;

            const ch1Top = children[0].getBoundingClientRect().top;
            const ch2Top = children[children.length - 1].getBoundingClientRect().top;

            setIsWrapped(ch2Top > ch1Top);
        }

        const resizeObserver = new ResizeObserver(checkIsWrapped);
        resizeObserver.observe(container);

        checkIsWrapped();

        return () => resizeObserver.disconnect();
    }, [])

    return { containerRef, isWrapped };
}