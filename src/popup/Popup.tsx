import { useEffect, useState } from 'react';
import { Container, Select } from '@mantine/core';
import { getBucket } from '@extend-chrome/storage';

interface MyBucket {
  targetStyle: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

const Popup = () => {
  document.body.style.width = '20rem';
  document.body.style.height = '20rem';

  const [style, setStyle] = useState('hiragana');

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.targetStyle) {
        setStyle(value.targetStyle);
      }
    })();
  }, []);

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
