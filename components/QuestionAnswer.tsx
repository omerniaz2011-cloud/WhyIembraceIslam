
import React from 'react';

interface QuestionAnswerProps {
  question: string;
  answer: string;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ question, answer }) => {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="font-semibold text-teal-700 text-lg mb-2">{question}</h4>
      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{answer}</p>
    </div>
  );
};

export default QuestionAnswer;
