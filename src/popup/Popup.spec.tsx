import { render, screen } from '@testing-library/react';
import Popup from './Popup';

// TODO: 適切なテストを追加する
it('should load and display Popup', async () => {
  render(<Popup />);

  // expect(screen.getByText('Popup Counter')).toBeInTheDocument();
});
