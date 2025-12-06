import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  user: string;
  avatar: string;
  image: string;
  viewed: boolean;
}

interface StatusStoriesProps {
  onStoryClick: (story: Story) => void;
}

const StatusStories = ({ onStoryClick }: StatusStoriesProps) => {
  const [stories] = useState<Story[]>([
    { id: 1, user: 'Мой статус', avatar: '👨‍💼', image: '', viewed: false },
    { id: 2, user: 'Анна', avatar: '👩‍💼', image: '', viewed: false },
    { id: 3, user: 'Макс', avatar: '👨‍💻', image: '', viewed: false },
    { id: 4, user: 'Мария', avatar: '👩‍🎨', image: '', viewed: true },
    { id: 5, user: 'Саша', avatar: '🧑‍🔬', image: '', viewed: true },
  ]);

  return (
    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => onStoryClick(story)}
            className="flex-shrink-0 flex flex-col items-center gap-1 group"
          >
            <div
              className={`relative p-1 rounded-full ${
                story.viewed
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : 'bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500'
              }`}
            >
              <Avatar className="w-14 h-14 border-2 border-white dark:border-gray-900">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400">
                  {story.avatar}
                </AvatarFallback>
              </Avatar>
              {index === 0 && (
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  <Icon name="Plus" size={12} className="text-white" />
                </div>
              )}
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[60px]">
              {story.user}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusStories;
