import React from 'react'

export const InputBox = (props) => {
  const {options, setOptions, query, setQuery} = props;

  
  return (

    <div className="fixed top-16 w-72">
      <div className="mt-1 relative">
        <div className="focus:outline-none relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <input 
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-800 focus:ring-0"
            type="text"
          />
        </div>
      </div>
    </div>
  )
}
