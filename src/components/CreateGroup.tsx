import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  username: string;
}

interface CreateGroupProps {
  onClose: () => void;
  onCreate: (name: string, members: Contact[]) => void;
}

const CreateGroup = ({ onClose, onCreate }: CreateGroupProps) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
    { id: 1, name: 'Анна Смирнова', avatar: '👩‍💼', username: '@anna_s' },
    { id: 2, name: 'Макс Иванов', avatar: '👨‍💻', username: '@max_iv' },
    { id: 3, name: 'Мария Петрова', avatar: '👩‍🎨', username: '@maria_art' },
    { id: 4, name: 'Саша Козлов', avatar: '🧑‍🔬', username: '@sasha_k' },
    { id: 5, name: 'Дмитрий Орлов', avatar: '👨‍🚀', username: '@dima_fly' },
    { id: 6, name: 'Ольга Соколова', avatar: '👩‍⚕️', username: '@olga_med' },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMember = (contact: Contact) => {
    setSelectedMembers((prev) =>
      prev.find((m) => m.id === contact.id)
        ? prev.filter((m) => m.id !== contact.id)
        : [...prev, contact]
    );
  };

  const handleCreate = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreate(groupName, selectedMembers);
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h2 className="text-xl font-bold text-white">Новая группа</h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Group Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl shadow-lg">
            👥
          </div>
          <div className="flex-1">
            <Label htmlFor="groupName" className="text-sm text-gray-600 mb-1 block">
              Название группы
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Моя супер группа"
              className="text-lg font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Selected Members */}
      {selectedMembers.length > 0 && (
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <p className="text-sm text-gray-600 mb-3">
            Выбрано: {selectedMembers.length} {selectedMembers.length === 1 ? 'участник' : 'участников'}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm"
              >
                <span className="text-lg">{member.avatar}</span>
                <span className="text-sm font-medium">{member.name.split(' ')[0]}</span>
                <Button
                  onClick={() => toggleMember(member)}
                  variant="ghost"
                  size="icon"
                  className="w-5 h-5 hover:bg-gray-100"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск контактов..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {filteredContacts.map((contact) => {
            const isSelected = selectedMembers.find((m) => m.id === contact.id);
            return (
              <div
                key={contact.id}
                onClick={() => toggleMember(contact)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Checkbox checked={!!isSelected} className="pointer-events-none" />
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400">
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleCreate}
          disabled={!groupName.trim() || selectedMembers.length === 0}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="Check" size={20} className="mr-2" />
          Создать группу ({selectedMembers.length})
        </Button>
      </div>
    </div>
  );
};

export default CreateGroup;
