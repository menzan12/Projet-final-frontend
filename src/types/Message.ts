export interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
    email?: string;
  };
  receiver: {
    _id: string;
    name: string;
    avatar?: string;
    email?: string;
  };
  content: string;
  type: 'text' | 'image' | 'file' | 'location';
  conversationId: string;
  isRead: boolean;
  readAt?: string;
  attachments?: {
    url: string;
    name: string;
    fileType: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: string;
}