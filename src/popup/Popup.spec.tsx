import { render, screen } from '@testing-library/react';

import Popup from './Popup';

jest.mock('../app/storage', () => ({
  getStyleConfigBucket: () => ({
    get: jest.fn().mockResolvedValue({ targetStyle: 'hiragana' }),
    set: jest.fn(),
  }),
}));

describe('Popup', () => {
  it('renders Popup component with Select', async () => {
    render(<Popup />);

    expect(screen.getByText('どのスタイルに変換しますか？')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('has hiragana as the default selected style', async () => {
    render(<Popup />);

    expect(screen.getByDisplayValue('ひらがな')).toBeInTheDocument();
  });
});
