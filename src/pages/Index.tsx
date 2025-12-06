import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';

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

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-96 flex-shrink-0">
        <ChatList onSelectChat={setSelectedChat} selectedChatId={selectedChat?.id} />
      </div>

      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <div className="text-center animate-fade-in">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-2xl">
                <span className="text-6xl">💬</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Выберите чат
              </h2>
              <p className="text-gray-500">Начните общение с друзьями</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;