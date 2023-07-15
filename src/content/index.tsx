import { createRoot } from 'react-dom/client';
import { Content } from './Content';
import { ActionIcon, Image, Tooltip } from '@mantine/core';

type Props = {
  orect: DOMRect;
  generatedText: string;
  originalText: string;
  targetStyle: string;
};

const Icon = ({ selectedText, orect }: { selectedText: string; orect: DOMRect }) => {
  // アイコンをクリックしたらアイコンの要素を削除し、メッセージをサービスワーカーに向けて送信する
  const handleClick = async () => {
    const existingElements = Array.from(document.getElementsByTagName('my-extension-root-icon'));
    for (const element of existingElements) {
      element.remove();
    }
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
      {/* スクロール量を取得しているためダイアログが選択範囲に追従する */}
      <div
        style={{
          position: 'absolute',
          left: window.scrollX + orect.left,
          top: window.scrollY + orect.bottom + 10,
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

const Main = ({ orect, generatedText, originalText, targetStyle }: Props) => {
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
          left: window.scrollX + orect.left,
          top: window.scrollY + orect.bottom + 10,
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

// 特定のタグを全て削除する関数
const removeExistingElements = (tagName: string) => {
  const existingElements = Array.from(document.getElementsByTagName(tagName));
  for (const element of existingElements) {
    element.remove();
  }
};

// "onMessage"リスナーを設定する。
// 他のパーツ（バックグラウンドスクリプトなど）からのメッセージを待ち受ける
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type !== 'SHOW') {
    return;
  }

  // 現在の選択範囲を取得する
  const selection = window.getSelection();

  // 選択範囲が存在しない、または空の場合は処理しない
  if (selection == null || selection.toString().length === 0) {
    return;
  }

  // 選択範囲の位置と大きさを取得する
  const oRange = selection.getRangeAt(0);
  const oRect = oRange.getBoundingClientRect();
  if (selection.toString().length === 0) {
    return;
  }

  // 既に拡張機能の要素がページに存在する場合は削除する
  removeExistingElements('my-extension-root');

  const container = document.createElement('my-extension-root');
  document.body.after(container);

  if ('data' in message && message.data) {
    createRoot(container).render(
      <Main
        orect={oRect}
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

  // 何も選択されていないか、空文字列の場合は何もしない
  if (selection == null || selection.toString().length === 0) {
    return;
  }
  // すでに'my-extension-root-icon' タグが存在する場合は何もしない
  if (document.getElementsByTagName('my-extension-root-icon').length > 0) {
    return;
  }

  // 選択範囲の位置と大きさを取得する
  const oRange = selection.getRangeAt(0);
  const oRect = oRange.getBoundingClientRect();

  removeExistingElements('my-extension-root');

  const container = document.createElement('my-extension-root-icon');
  document.body.after(container);

  const selectedText = selection.toString();
  createRoot(container).render(<Icon selectedText={selectedText} orect={oRect} />);
});
