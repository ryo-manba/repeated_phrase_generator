import { useEffect, useState } from 'react';
import { Container, Select } from '@mantine/core';
import { getStyleConfigBucket } from '../app/storage';

const Popup = () => {
  document.body.style.width = '20rem';
  document.body.style.height = '15rem';
  const bucket = getStyleConfigBucket();

  const [style, setStyle] = useState('hiragana');

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.targetStyle) {
        setStyle(value.targetStyle);
      }
    })();
  }, [bucket]);

  const saveStyle = (style: string) => {
    bucket.set({ targetStyle: style });
    setStyle(style);
  };

  return (
    <Container p="xl">
      <Select
        label="どのスタイルに変換しますか？"
        value={style}
        onChange={(value: string) => saveStyle(value)}
        data={[
          { value: 'hiragana', label: 'ひらがな' },
          { value: 'katakana', label: 'カタカナ' },
        ]}
      />
    </Container>
  );
};

export default Popup;
