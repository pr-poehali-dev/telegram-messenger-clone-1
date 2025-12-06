import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  text?: string;
  time: string;
  isMine: boolean;
  isVoice?: boolean;
  duration?: string;
  isPlaying?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  isFile?: boolean;
  fileName?: string;
  fileSize?: string;
}

interface ChatWindowProps {
  chat: {
    id: number;
    name: string;
    avatar: string;
    online: boolean;
  };
  onVideoCall?: () => void;
}

const ChatWindow = ({ chat, onVideoCall }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', time: '10:30', isMine: false },
    { id: 2, text: 'Отлично! Работаю над проектом', time: '10:32', isMine: true },
    { id: 3, isVoice: true, duration: '0:15', time: '10:35', isMine: false },
    { id: 4, text: 'Звучит классно! Расскажешь подробнее?', time: '10:36', isMine: false },
    { id: 5, text: 'Конечно! Созваниваемся вечером?', time: '10:38', isMine: true },
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      const newMessage: Message = {
        id: Date.now(),
        isVoice: true,
        duration: '0:05',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const newMessage: Message = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        ...(isImage ? {
          isImage: true,
          imageUrl: URL.createObjectURL(file)
        } : {
          isFile: true,
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(1) + ' KB'
        })
      };
      setMessages([...messages, newMessage]);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl bg-gradient-to-br from-purple-400 to-pink-400">
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{chat.name}</h2>
              <p className="text-xs text-gray-500">{chat.online ? 'В сети' : 'Был(а) недавно'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all"
            >
              <Icon name="Phone" size={20} className="text-purple-600" />
            </Button>
            <Button
              onClick={onVideoCall}
              variant="ghost"
              size="icon"
              className="hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all"
            >
              <Icon name="Video" size={20} className="text-purple-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {message.isVoice ? (
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xs ${
                  message.isMine
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white shadow-md'
                }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 rounded-full ${
                    message.isMine ? 'hover:bg-white/20' : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon name="Play" size={16} className={message.isMine ? 'text-white' : 'text-purple-600'} />
                </Button>
                <div className="flex-1">
                  <div className={`h-1 rounded-full ${message.isMine ? 'bg-white/30' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full ${
                        message.isMine ? 'bg-white' : 'bg-gradient-to-r from-purple-600 to-pink-600'
                      }`}
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-medium ${message.isMine ? 'text-white' : 'text-gray-600'}`}>
                  {message.duration}
                </span>
              </div>
            ) : message.isImage ? (
              <div
                className={`rounded-2xl overflow-hidden max-w-sm ${
                  message.isMine ? 'rounded-br-md' : 'rounded-bl-md'
                }`}
              >
                <img
                  src={message.imageUrl}
                  alt="Изображение"
                  className="w-full h-auto shadow-lg"
                />
                <div className={`px-3 py-2 text-xs ${
                  message.isMine
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white/80'
                    : 'bg-white text-gray-500'
                }`}>
                  {message.time}
                </div>
              </div>
            ) : message.isFile ? (
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xs ${
                  message.isMine
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.isMine ? 'bg-white/20' : 'bg-purple-100'
                }`}>
                  <Icon name="File" size={20} className={message.isMine ? 'text-white' : 'text-purple-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${message.isMine ? 'text-white' : 'text-gray-900'}`}>
                    {message.fileName}
                  </p>
                  <p className={`text-xs ${message.isMine ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.fileSize}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`px-4 py-2 rounded-2xl max-w-md ${
                  message.isMine
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md'
                    : 'bg-white shadow-md text-gray-900 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isMine ? 'text-white/80' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,application/pdf,.doc,.docx,.zip"
        />
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-purple-600">
            <Icon name="Smile" size={22} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-purple-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="Paperclip" size={22} />
          </Button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Введите сообщение..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>

          {inputText.trim() ? (
            <Button
              onClick={handleSend}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Icon name="Send" size={20} />
            </Button>
          ) : (
            <Button
              onClick={toggleRecording}
              className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              <Icon name="Mic" size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;