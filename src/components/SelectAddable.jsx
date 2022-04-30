import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export const SelectAddable = (props) => {
  const {options, setOptions, query, setQuery} = props;
  
  const filterOptions = (query) =>{

    options.filter (option => option.name === query)/*.sort(function(a,b){return b.date - a.date;})*/

    /*options.filter((option)=>{
      option.name
    })*/
  }

  return (
    
    <div className="fixed w-64">
      <div className=" hover:bg-white bg-gray-50 transition-all flex group items-center w-full overflow-hidden rounded-xl text-left shadow-md">
        <div className='w-7 h-5'>
          {/*query && <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" className="flex-shrink-0 ml-2 h-5 w-5 rounded-full" />*/}
        </div>
        <input 
          data-testid='input'
          className="outline-none border-none py-2 pl-1 pr-10 leading-5 hover:bg-white bg-gray-50 transition-all text-gray-800 focus:ring-0"
          type="text"
          placeholder='Selecciona una Opcion'
          onChange={ (event) => setQuery(event.target.value) }
        />
        <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none bg-teal-700 rounded-r-xl px-3 pt-1">
          <ChevronDownIcon className="h-5 w-5 text-white"/>
        </span>
      </div>

      
    </div>
  )
}
