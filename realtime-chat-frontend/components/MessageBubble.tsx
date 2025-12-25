'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Message, FileData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return format(new Date(date), 'HH:mm');
  };

  if (message.type === 'file') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex mb-4",
          isOwn ? "justify-end" : "justify-start"
        )}
      >
        <div className={cn(
          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
          isOwn
            ? "bg-message-sent text-white"
            : "bg-message-received text-gray-900"
        )}>
          <FileAttachment file={message.file!} />
          <div className="text-xs mt-1 opacity-70">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex mb-4",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm",
        isOwn
          ? "bg-message-sent text-white rounded-br-sm"
          : "bg-message-received text-gray-900 rounded-bl-sm"
      )}>
        <p className="text-sm leading-relaxed break-words">
          {message.content}
        </p>
        <div className={cn(
          "text-xs mt-1",
          isOwn ? "text-blue-100" : "text-gray-500"
        )}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
}

function FileAttachment({ file }: { file: FileData }) {
  const isImage = file.type.startsWith('image/');

  if (isImage) {
    return (
      <div className="space-y-2">
        <img
          src={file.url}
          alt={file.name}
          className="max-w-full h-auto rounded-lg"
        />
        <p className="text-sm font-medium">{file.name}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
        <span className="text-white text-sm font-semibold">
          {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {file.name}
        </p>
        <p className="text-xs text-gray-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
}