import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <a
      href={videoUrl}
      className="block bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
      aria-label={`Watch video: ${video.title}`}
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnailUrl}
          alt={`Thumbnail for ${video.title}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault fails to load
            const target = e.target as HTMLImageElement;
            if (target.src.includes('maxresdefault.jpg')) {
              target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
            }
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
          <svg className="w-16 h-16 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-slate-800 text-lg truncate" title={video.title}>
          {video.title}
        </h3>
      </div>
    </a>
  );
};

export default VideoCard;
