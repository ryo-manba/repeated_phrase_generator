import { useState } from 'react';
import { MdDone, MdOutlineContentCopy, MdVolumeUp } from 'react-icons/md';
import {
  ActionIcon,
  Avatar,
  Box,
  CopyButton,
  Divider,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

type ContentProps = {
  generatedText: string;
  originalText: string;
  targetStyle: string;
};

const Content = ({ generatedText, originalText, targetStyle }: ContentProps) => {
  const [opened, setOpened] = useState(true);
  const [diaglog, setDialog] = useState<HTMLDivElement | null>(null);

  //  外部クリックが行われた場合にダイアログを閉じるためのフックを使用する
  useClickOutside(() => setOpened(false), null, [diaglog]);

  const IconUrl = chrome.runtime.getURL('images/extension_128.png');

  if (!opened) return null;
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: 'white',
        textAlign: 'left',
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        maxWidth: 400,
        boxShadow: '0 0 10px rgba(0,0,0,.3);',
        zIndex: 2147483550,
      })}
      component="div"
      ref={setDialog}
    >
      <Flex pb="xs" gap="xs" justify="flex-start" align="center">
        <Avatar src={IconUrl} />
        <Text size="md">変換結果：</Text>
        <Select
          value={targetStyle}
          size="xs"
          data={[
            { value: 'hiragana', label: 'ひらがな' },
            { value: 'katakana', label: 'カタカナ' },
          ]}
        />
      </Flex>
      <Divider />
      <Stack pt="sm" spacing="xs" style={{ textAlign: 'left' }}>
        <Text size="sm">{generatedText}</Text>
        <Group position="right" spacing="xs">
          {/* 音声読み上げアイコンを表示する（未実装） */}
          <Tooltip label="音声読み上げ" withArrow>
            <ActionIcon>
              <MdVolumeUp />
            </ActionIcon>
          </Tooltip>
          {/* テキストをコピーするボタンを表示する */}
          <CopyButton value={generatedText}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'コピーしました' : 'クリップボードにコピー'} withArrow>
                <ActionIcon onClick={copy}>
                  {copied ? <MdDone /> : <MdOutlineContentCopy />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Stack>
    </Box>
  );
};

export default Content;
