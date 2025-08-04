import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  path: string;
  className?: string;
}

export function Breadcrumb({ path, className = "" }: BreadcrumbProps) {
  const segments = path.split('/').filter(Boolean);
  
  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`}>
      <div className="breadcrumb-item flex items-center text-muted-foreground hover:text-foreground cursor-pointer">
        <Home className="h-3 w-3" />
      </div>
      
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span 
            className={`
              breadcrumb-item cursor-pointer
              ${index === segments.length - 1 
                ? 'text-foreground font-medium' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {segment}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}