import React, { useState, useEffect } from "react";

const QuotesMolecule = () => {
  const [quote, setQuote] = useState("");

  const marriageQuotes = [
    '"결혼 전에는 눈을 크게 뜨고,\n결혼 후에는 반쯤 감아라."\n -토머스 폴러-',
    '"결혼은 두 사람이 한 개의 TV \n리모컨을 공유하는 것과 같다."\n -하성민-',
    '"백 명 중 \n두 명에게는 멋진 일이다." \n -필립 말로-',
    '"결혼이란, 영웅이 첫 장에서 죽는 로맨스와 같다"\n -이연호-',
  ];

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * marriageQuotes.length);
      return marriageQuotes[randomIndex];
    };

    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="m-8 p-4 rounded-lg text-center animate-fadeIn">
      <p className=" italic text-gray-700 whitespace-pre-line">{quote}</p>
    </div>
  );
};

export default QuotesMolecule;
