import { render, screen } from '@testing-library/react';
import { InputBox } from '../components/InputBox'

test('renders learn react link', () => {
  render(<InputBox />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
