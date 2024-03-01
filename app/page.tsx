'use client';

import { NextUIProvider, Input, Card, CardBody } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { lookupPhonUS } from './lib/dictionary';
import { Phoneme, splitPhoneme } from './lib/phon';
import { ifLinkPhon } from './lib/linkPhon';
import { Span } from 'next/dist/trace';

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  let wordPhons: Phoneme[][] = [];
  const [showPhon, setShowPhon] = useState<JSX.Element[]>([]);
  const [showWord, setShowWord] = useState<JSX.Element[]>([]);

  const getPhonString = (phon: Phoneme[]) => {
    let str = '';
    for (let p of phon) {
      str += p.ipa;
    }
    return str;
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputRef.current) {
        wordPhons = [];
        setShowPhon([]);
        setShowWord([]);

        const sentence = inputRef.current.value;
        const words = sentence.trim().split(' ');
        for (let word of words) {
          const phon = await lookupPhonUS(word);
          wordPhons.push(splitPhoneme(phon));
        }

        let isLink: boolean[] = [];
        let sp: JSX.Element[] = [];
        let sw: JSX.Element[] = [];

        for (let i = 0; i < wordPhons.length - 1; i++) {
          isLink.push(ifLinkPhon(wordPhons[i], wordPhons[i + 1]));
        }
        isLink.push(false);

        // set showWord
        for (let i = 0; i < words.length; i++) {
          if (words[i].length === 1) {
            sw.push(
              <span
                className={
                  (i > 0 && (isLink[i - 1] || isLink[i])) ||
                  (i === 0 && isLink[i])
                    ? 'underline'
                    : ''
                }
                key={sw.length}
              >
                {words[i]}
              </span>,
            );
          } else {
            sw.push(
              <span
                className={i > 0 && isLink[i - 1] ? 'underline' : ''}
                key={sw.length}
              >
                {words[i][0]}
              </span>,
            );
            sw.push(<span key={sw.length}>{words[i].slice(1, -1)}</span>);
            sw.push(
              <span className={isLink[i] ? 'underline' : ''} key={sw.length}>
                {words[i][words[i].length - 1]}
              </span>,
            );
            sw.push(
              <span
                className={i < words.length - 1 && isLink[i] ? 'underline' : ''}
                key={sw.length}
              >
                {' '}
              </span>,
            );
          }
        }
        setShowWord(sw);

        // set showPhon
        for (let i = 0; i < words.length; i++) {
          if (wordPhons[i].length === 1) {
            sp.push(
              <span
                className={
                  (i > 0 && (isLink[i - 1] || isLink[i])) ||
                  (i === 0 && isLink[i])
                    ? 'underline'
                    : ''
                }
                key={sp.length}
              >
                {getPhonString(wordPhons[i])}
              </span>,
            );
          } else {
            sp.push(
              <span
                className={i > 0 && isLink[i - 1] ? 'underline' : ''}
                key={sp.length}
              >
                {getPhonString(wordPhons[i].slice(0, 1))}
              </span>,
            );
            sp.push(
              <span key={sp.length}>
                {getPhonString(wordPhons[i].slice(1, -1))}
              </span>,
            );
            sp.push(
              <span className={isLink[i] ? 'underline' : ''} key={sp.length}>
                {getPhonString(wordPhons[i].slice(-1))}
              </span>,
            );
            if (i < words.length - 1) {
              sp.push(
                <span className="underline" key={sp.length}>
                  {' '}
                </span>,
              );
            }
          }
        }
        setShowPhon(sp);
      }
    }
  };
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
          <Input
            type="text"
            label="Sentence"
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mt-10">
          <Card>
            <CardBody>
              <p>{showPhon}</p>
            </CardBody>
          </Card>
        </div>
        <div className="mt-10">
          <Card>
            <CardBody>
              <p>{showWord}</p>
            </CardBody>
          </Card>
        </div>
      </main>
    </NextUIProvider>
  );
};

export default Page;
