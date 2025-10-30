import React, { useState } from 'react';
import { STORY_QUESTIONS } from '../constants';
import { Story } from '../types';

interface SubmissionFormProps {
  onSubmit: (story: Story) => void;
  onClose: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<string[]>(Array(STORY_QUESTIONS.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const story: Story = {
      name: name.trim() || 'Anonymous',
      location: 'From the community',
      profileImageUrl: `https://i.pravatar.cc/150?u=${Date.now()}`, // Unique placeholder avatar
      answers: STORY_QUESTIONS.map((question, index) => ({
        question: question.text,
        answer: answers[index].trim() || 'No answer provided.',
      })),
    };
    onSubmit(story);
  };
  
  const isSubmitDisabled = answers.every(answer => answer.trim() === '');

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-teal-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-teal-800">Share Your Journey</h2>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-2xl font-bold" aria-label="Close form">&times;</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold text-teal-700 text-lg mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Aisha, John"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          />
        </div>
        {STORY_QUESTIONS.map((question, index) => (
          <div key={question.id} className="mb-6">
            <label htmlFor={question.id} className="block font-semibold text-teal-700 text-lg mb-2">
              {question.text}
            </label>
            <textarea
              id={question.id}
              rows={4}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              aria-label={question.text}
            ></textarea>
          </div>
        ))}
        <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              Submit My Story
            </button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
