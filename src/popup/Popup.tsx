import { Container, Select } from '@mantine/core';

const Popup = () => {
  document.body.style.width = '20rem';
  document.body.style.height = '20rem';

  return (
    <Container p="xl">
      <Select
        label="どのスタイルに変換しますか？"
        defaultValue="hiragana"
        data={[
          { value: 'hiragana', label: 'ひらがな' },
          { value: 'katakana', label: 'カタカナ' },
        ]}
      />
    </Container>
  );
};

export default Popup;
