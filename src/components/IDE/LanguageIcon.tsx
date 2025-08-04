import React from 'react';
import { 
  FileText, 
  FileCode, 
  Settings,
  Hash,
  Braces,
  Database,
  FileImage,
  File,
  GitBranch,
  Package,
  Monitor,
  Layers,
  Zap,
  Code,
  Globe,
  Palette,
  BookOpen,
  Terminal,
  Shield,
  Box,
  Coffee,
  Gem,
  Crown,
  Smartphone
} from "lucide-react";

interface LanguageIconProps {
  fileName: string;
  className?: string;
  showGlow?: boolean;
}

const getLanguageInfo = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const name = fileName.toLowerCase();

  // Programming Languages
  if (ext === 'js' || ext === 'mjs') return { 
    icon: FileCode, 
    color: 'text-lang-javascript', 
    bgColor: 'bg-lang-javascript/10',
    language: 'JavaScript' 
  };
  
  if (ext === 'ts' || ext === 'tsx') return { 
    icon: FileCode, 
    color: 'text-lang-typescript', 
    bgColor: 'bg-lang-typescript/10',
    language: 'TypeScript' 
  };
  
  if (ext === 'jsx') return { 
    icon: Zap, 
    color: 'text-lang-react', 
    bgColor: 'bg-lang-react/10',
    language: 'React' 
  };
  
  if (ext === 'py' || ext === 'pyw') return { 
    icon: FileCode, 
    color: 'text-lang-python', 
    bgColor: 'bg-lang-python/10',
    language: 'Python' 
  };
  
  if (ext === 'html' || ext === 'htm') return { 
    icon: Globe, 
    color: 'text-lang-html', 
    bgColor: 'bg-lang-html/10',
    language: 'HTML' 
  };
  
  if (ext === 'css' || ext === 'scss' || ext === 'sass' || ext === 'less') return { 
    icon: Palette, 
    color: 'text-lang-css', 
    bgColor: 'bg-lang-css/10',
    language: 'CSS' 
  };
  
  if (ext === 'vue') return { 
    icon: Layers, 
    color: 'text-lang-vue', 
    bgColor: 'bg-lang-vue/10',
    language: 'Vue' 
  };
  
  if (ext === 'rs') return { 
    icon: Shield, 
    color: 'text-lang-rust', 
    bgColor: 'bg-lang-rust/10',
    language: 'Rust' 
  };
  
  if (ext === 'go') return { 
    icon: Zap, 
    color: 'text-lang-go', 
    bgColor: 'bg-lang-go/10',
    language: 'Go' 
  };
  
  if (ext === 'java') return { 
    icon: Coffee, 
    color: 'text-lang-java', 
    bgColor: 'bg-lang-java/10',
    language: 'Java' 
  };
  
  if (ext === 'cs') return { 
    icon: Hash, 
    color: 'text-lang-csharp', 
    bgColor: 'bg-lang-csharp/10',
    language: 'C#' 
  };
  
  if (ext === 'php') return { 
    icon: Code, 
    color: 'text-lang-php', 
    bgColor: 'bg-lang-php/10',
    language: 'PHP' 
  };
  
  if (ext === 'rb') return { 
    icon: Gem, 
    color: 'text-lang-ruby', 
    bgColor: 'bg-lang-ruby/10',
    language: 'Ruby' 
  };
  
  if (ext === 'kt' || ext === 'kts') return { 
    icon: Crown, 
    color: 'text-lang-kotlin', 
    bgColor: 'bg-lang-kotlin/10',
    language: 'Kotlin' 
  };
  
  if (ext === 'swift') return { 
    icon: Smartphone, 
    color: 'text-lang-swift', 
    bgColor: 'bg-lang-swift/10',
    language: 'Swift' 
  };

  // Configuration & Data Files
  if (ext === 'json') return { 
    icon: Braces, 
    color: 'text-lang-json', 
    bgColor: 'bg-lang-json/10',
    language: 'JSON' 
  };
  
  if (ext === 'xml' || ext === 'xaml') return { 
    icon: Code, 
    color: 'text-orange-400', 
    bgColor: 'bg-orange-400/10',
    language: 'XML' 
  };
  
  if (ext === 'yaml' || ext === 'yml') return { 
    icon: Settings, 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-400/10',
    language: 'YAML' 
  };
  
  if (ext === 'toml') return { 
    icon: Settings, 
    color: 'text-amber-400', 
    bgColor: 'bg-amber-400/10',
    language: 'TOML' 
  };

  // Documentation & Text
  if (ext === 'md' || ext === 'markdown') return { 
    icon: BookOpen, 
    color: 'text-lang-markdown', 
    bgColor: 'bg-lang-markdown/10',
    language: 'Markdown' 
  };
  
  if (ext === 'txt') return { 
    icon: FileText, 
    color: 'text-muted-foreground', 
    bgColor: 'bg-muted/10',
    language: 'Text' 
  };

  // Build & Package Files
  if (name === 'package.json' || name === 'package-lock.json') return { 
    icon: Package, 
    color: 'text-lang-javascript', 
    bgColor: 'bg-lang-javascript/10',
    language: 'NPM' 
  };
  
  if (name === 'dockerfile' || ext === 'dockerfile') return { 
    icon: Box, 
    color: 'text-lang-docker', 
    bgColor: 'bg-lang-docker/10',
    language: 'Docker' 
  };
  
  if (name === '.gitignore' || name === '.gitattributes') return { 
    icon: GitBranch, 
    color: 'text-lang-git', 
    bgColor: 'bg-lang-git/10',
    language: 'Git' 
  };

  // Database
  if (ext === 'sql') return { 
    icon: Database, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-400/10',
    language: 'SQL' 
  };

  // Images
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(ext || '')) return { 
    icon: FileImage, 
    color: 'text-pink-400', 
    bgColor: 'bg-pink-400/10',
    language: 'Image' 
  };

  // Shell Scripts
  if (ext === 'sh' || ext === 'bash' || ext === 'zsh') return { 
    icon: Terminal, 
    color: 'text-green-400', 
    bgColor: 'bg-green-400/10',
    language: 'Shell' 
  };

  // Default
  return { 
    icon: File, 
    color: 'text-muted-foreground', 
    bgColor: 'bg-muted/10',
    language: 'File' 
  };
};

export function LanguageIcon({ fileName, className = "", showGlow = false }: LanguageIconProps) {
  const { icon: Icon, color, bgColor, language } = getLanguageInfo(fileName);
  
  return (
    <div className={`relative ${className}`}>
      <Icon 
        className={`h-4 w-4 ${color} ${showGlow ? 'file-icon-glow' : ''} transition-smooth`} 
      />
      {showGlow && (
        <div 
          className={`absolute inset-0 ${bgColor} rounded-full blur-sm opacity-60 -z-10`}
        />
      )}
    </div>
  );
}

export function LanguageBadge({ fileName, className = "" }: { fileName: string; className?: string }) {
  const { language, color, bgColor } = getLanguageInfo(fileName);
  
  return (
    <span 
      className={`
        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
        ${bgColor} ${color} language-badge ${className}
      `}
    >
      {language}
    </span>
  );
}