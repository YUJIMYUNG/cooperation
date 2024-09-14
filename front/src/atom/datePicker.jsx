import React, { useState } from 'react';


const DatePickerAtom = ({date, onChange, placeholder}) => {

	const handleDateChange = (e) => {
		const newDate = new Date(e.target.value);
		onChange(newDate);
	  };

	return (
	  <div className="relative max-w-sm font-nanum-squareB">
		<input
		  type="date"
		  value={date.toISOString().split('T')[0]}
		  onChange={handleDateChange}
		  className="bg-white border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-300 pl-1 p-2.5"
		  placeholder={placeholder}
		/>
		<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
		 
		</div>
	  </div>
	);
};

export default DatePickerAtom;