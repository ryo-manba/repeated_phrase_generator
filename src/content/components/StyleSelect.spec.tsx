import { render, screen } from '@testing-library/react';
import { StyleSelect } from './StyleSelect';

describe('StyleSelect', () => {
  it('renders the select component with options', () => {
    const value = 'hiragana';
    const onChange = jest.fn();
    render(<StyleSelect value={value} onChange={onChange} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ひらがな')).toBeInTheDocument();
  });
});
