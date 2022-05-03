import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { SelectAddable } from '../components/SelectAddable'


test('<SelectAddable /> [Reposo] Indica que podemos escribir en él', async () => {

  render(<SelectAddable />);

  const listBox = screen.findAllByTestId('list-box')

  //console.log(await listBox)
  expect( await listBox ).toHaveLength(1)


  //expect( screen.getByTestId('input').placeholder ).toBe('Selecciona una Opcion');
});
