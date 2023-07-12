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
import { generateRepeatedPhrase } from '../app/generate';
import type { ConvertType } from '../app/generate';
import { getBucket } from '@extend-chrome/storage';

interface MyBucket {
  targetStyle: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

type ContentProps = {
  generatedText: string;
  originalText: string;
  targetStyle: string;
};

const Content = ({ generatedText, originalText, targetStyle }: ContentProps) => {
  const [opened, setOpened] = useState(true);
  const [diaglog, setDialog] = useState<HTMLDivElement | null>(null);
  const [text, setText] = useState(generatedText);
  const [style, setStyle] = useState(targetStyle);

  //  外部クリックが行われた場合にダイアログを閉じるためのフックを使用する
  useClickOutside(() => setOpened(false), null, [diaglog]);

  // TODO: iconを作成する
  const IconUrl = chrome.runtime.getURL('images/extension_128.png');

  const handleChange = async (value: string) => {
    bucket.set({ targetStyle: value });
    const newText = await generateRepeatedPhrase(originalText, value as ConvertType);
    setText(newText);
    setStyle(value);
  };

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
          value={style}
          onChange={(value: string) => handleChange(value)}
          size="xs"
          data={[
            { value: 'hiragana', label: 'ひらがな' },
            { value: 'katakana', label: 'カタカナ' },
          ]}
        />
      </Flex>
      <Divider />
      <Stack pt="sm" spacing="xs" style={{ textAlign: 'left' }}>
        <Text size="sm">{text}</Text>
        <Group position="right" spacing="xs">
          {/* 音声読み上げアイコンを表示する（未実装） */}
          <Tooltip label="音声読み上げ" withArrow>
            <ActionIcon>
              <MdVolumeUp />
            </ActionIcon>
          </Tooltip>
          {/* テキストをコピーするボタンを表示する */}
          <CopyButton value={text}>
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
