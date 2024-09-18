import React from 'react';
import logo from "../../logo.svg"

const ModalTop = ({category}) => {
    return (
        <div className="h-40 align-middle flex flex-col items-center justify-center gap-3">
                    <a href="/"><img src={logo} className="h-12 w-[70]"/></a>
                    <h2 className="text-yellow-400 font-nanum-squareB">{category}</h2>
        </div>
    );
};

export default ModalTop;