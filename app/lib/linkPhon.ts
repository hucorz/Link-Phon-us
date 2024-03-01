import { Phoneme, phoneticSymbols } from './phon';

export const ifLinkPhon = (p1: Phoneme[], p2: Phoneme[]) => {
    if (p1.length === 0 || p2.length === 0) {
        return false;
    }
    const lastP1 = p1[p1.length - 1];
    const firstP2 = p2[0];
    // 如果 p1 以辅音结尾，p2 以元音开头，返回 true
    if (lastP1.type === 'consonants' && firstP2.type !== 'consonants') {
        return true;
    }
    return false;
}