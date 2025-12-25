'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import { Chat, User, Message } from '@/lib/types';

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Mock data for demonstration
    const mockChats: Chat[] = [
      {
        id: 'private-1',
        name: 'Alice Johnson',
        type: 'private',
        participants: [
          parsedUser,
          { id: '2', username: 'alice', email: 'alice@example.com' }
        ],
        lastMessage: {
          id: 'msg-1',
          content: 'Hey, how are you doing?',
          senderId: '2',
          sender: { id: '2', username: 'alice', email: 'alice@example.com' },
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          type: 'text',
        },
        unreadCount: 2,
      },
      {
        id: 'private-2',
        name: 'Bob Smith',
        type: 'private',
        participants: [
          parsedUser,
          { id: '3', username: 'bob', email: 'bob@example.com' }
        ],
        lastMessage: {
          id: 'msg-2',
          content: 'Thanks for the help!',
          senderId: parsedUser.id,
          sender: parsedUser,
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'text',
        },
        unreadCount: 0,
      },
    ];

    setChats(mockChats);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-chat-bg">
      <ChatSidebar
        user={user}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatWindow
        chat={selectedChat}
        user={user}
      />
    </div>
  );
}