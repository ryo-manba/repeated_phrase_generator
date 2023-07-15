import { render, screen } from '@testing-library/react';
// import store from '../app/store';
import Content from './Content';

describe('content', () => {
  test('renders content example', () => {
    // TODO: 変更する
    render(<Content generatedText="" originalText="" targetStyle="" />);
    // expect(screen.getByText('Content Counter')).toBeInTheDocument();
  });
});
