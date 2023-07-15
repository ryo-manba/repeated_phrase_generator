import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextActions } from './TextActions';

describe('TextActions', () => {
  it('renders the text actions with icons', () => {
    const text = 'Sample Text';
    render(<TextActions text={text} />);

    const volumeIcon = screen.getByLabelText('Volume Icon');
    const copyIcon = screen.getByLabelText('Copy Icon');

    expect(volumeIcon).toBeInTheDocument();
    expect(copyIcon).toBeInTheDocument();
  });

  it('displays the tooltip when the icon is focused', async () => {
    const text = 'Sample Text';
    render(<TextActions text={text} />);

    const volumeIcon = screen.getByLabelText('Volume Icon');
    await userEvent.hover(volumeIcon);
    expect(screen.getByText('音声読み上げ')).toBeInTheDocument();

    const copyIcon = screen.getByLabelText('Copy Icon');
    await userEvent.hover(copyIcon);
    expect(screen.getByText('クリップボードにコピー')).toBeInTheDocument();
  });

  it('calls the copy function when the copy icon is clicked', async () => {
    const text = 'Sample Text';
    render(<TextActions text={text} />);

    const copyIcon = screen.getByLabelText('Copy Icon');
    await userEvent.hover(copyIcon);
    expect(screen.getByText('クリップボードにコピー')).toBeInTheDocument();

    const copyFunction = jest.fn();

    copyIcon.onclick = copyFunction;
    await userEvent.click(copyIcon);
    expect(copyFunction).toHaveBeenCalled();
  });
});
