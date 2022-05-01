import React, { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'//Icon

export const SelectAddable = (props) => {
  const {options = [], setOptions, query = "", setQuery} = props;
  const [selected, setSelected] = useState(0)
  const [active, setActive] = useState(true)//pendiente
  const [open, setOpen ] = useState(true)

  const filterOptions = (()=>(
    //searcher
    query === ''
      ? options
      : options.filter((option) =>
        option.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes( query.toLowerCase().replace(/\s+/g, '') )
      )    
    )
  )

  useEffect (()=> {
    //console.log(filterOptions)

  }, [filterOptions])

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
      <div 
        data-testid='listBox'
        className={`${!open && 'invisible'}  focus:outline-none absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-black ring-0 sm:text-sm`}>
        
        <div className="relative cursor-default select-none text-gray-700 rounded-xl">
          {filterOptions().length === 0 ? (
            <span className='pl-9 py-2 flex'> Nada Encontrado </span>
          ):(
            filterOptions().map((option, index) => (
              
              <div 
                className = 
                  {`flex px-2 py-2 hover:bg-teal-700 hover:text-white ${index != options.length - 1 && 'border-b'}`}
                key={option.id}
                onClick={ () => setActive(option.id) }
              >
                <img src={option.image} alt="" className="flex-shrink-0 mr-2 h-5 w-5 rounded-full" />
                <span>{option.name}</span>
              </div>
            ))
          )
          }
        </div>
      </div>
    </div>
  )
}
