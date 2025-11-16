import React from 'react';
import AllApplications from './_components/AllApplication';
import { applicantsData } from './_components/AllApplicantsdata';

const AllApllicationPage = () => {
    return (
        <div>
            <AllApplications applications={applicantsData}/>
        </div>
    );
};

export default AllApllicationPage;

