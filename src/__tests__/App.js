import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from '../App';

test('<App />', () => {
  render(
    <App />
  );

  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
