import { createRoot } from 'react-dom/client';
import Content from './Content';
import type { ContentProps } from './Content';

const Main = ({ generatedText, originalText, targetStyle }: ContentProps) => {
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
          left: '10px',
          top: '10px',
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

// メッセージを受信した場合にダイアログを表示する
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'SHOW') {
    if (document.getElementsByTagName('my-extension-root').length > 0) {
      document.getElementsByTagName('my-extension-root')[0].remove();
    }
    const container = document.createElement('my-extension-root');
    document.body.after(container);
    if ('data' in message && message.data) {
      createRoot(container).render(
        <Main
          generatedText={message.data.generatedText?.toString() ?? 'aaa'}
          originalText={message.data.originalText?.toString() ?? 'bbb'}
          targetStyle={message.data.style?.toString() ?? 'ccc'}
        />
      );
    }
  }
});
