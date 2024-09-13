import React from 'react';

const Search = ({onSubmit, placeholder}) => {
    return (
        <div className="relative flex">
        <input
          type="search"
          className="relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none "
          placeholder={placeholder}
          aria-label="search"
          id="searchForm"
          aria-describedby="search-area" />
      </div>
    );
};

export default Search;