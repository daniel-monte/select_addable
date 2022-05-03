import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { SelectAddable } from '../components/SelectAddable';
import { categories } from '../__mocks__/categories';

beforeEach(()=>{
  const setOptions = jest.fn();
  const setSelected = jest.fn();
  const setNewOption = jest.fn();
  
  render(<SelectAddable 
    options = {categories}
    setOptions = {setOptions}
    setSelected = {setSelected}
    setNewOption = {setNewOption}
  />);
})

test('<SelectAddable /> Todo preparado', () => {

  expect( screen.getByTestId('input').placeholder ).toBe('Selecciona una Opcion');
  expect(screen.getByTestId('list-box').children.length).toEqual(categories.length)

});

test('<SelectAddable /> al escribir "ci", el listado de categorías puede mostrar "Estación de servicio", y "Farmacia"', () => {

  const input = screen.getByTestId('input');
  const listBox = screen.getByTestId('list-box')

  fireEvent.change(input, {target: {value: 'ci'}})
  
  expect(listBox).toHaveTextContent('Farmacia')
  expect(listBox).toHaveTextContent('Estación de servicio')
  
  expect(listBox).not.toHaveTextContent('Verduleria')
});

test('<SelectAddable /> Al ingresar un texto que no coincide con ninguna de las categorías mostradas y presionar "Enter", el texto ingresado aparecerá como una nueva categoría', () => {

  const input = screen.getByTestId('input');
  const listBox = screen.getByTestId('list-box')

  fireEvent.change(input, {target: {value: 'Salida'}})
  
  expect(listBox).not.toHaveTextContent('Farmacia')
  expect(listBox).not.toHaveTextContent('Estación de servicio')
  expect(listBox).not.toHaveTextContent('Verduleria')

  fireEvent.keyDown(input, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13
  });

  //expect(screen.getByTestId('list-box').children.length).toEqual(options.length+1)
  screen.debug()
});