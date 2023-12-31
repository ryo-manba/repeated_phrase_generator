import { generateRepeatedPhrase } from '../app/generator';
import type { ConvertType } from '../app/generator';
import { getStyleConfigBucket } from '../app/storage';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'generation',
    title: '選択したテキストを変換',
    contexts: ['selection'],
  });
});

// テキストを生成し、生成されたテキストをコンテンツスクリプトにメッセージとして送信
const generateAndSendMessage = async (selectedText: string, targetTabId: number) => {
  const bucket = getStyleConfigBucket();
  const value = await bucket.get();
  const userTargetStyle = value.targetStyle ?? 'hiragana';
  const generatedText = await generateRepeatedPhrase(selectedText, userTargetStyle as ConvertType);

  try {
    // コンテンツスクリプトにメッセージを送信する
    const res = await chrome.tabs.sendMessage(targetTabId, {
      type: 'SHOW',
      data: {
        style: userTargetStyle,
        generatedText: generatedText,
        originalText: selectedText,
      },
    });
    if (res != undefined) {
      console.error('error', res);
    }
  } catch (error) {
    console.error('error', error);
  }
};

// コンテキストメニューがクリックされたときのイベントリスナー
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab === undefined) {
    return;
  }
  if (info.menuItemId === 'generation') {
    const selectedText = info.selectionText ?? '';
    await generateAndSendMessage(selectedText, tab.id as number);
  }
});

// コンテンツスクリプトからのメッセージを受け取る
chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type !== 'GENERATE') {
    return;
  }
  const selectedText = message.data.selectionText ?? '';
  if (sender.tab?.id) {
    await generateAndSendMessage(selectedText, sender.tab?.id);
  }
});

export {};
