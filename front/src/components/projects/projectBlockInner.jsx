import React from 'react';

const ProjectBlockInner = ({ index, title, creator, description, startDate, endDate, extraAction }) => {


    return (
        <div className="grid grid-cols-11 al text-center items-center h-full align-middle">
            <p className="col-span-2">{title}</p>
            <p className="col-span-1">{creator}</p>
            <p className="col-span-3">{description}</p>
            <p className="col-span-2">{startDate}</p>
            <p className="col-span-2">{endDate}</p>
            <div className='flex items-center justify-center'>
                {extraAction}
            </div>
        </div>
    );
};

export default ProjectBlockInner;