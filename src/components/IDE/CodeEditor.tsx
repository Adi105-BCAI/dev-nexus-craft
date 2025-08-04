import { useState } from "react";
import { LanguageBadge } from "./LanguageIcon";
import { Breadcrumb } from "./Breadcrumb";
import { FileStats } from "./FileStats";
import { Settings, Copy, Download, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  content: string;
  language: string;
  fileName: string;
}

export function CodeEditor({ content, language, fileName }: CodeEditorProps) {
  const [selectedText, setSelectedText] = useState<string>("");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  
  const lines = content.split('\n');
  const currentPath = `/src/${fileName}`;
  
  // Mock file stats
  const fileStats = {
    lastModified: new Date(Date.now() - 120000),
    size: content.length,
    views: 42,
    collaborators: 3,
    starred: true
  };
  
  const syntaxHighlight = (line: string, lineNumber: number) => {
    if (language === 'python') {
      return line
        .replace(/(def|class|if|else|elif|for|while|try|except|import|from|return|yield|with|as)\b/g, '<span class="text-purple-400">$1</span>')
        .replace(/(True|False|None)\b/g, '<span class="text-blue-400">$1</span>')
        .replace(/(['"])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
        .replace(/(#.*$)/g, '<span class="text-gray-500">$1</span>')
        .replace(/(\d+)/g, '<span class="text-yellow-400">$1</span>');
    }
    
    if (language === 'markdown') {
      return line
        .replace(/^(#{1,6})\s(.*)$/g, '<span class="text-blue-400">$1</span> <span class="font-bold text-blue-300">$2</span>')
        .replace(/(\*\*)(.*?)\1/g, '<span class="font-bold">$2</span>')
        .replace(/(\*)(.*?)\1/g, '<span class="italic">$2</span>')
        .replace(/(`)(.*?)\1/g, '<span class="bg-gray-800 text-orange-400 px-1 rounded">$2</span>');
    }
    
    return line;
  };

  return (
    <div className="flex-1 flex flex-col bg-editor-background">
      {/* Enhanced Editor Header */}
      <div className="bg-card border-b border-border">
        {/* Top Row - File Path & Actions */}
        <div className="h-10 flex items-center px-4 border-b border-border/50">
          <div className="flex items-center gap-3 flex-1">
            <Breadcrumb path={currentPath} />
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="Copy file path">
              <Copy className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="Download">
              <Download className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="Share">
              <Share className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="More options">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Bottom Row - File Info & Language Badge */}
        <div className="h-9 flex items-center px-4 bg-card/50">
          <div className="flex items-center gap-3 flex-1">
            <LanguageBadge fileName={fileName} />
            <FileStats {...fileStats} fileName={fileName} />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{lines.length} lines</span>
            <span>•</span>
            <span>UTF-8</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-5 px-2 text-xs"
              onClick={() => setShowLineNumbers(!showLineNumbers)}
            >
              Line Numbers
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-5 px-2 text-xs"
              onClick={() => setWordWrap(!wordWrap)}
            >
              Word Wrap
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Editor Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* Line Numbers */}
          {showLineNumbers && (
            <div className="bg-editor-background border-r border-border px-3 py-4 select-none">
              {lines.map((_, index) => (
                <div 
                  key={index} 
                  className="text-editor-line-numbers text-xs leading-6 text-right hover:text-foreground transition-colors"
                  style={{ minWidth: '3ch' }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code Content */}
          <div className={`flex-1 p-4 font-mono text-sm leading-6 text-foreground ${wordWrap ? '' : 'overflow-x-auto'}`}>
            {lines.map((line, index) => (
              <div 
                key={index}
                className={`
                  min-h-6 hover:bg-editor-current-line px-2 -mx-2 rounded-sm transition-colors
                  ${wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}
                `}
                dangerouslySetInnerHTML={{ 
                  __html: syntaxHighlight(line, index + 1) || '&nbsp;' 
                }}
              />
            ))}
            
            {/* Enhanced Cursor */}
            <div className="w-0.5 h-6 bg-primary animate-pulse shadow-glow" />
          </div>
        </div>
      </div>
    </div>
  );
}