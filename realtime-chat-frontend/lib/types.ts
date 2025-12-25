export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  timestamp: Date;
  type: 'text' | 'file';
  file?: FileData;
}

export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnail?: string;
}

export interface Chat {
  id: string;
  name: string;
  type: 'public' | 'private';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface PrivateChat extends Chat {
  type: 'private';
  otherUser: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}