import { useState } from "react";

interface CodeEditorProps {
  content: string;
  language: string;
  fileName: string;
}

export function CodeEditor({ content, language, fileName }: CodeEditorProps) {
  const [selectedText, setSelectedText] = useState<string>("");
  
  const lines = content.split('\n');
  
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
      {/* Editor Header */}
      <div className="h-10 bg-card border-b border-border flex items-center px-4">
        <span className="text-sm text-foreground">{fileName}</span>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground">{language}</span>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* Line Numbers */}
          <div className="bg-editor-background border-r border-border px-3 py-4 select-none">
            {lines.map((_, index) => (
              <div 
                key={index} 
                className="text-editor-line-numbers text-xs leading-6 text-right"
                style={{ minWidth: '3ch' }}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 p-4 font-mono text-sm leading-6 text-foreground overflow-x-auto">
            {lines.map((line, index) => (
              <div 
                key={index}
                className="min-h-6 hover:bg-editor-current-line px-2 -mx-2 rounded"
                dangerouslySetInnerHTML={{ 
                  __html: syntaxHighlight(line, index + 1) || '&nbsp;' 
                }}
              />
            ))}
            
            {/* Cursor */}
            <div className="w-0.5 h-6 bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}