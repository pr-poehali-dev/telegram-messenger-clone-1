import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker = ({ onSelect, onClose }: EmojiPickerProps) => {
  const [search, setSearch] = useState('');

  const emojiCategories = {
    'Смайлики': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳'],
    'Жесты': ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝'],
    'Сердца': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
    'Символы': ['⭐', '✨', '🌟', '💫', '🔥', '💥', '💯', '✅', '❌', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⚡', '🌈', '☀️', '🌙', '⭐'],
    'Еда': ['🍕', '🍔', '🍟', '🌭', '🍿', '🧈', '🍖', '🍗', '🥩', '🥓', '🍞', '🥐', '🥖', '🥨', '🥯', '🧇', '🥞', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍩', '🍪', '☕', '🍺', '🍷', '🥂', '🍾'],
    'Животные': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋'],
  };

  const filteredEmojis = search
    ? Object.entries(emojiCategories).reduce((acc, [category, emojis]) => {
        const filtered = emojis;
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {} as Record<string, string[]>)
    : emojiCategories;

  return (
    <div className="absolute bottom-full left-0 mb-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск эмодзи..."
          className="flex-1 mr-2 h-9"
        />
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon name="X" size={18} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto p-3 space-y-4">
        {Object.entries(filteredEmojis).map(([category, emojis]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{category}</h3>
            <div className="grid grid-cols-8 gap-1">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelect(emoji);
                    onClose();
                  }}
                  className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
