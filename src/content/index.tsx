import { createRoot } from 'react-dom/client';
import { Content } from './Content';
import { ActionIcon, Image, Tooltip } from '@mantine/core';

type IconProps = {
  selectedText: string;
  rect: DOMRect;
};

const Icon = ({ selectedText, rect }: IconProps) => {
  // アイコンをクリックしたらアイコンの要素を削除し、メッセージをサービスワーカーに向けて送信する
  const handleClick = async () => {
    removeExistingElements('repeated-phrase-generator-icon');
    chrome.runtime.sendMessage({
      type: 'GENERATE',
      data: {
        selectionText: selectedText,
      },
    });
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        left: '0px',
        top: '0px',
        zIndex: 2147483550,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: window.scrollX + rect.left,
          top: window.scrollY + rect.bottom + 10,
          zIndex: 2147483550,
        }}
      >
        <Tooltip label="選択したテキストを変換" withArrow>
          <ActionIcon
            radius="xl"
            variant="default"
            size="lg"
            sx={{
              boxShadow: '0 0 10px rgba(0,0,0,.3);',
              zIndex: 2147483550,
            }}
            onClick={handleClick}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                zIndex: 2147483550,
              }}
            >
              <Image src={chrome.runtime.getURL('images/extension_128.png')} />
            </div>
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
};

type Props = {
  rect: DOMRect;
  generatedText: string;
  originalText: string;
  targetStyle: string;
};

const Main = ({ rect, generatedText, originalText, targetStyle }: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        left: '0px',
        top: '0px',
        zIndex: 2147483550,
      }}
    >
      {/* スクロール量を取得しているためダイアログが選択範囲に追従する */}
      <div
        style={{
          position: 'absolute',
          left: window.scrollX + rect.left,
          top: window.scrollY + rect.bottom + 10,
          zIndex: 2147483550,
        }}
      >
        <Content
          generatedText={generatedText}
          originalText={originalText}
          targetStyle={targetStyle}
        />
      </div>
    </div>
  );
};

// "onMessage"リスナーを設定する。
// 他のパーツ（バックグラウンドスクリプトなど）からのメッセージを待ち受ける
chrome.runtime.onMessage.addListener(function (message) {
  if (message.type !== 'SHOW') {
    return;
  }

  // 選択範囲を取得する
  const selection = window.getSelection();
  if (selection == null || selection.toString().length === 0) {
    return;
  }

  // 選択範囲の位置と大きさを取得する
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // 既に拡張機能の要素がページに存在する場合は削除する
  removeExistingElements('repeated-phrase-generator');

  const container = document.createElement('repeated-phrase-generator');
  document.body.after(container);

  if ('data' in message && message.data) {
    createRoot(container).render(
      <Main
        rect={rect}
        generatedText={message.data.generatedText?.toString() ?? ''}
        originalText={message.data.originalText?.toString() ?? ''}
        targetStyle={message.data.style?.toString() ?? ''}
      />
    );
  }
});

// ユーザーがテキストを選択したときのイベントを監視する
document.addEventListener('mouseup', () => {
  const selection = window.getSelection();

  if (selection == null || selection.toString().length === 0) {
    // 選択範囲が存在しないか空の場合はアイコンを表示から削除する
    removeExistingElements('repeated-phrase-generator-icon');
    return;
  }
  if (document.getElementsByTagName('repeated-phrase-generator-icon').length > 0) {
    return;
  }

  // 選択範囲の位置と大きさを取得する
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const container = document.createElement('repeated-phrase-generator-icon');
  document.body.after(container);

  const selectedText = selection.toString();

  createRoot(container).render(<Icon selectedText={selectedText} rect={rect} />);
});

// 特定のタグを持つ要素を全ての要素を削除する
const removeExistingElements = (tagName: string) => {
  const existingElements = Array.from(document.getElementsByTagName(tagName));
  for (const element of existingElements) {
    element.remove();
  }
};
