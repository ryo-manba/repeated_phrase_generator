import { toHiragana, toKatakana } from 'wanakana';

// 変換関数をここに入れる
export type ConvertType = 'hiragana' | 'katakana';

/**
 * 使用例
 * text: コミット
 * type: hiragana -> こみこみのコミット
 * type: katakana -> コミコミのコミット
 */
export const generateRepeatedPhrase = (text: string, type: ConvertType): string => {
  if (text.length < 2) return text;

  // TODO: 漢字の対応する
  let firstTwoChars = text.slice(0, 2);

  // typeに応じて、最初の文字を変換
  switch (type) {
    case 'hiragana':
      firstTwoChars = toHiragana(firstTwoChars);
      break;
    case 'katakana':
      firstTwoChars = toKatakana(firstTwoChars);
      break;
  }
  return `${firstTwoChars}${firstTwoChars}の${text}`;
};
