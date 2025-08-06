import { useState } from "react";
import { Send, Mic, Smile, ChevronDown, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
  timestamp: Date;
}

interface AIAssistantProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function AIAssistant({ messages, onSendMessage }: AIAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-80 bg-ai-background border-l border-ai-border flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2 border-b border-ai-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-ai-foreground uppercase tracking-wide">AI Assistant</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-6 text-xs">
                {selectedModel}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-ai-border">
              <DropdownMenuItem onClick={() => setSelectedModel("Claude 3.5 Sonnet")}>
                Claude 3.5 Sonnet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel("GPT-4")}>
                GPT-4
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedModel("GPT-3.5 Turbo")}>
                GPT-3.5 Turbo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex gap-1">
          <Button variant="secondary" size="sm" className="h-6 text-xs px-2">
            <Bot className="mr-1 h-3 w-3" />
            Builder
          </Button>
          <Button variant="outline" size="sm" className="h-6 text-xs px-2">
            <Bot className="mr-1 h-3 w-3" />
            Validator
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <Avatar className="w-7 h-7 flex-shrink-0 mt-0.5">
              <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                {message.role === 'assistant' ? (
                  <Bot className="w-3.5 h-3.5" />
                ) : (
                  <User className="w-3.5 h-3.5" />
                )}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">
                  {message.role === 'assistant' 
                    ? (message.agent || 'Assistant')
                    : 'You'
                  }
                </span>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className={`
                p-2.5 rounded-lg text-xs leading-relaxed border
                ${message.role === 'assistant' 
                  ? 'bg-ai-message-assistant text-ai-foreground border-ai-border/50'
                  : 'bg-ai-message-user text-foreground border-primary/20'
                }
              `}>
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-ai-border p-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 text-xs"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/60">
            <Mic className="w-3.5 h-3.5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/60">
            <Smile className="w-3.5 h-3.5" />
          </Button>
          
          <Button onClick={handleSend} size="sm" className="h-8 px-3 text-xs">
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}