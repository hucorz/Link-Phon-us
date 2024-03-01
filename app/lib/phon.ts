export interface Phoneme {
  ipa: string;
  type: 'short' | 'long' | 'diphthong' | 'consonants';
}

export const phoneticSymbols: Phoneme[] = [
  { ipa: 'ɪ', type: 'short' },
  { ipa: 'e', type: 'short' },
  { ipa: 'æ', type: 'short' },
  { ipa: 'ɒ', type: 'short' },
  { ipa: 'ʌ', type: 'short' },
  { ipa: 'ʊ', type: 'short' },
  { ipa: 'ə', type: 'short' },
  { ipa: 'i', type: 'short' },
  { ipa: 'u', type: 'short' },

  { ipa: 'iː', type: 'long' },
  { ipa: 'ɑː', type: 'long' },
  { ipa: 'ɔː', type: 'long' },
  { ipa: 'uː', type: 'long' },
  { ipa: 'ɜː', type: 'long' },

  { ipa: 'eɪ', type: 'diphthong' },
  { ipa: 'aɪ', type: 'diphthong' },
  { ipa: 'ɔɪ', type: 'diphthong' },
  { ipa: 'əʊ', type: 'diphthong' },
  { ipa: 'aʊ', type: 'diphthong' },
  { ipa: 'ɪə', type: 'diphthong' },
  { ipa: 'eə', type: 'diphthong' },
  { ipa: 'ʊə', type: 'diphthong' },
  { ipa: 'ɪə', type: 'diphthong' },
  { ipa: 'iə', type: 'diphthong' },

  { ipa: 'p', type: 'consonants' },
  { ipa: 'b', type: 'consonants' },
  { ipa: 't', type: 'consonants' },
  { ipa: 'd', type: 'consonants' },
  { ipa: 'k', type: 'consonants' },
  { ipa: 'ɡ', type: 'consonants' },
  { ipa: 'f', type: 'consonants' },
  { ipa: 'v', type: 'consonants' },
  { ipa: 'θ', type: 'consonants' },
  { ipa: 'ð', type: 'consonants' },
  { ipa: 's', type: 'consonants' },
  { ipa: 'z', type: 'consonants' },
  { ipa: 'ʃ', type: 'consonants' },
  { ipa: 'ʒ', type: 'consonants' },
  { ipa: 'h', type: 'consonants' },
  { ipa: 'x', type: 'consonants' },
  { ipa: 'tʃ', type: 'consonants' },
  { ipa: 'dʒ', type: 'consonants' },
  { ipa: 'm', type: 'consonants' },
  { ipa: 'n', type: 'consonants' },
  { ipa: 'ŋ', type: 'consonants' },
  { ipa: 'w', type: 'consonants' },
  { ipa: 'l', type: 'consonants' },
  { ipa: 'r', type: 'consonants' },
  { ipa: 'j', type: 'consonants' },
];

export const splitPhoneme = (wordPhon: string): Phoneme[] => {
  // 如果存在 开头结尾的 ‘/’ 则去掉
  wordPhon = wordPhon.trim();
  if (wordPhon[0] === '/') {
    wordPhon = wordPhon.slice(1);
  }
  if (wordPhon[wordPhon.length - 1] === '/') {
    wordPhon = wordPhon.slice(0, wordPhon.length - 1);
  }
  console.log('wordPhon:', wordPhon);
  const syllables: Phoneme[] = [];
  let i = 0;
  // 先看开头两个字符是否存在于phoneticSymbols中，再看开头一个字符是否存在于phoneticSymbols中，否则返回错误
  while (i < wordPhon.length) {
    if (wordPhon[i] === 'ˈ' || wordPhon[i] === 'ˌ') {
      i += 1;
      continue;
    }
    if (i + 1 < wordPhon.length) {
      const phoneme = phoneticSymbols.find(
        (p) => p.ipa === wordPhon.slice(i, i + 2),
      );
      if (phoneme) {
        syllables.push({ ipa: phoneme.ipa, type: phoneme.type });
        i += 2;
        continue;
      }
    }
    const phoneme = phoneticSymbols.find((p) => p.ipa === wordPhon[i]);
    if (phoneme) {
      syllables.push({ ipa: phoneme.ipa, type: phoneme.type });
      i += 1;
    } else {
      console.error('phoneme not found:', wordPhon[i]);
      break;
    }
  }

  return syllables;
};

// const syllables = splitPhoneme('θæŋk');
