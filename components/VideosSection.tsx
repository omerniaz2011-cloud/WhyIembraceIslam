import React from 'react';
import { RECOMMENDED_VIDEOS } from '../constants';
import VideoCard from './VideoCard';
import { Video } from '../types';

const VideosSection: React.FC = () => {
  if (RECOMMENDED_VIDEOS.length === 0) {
    return null;
  }
  
  return (
    <section id="videos-section" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-8">
        Watch Their Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {RECOMMENDED_VIDEOS.map((video: Video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default VideosSection;