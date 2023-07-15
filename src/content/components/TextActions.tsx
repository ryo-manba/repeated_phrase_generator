import { Group, Tooltip, ActionIcon } from '@mantine/core';
import { MdDone, MdOutlineContentCopy, MdVolumeUp } from 'react-icons/md';
import { CopyButton } from '@mantine/core';

type TextActionsProps = {
  text: string;
};

export const TextActions = ({ text }: TextActionsProps) => (
  <Group position="right" spacing="xs">
    <Tooltip label="音声読み上げ" withArrow>
      <ActionIcon>
        <MdVolumeUp />
      </ActionIcon>
    </Tooltip>
    <CopyButton value={text}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'コピーしました' : 'クリップボードにコピー'} withArrow>
          <ActionIcon onClick={copy}>{copied ? <MdDone /> : <MdOutlineContentCopy />}</ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  </Group>
);
