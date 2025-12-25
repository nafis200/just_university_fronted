
import React from 'react';
import UploadPage from './_components/pdfUpload/UploadPage';
import NewUploadPage from './_components/pdfUpload/NewUploadPage';
export const dynamic = "force-dynamic";
const AdminUpload = () => {
    return (
        <div>
            <NewUploadPage/>
        </div>
    );
};

export default AdminUpload;