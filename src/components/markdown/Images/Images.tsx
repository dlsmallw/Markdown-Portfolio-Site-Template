import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

const ImgContainer: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ alt, ...props }) => {
    const isSVG = (url: string) => {
        if (!url) return false;

        const cleanURL = url.split('?')[0].split('#')[0];
        const result = cleanURL.toLowerCase().endsWith('.svg') ||
            url.toLowerCase().startsWith('data:image/svg+xml');

        return result;
    }

    const handleElemMouseMove = (e: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
        if (!imgRef.current || !isHovered) return;
    
        let xAdjust = 0

        if (containerRef.current && imgRef.current.closest('.skills-grid')) {
            const flexBasis = window.getComputedStyle(containerRef.current).flexBasis;

            if (flexBasis.includes('px')) {
                xAdjust = parseFloat(flexBasis) / 2;
            }
        }

        const rect = imgRef.current.getBoundingClientRect();
        const x = xAdjust + e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setTTCoords({
            left: x + 15,
            top: y + 15,
        });
    }

    const [svg, setSvg] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [ttCoords, setTTCoords] = useState({ left: 0, top: 0 });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | HTMLDivElement | null>(null);

    const lastMousePosition = useRef({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            lastMousePosition.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const handleScroll = (e: Event) => {
            const element = imgRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = lastMousePosition.current.x;
            const y = lastMousePosition.current.y;


            const stillHovering = 
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom &&
                y >= rect.top;

            setIsHovered(stillHovering);
        };

        setTTCoords({ left: 0, top: 0 });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (props.src && isSVG(props.src)) {
            fetch(props.src)
                .then(res => res.text())
                .then(setSvg);
        }
    }, [props.src]);

    return (
        <div className='img-outer-container'>
            <div ref={containerRef} className='img-cell'>
                {props.src && !isSVG(props.src) ? (
                    <img className='image-icon' ref={(element) => { imgRef.current = element; }} alt={alt} {...props} 
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseMove={handleElemMouseMove}
                    />
                ) : (
                    <div
                        className="image-icon"
                        ref={imgRef}
                        dangerouslySetInnerHTML={{ __html: svg }}
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseMove={handleElemMouseMove}
                    />
                )}
                <span className='cursor-tooltip'
                    style={{
                        left: isHovered ? `${ttCoords.left}px` : '0px',
                        top: isHovered ? `${ttCoords.top}px` : '0px',
                        opacity: isHovered ? 1 : 0,
                        visibility: isHovered ? 'visible' : 'hidden'
                    }}>{alt}</span>
            </div>
        </div>
    )
}

const ImageComponentRegistry = {
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
        return (
            <ImgContainer {...props} />
        )
    }
}

export default ImageComponentRegistry;