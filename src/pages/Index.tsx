import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import VideoCall from '@/components/VideoCall';
import UserProfile from '@/components/UserProfile';
import CreateGroup from '@/components/CreateGroup';

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

type View = 'chat' | 'videoCall' | 'profile' | 'createGroup';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [currentView, setCurrentView] = useState<View>('chat');

  const handleVideoCall = () => {
    setCurrentView('videoCall');
  };

  const handleEndCall = () => {
    setCurrentView('chat');
  };

  const handleOpenProfile = () => {
    setCurrentView('profile');
  };

  const handleCloseProfile = () => {
    setCurrentView('chat');
  };

  const handleCreateGroup = () => {
    setCurrentView('createGroup');
  };

  const handleCloseCreateGroup = () => {
    setCurrentView('chat');
  };

  const handleGroupCreated = (name: string, members: any[]) => {
    console.log('Группа создана:', name, members);
    setCurrentView('chat');
  };

  if (currentView === 'videoCall' && selectedChat) {
    return <VideoCall chat={selectedChat} onEndCall={handleEndCall} />;
  }

  if (currentView === 'profile') {
    return <UserProfile onClose={handleCloseProfile} />;
  }

  if (currentView === 'createGroup') {
    return <CreateGroup onClose={handleCloseCreateGroup} onCreate={handleGroupCreated} />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-96 flex-shrink-0">
        <ChatList
          onSelectChat={setSelectedChat}
          selectedChatId={selectedChat?.id}
          onCreateGroup={handleCreateGroup}
          onOpenProfile={handleOpenProfile}
        />
      </div>

      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onVideoCall={handleVideoCall} />
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