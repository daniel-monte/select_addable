import React from 'react'

export const ListBox = ({ options, setOptions }) => {
  return (
    <div>
      {options.map(option =>
        <div key={option.id}> {option.name} </div>
      )}
    </div>
  )
}
