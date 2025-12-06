import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoCallProps {
  chat: {
    name: string;
    avatar: string;
  };
  onEndCall: () => void;
}

const VideoCall = ({ chat, onEndCall }: VideoCallProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const connectTimer = setTimeout(() => setIsConnecting(false), 2000);
    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnecting]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Remote video (simulated) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isConnecting ? (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-5xl">{chat.avatar}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{chat.name}</h2>
            <p className="text-purple-200 flex items-center justify-center gap-2">
              <span>Соединение</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </span>
            </p>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <Avatar className="w-48 h-48 mx-auto mb-6 border-4 border-white/20">
                <AvatarImage src="" />
                <AvatarFallback className="text-8xl bg-gradient-to-br from-purple-400 to-pink-400">
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-bold text-white mb-2">{chat.name}</h2>
              <p className="text-2xl text-purple-200">{formatDuration(callDuration)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Local video preview */}
      <div className="absolute top-6 right-6 w-48 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden">
        {isVideoOff ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Icon name="VideoOff" size={32} className="text-white" />
              </div>
              <p className="text-white text-sm">Камера выключена</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <span className="text-6xl">👤</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <Button
            onClick={() => setIsMuted(!isMuted)}
            size="icon"
            className={`w-16 h-16 rounded-full transition-all hover:scale-110 ${
              isMuted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-lg'
            }`}
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} className="text-white" />
          </Button>

          <Button
            onClick={() => setIsVideoOff(!isVideoOff)}
            size="icon"
            className={`w-16 h-16 rounded-full transition-all hover:scale-110 ${
              isVideoOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-lg'
            }`}
          >
            <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} className="text-white" />
          </Button>

          <Button
            onClick={onEndCall}
            size="icon"
            className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 transition-all hover:scale-110 shadow-2xl"
          >
            <Icon name="PhoneOff" size={28} className="text-white" />
          </Button>

          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-lg transition-all hover:scale-110"
          >
            <Icon name="Grid3x3" size={24} className="text-white" />
          </Button>

          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-lg transition-all hover:scale-110"
          >
            <Icon name="Settings" size={24} className="text-white" />
          </Button>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white font-medium">Видеозвонок</span>
          </div>
          {!isConnecting && (
            <div className="text-white font-mono text-lg animate-fade-in">
              {formatDuration(callDuration)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
