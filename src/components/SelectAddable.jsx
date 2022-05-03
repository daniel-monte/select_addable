import React, { useState, useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'//Icon

export const SelectAddable = props => {
  const { options , setOptions, selected = {}, setSelected, setNewOption } = props;
  const inputSelect = useRef(null);
  
  const [ query, setQuery ] = useState('');
  const [ openListBox, setOpenListBox ] = useState(false);

  const [forceOpenList, setForceOpenList] = useState(false);
  const [indexHover, setIndexHover] = useState(0);

  const filterOptions = (()=>(
    //devuelve los coincidentes (no tiene en cuenta espacios ni acentos)
    query === '' || forceOpenList
      ? options
      : options.filter((option) =>
        option.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f-\s+]/g, '')
          .includes( query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f-\s+]/g, '') )
      )
    )
  )

  const selectOption = option => {
    setSelected(option);
    setQuery(option.name);

    setOpenListBox(false);
    setIndexHover(0)
  }

  const saveNewOption = ()=>{
    const ids = options.map(element=>{ return element.id });
    const newOption = {   
      id: Math.max.apply(null, ids) + 1, //incrementando el id
      name: query,
      image: "https://cdn-icons-png.flaticon.com/512/761/761777.png"
    }

    setOptions([...options, newOption]);
    setSelected(newOption);
    setNewOption(newOption); //lo estaran escuchando en app para guardar en la base de datos
    
    setForceOpenList(true);
    setIndexHover(options.length); // para indicar/pintar el elemento recien agregado en el listBox
  }

  const handleOnChange = e => {
    setIndexHover( 0 )
    setForceOpenList(false)
    setQuery(e.target.value)
    handleOpenListBox(e.target.value)
    
    e.target.value === '' && setSelected({})
  }

  const handleKeyDown = e => {
    e.keyCode === 13 ? //key enter ←
      filterOptions().length > 0 ? selectOption( filterOptions()[indexHover] ) : saveNewOption():
    e.keyCode === 38 && indexHover > 0 ? setIndexHover( indexHover - 1 ): //key arrow up ↑
    e.keyCode === 40 && indexHover < filterOptions().length - 1 && setIndexHover( indexHover + 1 ) //key arrow down ↓
  }
  
  const handleClickOpenBox = () =>{
    inputSelect.current.focus();

    const idx = options.indexOf(selected);
    setIndexHover(idx === -1 ? 0 : idx)

    setForceOpenList(!openListBox);
    setOpenListBox(!openListBox); //Forzar a abrir la lista de opciones completa (sin filtros)
  }

  const handleOpenListBox = q => {
    setIndexHover( 0 )
    filterOptions().length === 1 && filterOptions()[0].name === q
      ? setOpenListBox(false)
      : setOpenListBox(true);
  }

  return (
    <div className="fixed w-64">
      <div className="hover:bg-white bg-gray-50 transition-all flex group items-center w-full overflow-hidden rounded-xl text-left shadow-md">
        { selected.image !== undefined && <img src={selected.image} alt="" className="flex-shrink-0 ml-2 h-5 w-5 rounded-full" /> }
        <input 
          data-testid='input'
          className="outline-none border-none py-2 pl-2 pr-10 leading-5 hover:bg-white bg-gray-50 transition-all text-gray-900 focus:ring-0"
          type="text"
          placeholder='Selecciona una Opcion'
          ref={inputSelect}
          onChange = { handleOnChange }
          onKeyDown={ (e) => ( handleKeyDown(e) )}
         
          value = { query }
          onFocus = { (event)=> handleOpenListBox(event.target.value) }
        />
        <span
          data-testid='button-open-box'
          onClick = { handleClickOpenBox }
          className="absolute inset-y-0 right-0 flex items-center bg-teal-700 rounded-r-xl px-3 cursor-pointer">
            <span className="h-5 w-5 text-white">
              { openListBox ? <ChevronUpIcon /> : <ChevronDownIcon /> }
            </span>
        </span>
      </div>
      <div className={`${!openListBox && 'invisible'} transition ease-in duration-100 absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-black ring-0 sm:text-sm`}>
        <div 
          data-testid='list-box'
          className="relative cursor-default select-none text-gray-900 rounded-xl">
          {filterOptions().length === 0 && query !== '' ? (
            <span className='py-2 flex'> <p className='text-center w-full'> No encontrado ... </p> </span>
          ):(
            filterOptions().map( ( option, index ) => (
              <div 
                className = 
                  {`flex px-2 py-2 ${ index !== 0 && 'border-t' } ${ index === indexHover && 'bg-teal-700 text-white' }`}
                key={option.id}
                onMouseEnter={() => setIndexHover(index)}
                onClick={ () => selectOption( option ) }                
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
