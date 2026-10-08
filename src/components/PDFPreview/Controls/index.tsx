import { type HTMLAttributes } from "react";

import { MediaComponent } from "@components";

import styles from './component.module.css';

interface UpperControlBarProps extends HTMLAttributes<HTMLDivElement> {
    numPages: number | null;
    currentPage: number;
    zoom: number;
    fileURL: string;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const UpperControlBar: React.FC<UpperControlBarProps> = ({ zoom, setZoom, numPages, currentPage, fileURL }) => {
    const handleZoomIn = () => {
        setZoom((prev: number) => Math.min(prev + 0.1, 3.0));
    };

    const handleZoomOut = () => {
        setZoom((prev: number) => Math.max(prev - 0.1, 0.5));
    };

    return (
        <div className={styles.upperControlBar} >
            <div className={`${styles.leftGrid}`} >
                {numPages && (
                    <>
                        <span className={styles.pageIndexText} >Page</span>
                        <span className={styles.pageIndexText} >{currentPage}</span>
                        <span className={styles.pageIndexText} >of</span>
                        <span className={styles.pageIndexText} >{numPages}</span>
                    </>
                )}
            </div>

            <div className={styles.divider} />

            <div className={`${styles.centerGrid}`} >
                <div className={styles.zoomControls} >
                    
                    <MediaComponent
                        className={`${styles.zoomButton}`}
                        src="/src/static/assets/icons/minus-icon.svg"
                        ref={undefined}
                        onClick={handleZoomOut}
                    />
                    <div className={styles.zoomLevelContainer} >
                        {Math.round(zoom * 100)}%
                    </div>
                    <MediaComponent
                        className={`${styles.zoomButton}`}
                        src="/src/static/assets/icons/plus-icon.svg"
                        ref={undefined}
                        onClick={handleZoomIn}
                    />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.rightGrid}`} >
                <a 
                    className={styles.downloadButton} 
                    title="Download PDF" 
                    download={fileURL.split('/').pop() || 'document.pdf'} 
                    href={fileURL}
                    
                >
                    <MediaComponent
                        className={`${styles.downloadIcon}`}
                        src="/src/static/assets/icons/download-icon.svg"
                        ref={undefined}
                    />
                </a>
            </div>
        </div>
    )
}

export default UpperControlBar;