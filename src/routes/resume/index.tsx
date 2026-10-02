import React from 'react';
import { useOutletContext } from 'react-router';

import styles from './route.module.css';
import PDFPreviewer from '../../components/PDFPreview';

import type { AppDataContextType } from '../../types/DataLoading';

const Resume: React.FC = () => {
    const { resumePDFFileURL } = useOutletContext<AppDataContextType>();

    return (
        <>
            {resumePDFFileURL &&
                <div className={styles.resumeContainer}>
                    <PDFPreviewer fileURL={resumePDFFileURL} />
                </div>
            }
        </>
    )
}

export default Resume;