import React from 'react';
import { Eye, Clock, Users, Star } from 'lucide-react';

interface FileStatsProps {
  fileName: string;
  lastModified?: Date;
  size?: number;
  views?: number;
  collaborators?: number;
  starred?: boolean;
  className?: string;
}

export function FileStats({ 
  fileName, 
  lastModified, 
  size, 
  views, 
  collaborators, 
  starred,
  className = "" 
}: FileStatsProps) {
  const formatSize = (bytes?: number) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatTime = (date?: Date) => {
    if (!date) return 'Unknown';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className={`flex items-center gap-4 text-xs text-muted-foreground ${className}`}>
      {lastModified && (
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{formatTime(lastModified)}</span>
        </div>
      )}
      
      {size && (
        <div className="flex items-center gap-1">
          <span>{formatSize(size)}</span>
        </div>
      )}
      
      {views !== undefined && (
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>{views}</span>
        </div>
      )}
      
      {collaborators !== undefined && (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{collaborators}</span>
        </div>
      )}
      
      {starred && (
        <div className="flex items-center gap-1 text-amber-400">
          <Star className="h-3 w-3 fill-current" />
        </div>
      )}
    </div>
  );
}