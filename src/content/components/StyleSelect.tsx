import { Select } from '@mantine/core';

type StyleSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export const StyleSelect = ({ value, onChange }: StyleSelectProps) => (
  <Select
    aria-label="Style Select"
    value={value}
    onChange={onChange}
    size="xs"
    data={[
      { value: 'hiragana', label: 'ひらがな' },
      { value: 'katakana', label: 'カタカナ' },
    ]}
  />
);
