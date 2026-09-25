import { useEffect, useState } from "react";

/**
 * Used to track the X and Y coords of the mouse on the window.
 * @returns mousePosition   The X and Y coords of the mouse.
 */
export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number; }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });

            
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }

        
    }, [mousePosition]);

    return { mousePosition };
}