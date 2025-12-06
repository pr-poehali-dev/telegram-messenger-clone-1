import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
  selectedChatId?: number;
  onCreateGroup?: () => void;
  onOpenProfile?: () => void;
}

const ChatList = ({ onSelectChat, selectedChatId, onCreateGroup, onOpenProfile }: ChatListProps) => {
  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Анна Смирнова',
      avatar: '👩‍💼',
      lastMessage: 'Отлично, договорились!',
      time: '12:34',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Команда проекта',
      avatar: '👥',
      lastMessage: 'Дмитрий: Презентация готова',
      time: '11:20',
      unread: 5,
      online: false,
    },
    {
      id: 3,
      name: 'Макс Иванов',
      avatar: '👨‍💻',
      lastMessage: 'Жду твой звонок',
      time: '10:15',
      unread: 0,
      online: true,
      typing: true,
    },
    {
      id: 4,
      name: 'Мария Петрова',
      avatar: '👩‍🎨',
      lastMessage: 'Дизайн макеты отправила',
      time: 'Вчера',
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: 'Саша Козлов',
      avatar: '🧑‍🔬',
      lastMessage: 'Спасибо за помощь!',
      time: 'Вчера',
      unread: 0,
      online: true,
    },
  ]);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl hover:scale-105 transition-transform"
          >
            👨‍💼
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Чаты
          </h1>
          <button 
            onClick={onCreateGroup}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="Edit" size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-all border-l-4 ${
              selectedChatId === chat.id
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-l-purple-500'
                : 'border-l-transparent'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400">
                    {chat.avatar}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${chat.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {chat.typing ? (
                      <span className="text-purple-600 italic flex items-center gap-1">
                        <span>печатает</span>
                        <span className="flex gap-0.5">
                          <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </span>
                      </span>
                    ) : (
                      chat.lastMessage
                    )}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;