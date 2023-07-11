// import 'webextension-polyfill';
// import 'construct-style-sheets-polyfill';
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

const container = document.createElement('my-extension-root');
document.body.after(container);
createRoot(container).render(
  // ダイアログのサンプル表示
  <Main
    generatedText={'ここに翻訳したテキストが入る'}
    originalText={'ここに翻訳前のテキストが入る'}
    targetStyle={'hiragana'}
  />
);
