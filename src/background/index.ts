import browser from 'webextension-polyfill';
import store, { initializeWrappedStore } from '../app/store';
import { getBucket } from '@extend-chrome/storage';
import { generateRepeatedPhrase } from '../app/generate';
import type { ConvertType } from '../app/generate';

initializeWrappedStore();

store.subscribe(() => {
  // access store state
  // const state = store.getState();
  // console.log('state', state);
});

// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL('welcome/welcome.html');
    await browser.tabs.create({ url });
  }
});

interface MyBucket {
  targetStyle: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'generation',
    title: '選択したテキストを変換',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'generation': {
        const selectedText = info.selectionText !== undefined ? info.selectionText : '';
        // 選択したスタイルを取得する
        const value = await bucket.get();
        const userTargetStyle = value.targetStyle ?? 'hiragana';
        const translatedText = generateRepeatedPhrase(selectedText, userTargetStyle as ConvertType);
        console.log(translatedText);
        break;
      }
    }
  }
});

export {};
