import { useState } from "react";
import { Terminal as TerminalIcon, X, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

interface TerminalProps {
  lines: TerminalLine[];
  onCommand: (command: string) => void;
}

export function Terminal({ lines, onCommand }: TerminalProps) {
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTerminalActive, setIsTerminalActive] = useState(true);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        onCommand(currentCommand);
        setCurrentCommand("");
      }
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-terminal-foreground font-medium';
      case 'error':
        return 'text-terminal-error';
      case 'success':
        return 'text-terminal-success';
      case 'output':
        return 'text-terminal-foreground/90';
      default:
        return 'text-terminal-foreground';
    }
  };

  const getLinePrefix = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return '$ ';
      case 'error':
        return '❌ ';
      case 'success':
        return '✅ ';
      case 'output':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="h-64 bg-terminal-background border-t border-border flex flex-col">
      {/* Terminal Header */}
      <div className="h-10 bg-card border-b border-border flex items-center justify-between px-4">
        <Tabs defaultValue="terminal" className="flex-1">
          <TabsList className="h-8 bg-muted">
            <TabsTrigger value="terminal" className="text-xs h-6">
              <TerminalIcon className="mr-1 h-3 w-3" />
              Terminal
            </TabsTrigger>
            <TabsTrigger value="output" className="text-xs h-6">
              Output
            </TabsTrigger>
            <TabsTrigger value="problems" className="text-xs h-6">
              Problems
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm">
        <div className="space-y-1">
          {lines.map((line) => (
            <div key={line.id} className={`${getLineColor(line.type)} leading-relaxed flex items-start`}>
              <span className="text-primary mr-2 select-none min-w-fit">
                {getLinePrefix(line.type)}
              </span>
              <span className="flex-1">{line.content}</span>
            </div>
          ))}
          
          {/* Current Input Line */}
          <div className="flex items-center text-terminal-foreground mt-2">
            <span className="text-primary mr-2 select-none">$ </span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-terminal-foreground placeholder:text-terminal-foreground/50"
              placeholder="Enter command..."
              autoFocus
            />
            <span className="w-1.5 h-4 bg-primary animate-pulse ml-1 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}