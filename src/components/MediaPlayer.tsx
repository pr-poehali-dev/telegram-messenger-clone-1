import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface MediaPlayerProps {
  type: 'audio' | 'video';
  url: string;
  title: string;
  artist?: string;
  thumbnail?: string;
  onClose: () => void;
}

const MediaPlayer = ({ type, url, title, artist, thumbnail, onClose }: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDuration = () => setDuration(media.duration);

    media.addEventListener('timeupdate', updateTime);
    media.addEventListener('loadedmetadata', updateDuration);

    return () => {
      media.removeEventListener('timeupdate', updateTime);
      media.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const media = mediaRef.current;
    if (!media) return;
    media.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const media = mediaRef.current;
    if (!media) return;
    media.volume = value[0] / 100;
    setVolume(value[0]);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30" />
      
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 text-white hover:bg-white/10 w-12 h-12 rounded-full z-10"
      >
        <Icon name="X" size={24} />
      </Button>

      <div className="relative w-full max-w-4xl px-8">
        {type === 'video' ? (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={url}
              className="w-full aspect-video"
              onClick={togglePlay}
            />
          </div>
        ) : (
          <div className="relative mb-8">
            <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={url} />
            <div className="w-80 h-80 mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center relative">
              {thumbnail ? (
                <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
              ) : (
                <Icon name="Music" size={120} className="text-white/30" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-3xl font-bold text-white mb-2 truncate">{title}</h2>
                {artist && <p className="text-lg text-white/80 truncate">{artist}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          {type === 'video' && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
              {artist && <p className="text-white/70">{artist}</p>}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-white/70 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-lg transition-all"
              >
                <Icon name="SkipBack" size={24} className="text-white" />
              </Button>
              
              <Button
                onClick={togglePlay}
                size="icon"
                className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl transition-all hover:scale-105"
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={32} className="text-white" />
              </Button>
              
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-lg transition-all"
              >
                <Icon name="SkipForward" size={24} className="text-white" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Icon name="Volume2" size={20} className="text-white/70" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
              <span className="text-sm text-white/70 w-12 text-right">{volume}%</span>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <Icon name="Repeat" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <Icon name="Heart" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <Icon name="Share2" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <Icon name="Download" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
