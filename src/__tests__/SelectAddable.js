import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { SelectAddable } from '../components/SelectAddable'

const filterOptions = jest.fn();

afterEach( cleanup );

test('[Reposo] Indica que podemos escribir en él', () => {
  render(<SelectAddable />);

  expect( screen.getByTestId('input').placeholder ).toBe('Selecciona una Opcion');

});

test('[Desplegado] Al hacer click despliega la lista con las categorías de gastos disponibles', ()=>{
  render(<SelectAddable />);

  //click in input list
  const inputList = screen.getByTestId('input');
  fireEvent.click(inputList);

  //then
  expect( screenget.getByTestId('listBox') )

});

test('[Escrito] Muestra la opción seleccionada o bien el texto escrito', ()=>{
  render(<SelectAddable />);
}) 
