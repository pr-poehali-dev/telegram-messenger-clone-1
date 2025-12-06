import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile = ({ onClose }: UserProfileProps) => {
  const [name, setName] = useState('Александр Петров');
  const [username, setUsername] = useState('@alex_petrov');
  const [bio, setBio] = useState('Разработчик • Путешественник • Любитель кофе ☕');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showOnline, setShowOnline] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <Icon name="ArrowLeft" size={24} />
        </Button>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
              <AvatarImage src="" />
              <AvatarFallback className="text-5xl bg-gradient-to-br from-purple-400 to-pink-400">
                👨‍💼
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
            >
              <Icon name="Camera" size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-20 px-6 pb-6 space-y-6">
        {/* Basic Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {name}
          </h2>
          <p className="text-gray-500">{username}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-green-600 font-medium">Онлайн</span>
          </div>
        </div>

        {/* Edit Info */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Icon name="User" size={20} className="text-purple-600" />
            Личная информация
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm text-gray-600">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-sm text-gray-600">Имя пользователя</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-sm text-gray-600">О себе</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-purple-600">247</p>
            <p className="text-xs text-gray-600">Сообщений</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-pink-600">42</p>
            <p className="text-xs text-gray-600">Чатов</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-600">18</p>
            <p className="text-xs text-gray-600">Звонков</p>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Icon name="Settings" size={20} className="text-purple-600" />
            Настройки
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Уведомления</p>
                <p className="text-sm text-gray-500">Получать уведомления о сообщениях</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Звук</p>
                <p className="text-sm text-gray-500">Звуковые уведомления</p>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Статус онлайн</p>
                <p className="text-sm text-gray-500">Показывать когда я в сети</p>
              </div>
              <Switch checked={showOnline} onCheckedChange={setShowOnline} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all">
            <Icon name="Save" size={20} className="mr-2" />
            Сохранить изменения
          </Button>
          <Button variant="outline" className="w-full py-6 rounded-xl text-base font-semibold border-2 hover:bg-gray-50">
            <Icon name="LogOut" size={20} className="mr-2 text-red-500" />
            Выйти из аккаунта
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
