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
    <div className="w-80 bg-assistant-background border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">AI Assistant</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                {selectedModel}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
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
        
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="h-7 text-xs">
            <Bot className="mr-1 h-3 w-3" />
            Builder
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Bot className="mr-1 h-3 w-3" />
            Validator
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-muted">
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-foreground">
                  {message.role === 'user' ? 'You' : message.agent || 'Assistant'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              
              <div className={`
                rounded-lg p-3 text-sm
                ${message.role === 'user' 
                  ? 'bg-assistant-user-message border border-primary/20' 
                  : 'bg-assistant-message border border-border'
                }
              `}>
                <pre className="whitespace-pre-wrap font-sans text-foreground">
                  {message.content}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="pr-20 bg-input border-border"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Mic className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Smile className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            size="sm"
            className="h-9"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}