import React, { useState, useEffect, useMemo } from 'react';
import { Story } from './types';
import { generateStories } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import StoryCard from './components/StoryCard';
import SubmissionForm from './components/SubmissionForm';
import VideosSection from './components/VideosSection';
import { RECOMMENDED_VIDEOS } from './constants';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [userStory, setUserStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedStories = await generateStories();
        setStories(fetchedStories);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStorySubmit = (story: Story) => {
    setUserStory(story);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openForm = () => {
    setShowForm(true);
    setTimeout(() => {
        const form = document.getElementById('submission-form-container');
        form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  const scrollToVideos = () => {
    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Memoized filtering for generated stories
  const filteredStories = useMemo(() => {
    if (!searchQuery) {
      return stories;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return stories.filter(story => {
      const nameMatch = story.name.toLowerCase().includes(lowercasedQuery);
      const answerMatch = story.answers.some(a => 
        a.answer.toLowerCase().includes(lowercasedQuery)
      );
      return nameMatch || answerMatch;
    });
  }, [searchQuery, stories]);

  // Check if user story matches search query
  const userStoryMatchesSearch = useMemo(() => {
    if (!userStory) return false;
    if (!searchQuery) return true;
    const lowercasedQuery = searchQuery.toLowerCase();
    const nameMatch = userStory.name.toLowerCase().includes(lowercasedQuery);
    const answerMatch = userStory.answers.some(a => 
      a.answer.toLowerCase().includes(lowercasedQuery)
    );
    return nameMatch || answerMatch;
  }, [searchQuery, userStory]);


  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
        {!isLoading && !error && (
          <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {userStory && userStoryMatchesSearch && (
               <div className="mb-12">
                <StoryCard story={userStory} isUserStory />
              </div>
            )}
            
            <div className="text-center mb-12 flex flex-wrap justify-center items-center gap-4">
              {!showForm && (
                <button
                  onClick={openForm}
                  className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                >
                  Share Your Journey
                </button>
              )}
              {RECOMMENDED_VIDEOS.length > 0 && (
                <button
                    onClick={scrollToVideos}
                    className="bg-white text-teal-600 font-bold py-3 px-8 rounded-lg shadow-md border border-teal-600 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
                >
                    Watch Videos
                </button>
              )}
            </div>
            
            {showForm && (
              <div id="submission-form-container">
                <SubmissionForm onSubmit={handleStorySubmit} onClose={() => setShowForm(false)} />
              </div>
            )}
            
            {filteredStories.length === 0 && !userStoryMatchesSearch ? (
              <div className="text-center py-12 text-slate-500">
                <h3 className="text-2xl font-semibold">No stories found.</h3>
                <p className="mt-2">Try adjusting your search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map((story, index) => (
                  <StoryCard key={index} story={story} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      {!isLoading && !error && <VideosSection />}
      <Footer />
    </div>
  );
};

export default App;