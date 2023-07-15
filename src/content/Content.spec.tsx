import { render, screen } from '@testing-library/react';
import { Content } from './Content';

describe('Content', () => {
  it('renders the generated text', () => {
    const generatedText = 'Generated Text';
    const originalText = 'Original Text';
    const targetStyle = 'hiragana';
    render(
      <Content
        generatedText={generatedText}
        originalText={originalText}
        targetStyle={targetStyle}
      />
    );

    const generatedTextElement = screen.getByText(generatedText);
    expect(generatedTextElement).toBeInTheDocument();
  });
});
