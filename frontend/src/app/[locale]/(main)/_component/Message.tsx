'use client';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Text, 
  Avatar, 
  ScrollArea, 
  TextInput, 
  ActionIcon,
  Group,
  Divider,
  Paper,
  Badge,
  LoadingOverlay
} from '@mantine/core';
import { IconSend, IconMessage, IconSearch, IconArrowLeft } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Mock data for sellers
const sellers = [
  {
    id: '1',
    name: 'Jane Cooper',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Sure, I can do that for $200',
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    lastMessage: 'The artwork will be ready by Friday',
    unread: 0,
    online: false
  },
  {
    id: '3',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    lastMessage: 'Thanks for your purchase!',
    unread: 5,
    online: true
  },
];

// Mock messages data
const mockMessages = {
  '1': [
    { id: '1', sender: 'Jane Cooper', content: 'Hi there!', time: '10:30 AM', isMe: false },
    { id: '2', sender: 'Me', content: 'Hello! I wanted to ask about your artwork', time: '10:32 AM', isMe: true },
    { id: '3', sender: 'Jane Cooper', content: 'Sure, what would you like to know?', time: '10:33 AM', isMe: false },
    { id: '4', sender: 'Jane Cooper', content: 'Sure, I can do that for $200', time: '10:35 AM', isMe: false },
  ],
  '2': [
    { id: '1', sender: 'John Smith', content: 'Your commission is in progress', time: '9:15 AM', isMe: false },
    { id: '2', sender: 'Me', content: 'Great! When will it be ready?', time: '9:20 AM', isMe: true },
    { id: '3', sender: 'John Smith', content: 'The artwork will be ready by Friday', time: '9:22 AM', isMe: false },
  ],
  '3': [
    { id: '1', sender: 'Alice Johnson', content: 'Your order has shipped!', time: 'Yesterday', isMe: false },
    { id: '2', sender: 'Me', content: 'Received it, thanks!', time: 'Today', isMe: true },
    { id: '3', sender: 'Alice Johnson', content: 'Thanks for your purchase!', time: 'Today', isMe: false },
  ]
};

// Zod schema for message validation
const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty")
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function Message() {
  const router = useRouter();
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema)
  });

  // Filter sellers based on search query
  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load messages when seller is selected
  useEffect(() => {
    if (selectedSeller) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setMessages(mockMessages[selectedSeller as keyof typeof mockMessages] || []);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedSeller]);

  const handleSendMessage = (data: MessageFormData) => {
    if (!selectedSeller) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'Me',
      content: data.message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    reset();
  };

  return (
    <div className="flex ">
      {/* Sellers List */}
      <div className="w-full md:w-80 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Text size="xl" fw={500} className="flex items-center gap-2">
            <IconMessage size={24} /> Messages
          </Text>
          <TextInput
            placeholder="Search sellers..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            className="mt-3"
          />
        </div>
        
        <ScrollArea h="calc(100vh - 120px)">
          {filteredSellers.map((seller) => (
            <Paper
              key={seller.id}
              onClick={() => setSelectedSeller(seller.id)}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedSeller === seller.id ? 'bg-blue-50' : ''}`}
            >
              <Group>
                <Avatar src={seller.avatar} radius="xl" size="md">
                  {seller.online && (
                    <Box
                      className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                    />
                  )}
                </Avatar>
                <div className="flex-1">
                  <Group justify="space-between">
                    <Text fw={500}>{seller.name}</Text>
                    {seller.unread > 0 && (
                      <Badge color="red" variant="filled" size="sm">
                        {seller.unread}
                      </Badge>
                    )}
                  </Group>
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {seller.lastMessage}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedSeller ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-4">
              <ActionIcon 
                variant="subtle" 
                onClick={() => setSelectedSeller(null)}
                className="md:hidden"
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
              <Group>
                <Avatar 
                  src={sellers.find(s => s.id === selectedSeller)?.avatar} 
                  radius="xl" 
                  size="md"
                />
                <div>
                  <Text fw={500}>
                    {sellers.find(s => s.id === selectedSeller)?.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {sellers.find(s => s.id === selectedSeller)?.online ? 
                      'Online' : 'Offline'}
                  </Text>
                </div>
              </Group>
            </div>

            <ScrollArea h="calc(100vh - 180px)" className="flex-1 p-4">
              <LoadingOverlay visible={isLoading} />
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      message.isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {!message.isMe && (
                      <Text size="sm" fw={500} className="text-gray-700">
                        {message.sender}
                      </Text>
                    )}
                    <Text>{message.content}</Text>
                    <Text size="xs" className={`mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.time}
                    </Text>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <form onSubmit={handleSubmit(handleSendMessage)} className="p-4 border-t border-gray-200 bg-white">
              <Group>
                <TextInput
                  placeholder="Type your message..."
                  className="flex-1"
                  {...register('message')}
                  error={errors.message?.message}
                />
                <ActionIcon 
                  type="submit" 
                  variant="filled" 
                  color="blue" 
                  size="lg"
                >
                  <IconSend size={18} />
                </ActionIcon>
              </Group>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <IconMessage size={48} className="mx-auto text-gray-400 mb-4" />
              <Text size="xl" fw={500} c="dimmed">
                Select a conversation
              </Text>
              <Text c="dimmed">
                Choose a seller from the list to start messaging
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}