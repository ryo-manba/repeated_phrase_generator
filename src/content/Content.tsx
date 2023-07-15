import { useState } from 'react';
import { Avatar, Box, Divider, Flex, Stack, Text } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { generateRepeatedPhrase } from '../app/generator';
import type { ConvertType } from '../app/generator';
import { StyleSelect } from './components/StyleSelect';
import { TextActions } from './components/TextActions';
import { getStyleConfigBucket } from '../app/storage';

type ContentProps = {
  generatedText: string;
  originalText: string;
  targetStyle: string;
};

export const Content = ({ generatedText, originalText, targetStyle }: ContentProps) => {
  const bucket = getStyleConfigBucket();
  const [opened, setOpened] = useState(true);
  const [diaglog, setDialog] = useState<HTMLDivElement | null>(null);
  const [text, setText] = useState(generatedText);
  const [style, setStyle] = useState(targetStyle);

  //  外部クリックが行われた場合にダイアログを閉じるためのフックを使用する
  useClickOutside(() => setOpened(false), null, [diaglog]);

  const iconUrl = chrome.runtime.getURL('images/extension_128.png');

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
        <Avatar src={iconUrl} />
        <Text size="md">変換結果：</Text>
        <StyleSelect value={style} onChange={handleChange} />
      </Flex>
      <Divider />
      <Stack pt="sm" spacing="xs" style={{ textAlign: 'left' }}>
        <Text size="sm">{text}</Text>
        <TextActions text={text} />
      </Stack>
    </Box>
  );
};
