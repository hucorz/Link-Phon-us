'use server';

import * as cheerio from 'cheerio';
import path from 'path';
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

const Mdict = require('js-mdict');

let dictPath;
if (process.env.NODE_ENV === 'production') {
  const dictFilename = 'OxfordAdvancedDictionary(10thEdition)V3.mdx';
  dictPath = path.join(serverRuntimeConfig.PROJECT_ROOT, dictFilename);
} else {
  const dictFilename = 'OxfordAdvancedDictionary(10thEdition)V3.mdx';
  dictPath = path.join(process.cwd(), 'public', dictFilename);
}

// console.log('dictPath:', dictPath);
const mdict = new Mdict.default(dictPath);

export const lookupPhonUS = async (word) => {
  word = word.trim().toLowerCase();
  const htmlString = await mdict.lookup(word).definition;
  // 写入文件
  // const fs = require('fs');
  // fs.writeFileSync('phon-us.html', htmlString);
  const $ = cheerio.load(htmlString);
  // 找到第一个 class="pracpron" 的元素的第一个子元素, 再找到第一个 (class="phon-us" 或 class="phon-usgb") 的元素
  const phonUsElement = $('.top-container:first')
    .find('.phons_n_am:first')
    .find('.phon:first');
  if (phonUsElement.length > 0) {
    return phonUsElement.text();
  } else {
    return '找不到美式音标';
  }
};
