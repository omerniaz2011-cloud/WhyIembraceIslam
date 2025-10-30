import React, { useState, useMemo } from 'react';
import { Story } from '../types';
import QuestionAnswer from './QuestionAnswer';

interface StoryCardProps {
  story: Story;
  isUserStory?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isUserStory = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const initialLikes = useMemo(() => Math.floor(Math.random() * (150 - 15 + 1)) + 15, []);
  const [likeCount, setLikeCount] = useState(initialLikes);


  const getStoryText = () => {
    return `Name: ${story.name}
Location: ${story.location}

---

${story.answers.map(qa => `Q: ${qa.question}\n\nA: ${qa.answer}`).join('\n\n---\n\n')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getStoryText()).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy story to clipboard:', err);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Journey to Islam: ${story.name}'s Story`,
          text: getStoryText(),
          url: window.location.href, // Optional: share the URL of the app
        });
      } catch (error) {
        console.error('Error sharing the story:', error);
      }
    }
  };
  
  const handleLike = () => {
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };


  return (
    <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full ${isUserStory ? 'border-2 border-teal-500' : ''}`}>
      {isUserStory && (
        <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg z-10">
          YOUR STORY
        </div>
      )}
      <div className="p-8 flex-grow">
        <div className="flex items-center mb-6">
          <img
            className="h-20 w-20 rounded-full object-cover mr-6 border-4 border-teal-100"
            src={story.profileImageUrl}
            alt={`Portrait of ${story.name}`}
          />
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{story.name}</h3>
            <p className="text-slate-500">{story.location}</p>
          </div>
        </div>
        <div className="space-y-4">
          {story.answers.map((qa, index) => (
            <QuestionAnswer key={index} question={qa.question} answer={qa.answer} />
          ))}
        </div>
      </div>
       <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end items-center gap-2">
        <button
          onClick={handleLike}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLiked ? 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-400' : 'text-slate-700 bg-slate-200 hover:bg-slate-300 focus:ring-slate-400'}`}
          aria-pressed={isLiked}
          aria-label="Like story"
        >
          {isLiked ? (
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
          {likeCount}
        </button>
        {navigator.share && (
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              aria-label="Share story"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 4.186m0-4.186c.18.32.32.656.4.998m-10.887 4.542c.18.32.32.656.4.998m10.087-5.54c.18.32.32.656.4.998m-10.887 4.542a2.25 2.25 0 100 4.186m0-4.186c.18.32.32.656.4.998m0 0a2.25 2.25 0 104.186 0m0 0c-.18-.32-.32-.656-.4-.998m-4.186 0a2.25 2.25 0 100-4.186m0 4.186c.18-.32.32-.656.4-.998" />
              </svg>
              Share
            </button>
        )}
        <button
          onClick={handleCopy}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors duration-300 ${isCopied ? 'bg-green-500 hover:bg-green-600' : 'bg-teal-600 hover:bg-teal-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
          aria-label="Copy story to clipboard"
        >
          {isCopied ? (
            <>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Story
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StoryCard;