import React from 'react';

const ProjectBlockInner = ({name, member, description, startDate, endDate, extraAction}) => {
    const clickHandler = () => {

    }

    return (
        <div className="grid grid-cols-11 al text-center items-center h-full align-middle">
            <p className="col-span-2">{name}</p>
            <p className="col-span-1">{member}</p>
            <p className="col-span-3">{description}</p>
            <p className="col-span-2">{startDate}</p>
            <p className="col-span-2">{endDate}</p>
            <div className='flex items-center justify-center'>
                <p className="col-span-1 font-bold text-3xl cursor-pointer w-fit" onClick={clickHandler()}>&#8942;</p>
            </div>
        </div>
    );
};

export default ProjectBlockInner;