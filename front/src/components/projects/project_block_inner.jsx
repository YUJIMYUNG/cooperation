import React from 'react';

const ProjectBlockInner = ({name, member, description, startDate, endDate, extraAction}) => {
    return (
        <div className="grid grid-cols-11 al text-center items-center h-full">
            <p className="col-span-2">{name}</p>
            <p className="col-span-1">{member}</p>
            <p className="col-span-3">{description}</p>
            <p className="col-span-2">{startDate}</p>
            <p className="col-span-2">{endDate}</p>
            <p className="col-span-1">{extraAction}</p>
        </div>
    );
};

export default ProjectBlockInner;