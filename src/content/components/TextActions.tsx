import { Group, Tooltip, ActionIcon } from '@mantine/core';
import { MdDone, MdOutlineContentCopy, MdVolumeUp } from 'react-icons/md';
import { CopyButton } from '@mantine/core';

type TextActionsProps = {
  text: string;
};

const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    const uttr = new SpeechSynthesisUtterance();
    uttr.text = text;
    uttr.lang = 'ja-JP';
    uttr.rate = 1;
    uttr.pitch = 1;
    uttr.volume = 1;
    window.speechSynthesis.speak(uttr);
  }
};

export const TextActions = ({ text }: TextActionsProps) => (
  <Group position="right" spacing="xs">
    <Tooltip label="音声読み上げ" withArrow>
      <ActionIcon aria-label="Volume Icon" onClick={() => speakText(text)}>
        <MdVolumeUp />
      </ActionIcon>
    </Tooltip>
    <CopyButton value={text}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'コピーしました' : 'クリップボードにコピー'} withArrow>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              copy();
            }}
            aria-label="Copy Icon"
          >
            {copied ? <MdDone /> : <MdOutlineContentCopy />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  </Group>
);
