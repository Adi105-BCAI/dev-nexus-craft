import { useState } from "react";
import { 
  Files, 
  Search, 
  GitBranch, 
  Bug, 
  Puzzle, 
  Settings, 
  User,
  Database,
  Terminal,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActivityBarItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut?: string;
}

interface ActivityBarProps {
  activePanel: string;
  onPanelChange: (panelId: string) => void;
}

const topItems: ActivityBarItem[] = [
  { id: "explorer", icon: Files, label: "Explorer", shortcut: "Ctrl+Shift+E" },
  { id: "search", icon: Search, label: "Search", shortcut: "Ctrl+Shift+F" },
  { id: "source-control", icon: GitBranch, label: "Source Control", shortcut: "Ctrl+Shift+G" },
  { id: "debug", icon: Bug, label: "Run and Debug", shortcut: "Ctrl+Shift+D" },
  { id: "extensions", icon: Puzzle, label: "Extensions", shortcut: "Ctrl+Shift+X" },
  { id: "database", icon: Database, label: "Database" },
  { id: "terminal", icon: Terminal, label: "Terminal", shortcut: "Ctrl+`" },
];

const bottomItems: ActivityBarItem[] = [
  { id: "accounts", icon: User, label: "Accounts" },
  { id: "settings", icon: Settings, label: "Settings", shortcut: "Ctrl+," },
];

export function ActivityBar({ activePanel, onPanelChange }: ActivityBarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const renderActivityItem = (item: ActivityBarItem, isBottom = false) => {
    const isActive = activePanel === item.id;
    const isHovered = hoveredItem === item.id;
    
    return (
      <TooltipProvider key={item.id}>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-12 h-12 p-0 relative group transition-all duration-200",
                "hover:bg-accent hover:scale-105",
                isActive && "bg-accent text-primary",
                "focus:ring-2 focus:ring-primary/20"
              )}
              onClick={() => onPanelChange(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r animate-fade-in" />
              )}
              
              {/* Icon with glow effect */}
              <div className={cn(
                "relative transition-all duration-200",
                isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]",
                isHovered && "drop-shadow-[0_0_6px_hsl(var(--primary)/0.3)]"
              )}>
                <item.icon className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive ? "text-primary" : "text-muted-foreground",
                  "group-hover:text-primary"
                )} />
              </div>
              
              {/* Hover background effect */}
              {(isHovered || isActive) && (
                <div className={cn(
                  "absolute inset-0 rounded bg-gradient-to-r opacity-10 transition-opacity duration-200",
                  "from-primary/20 to-transparent"
                )} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <div className="text-xs">
              <div className="font-medium">{item.label}</div>
              {item.shortcut && (
                <div className="text-muted-foreground mt-0.5">{item.shortcut}</div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="w-12 bg-sidebar-background border-r border-sidebar-border flex flex-col items-center py-2 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sidebar-background via-sidebar-background to-sidebar-background/95" />
      
      {/* Top items */}
      <div className="relative flex flex-col gap-1">
        {topItems.map(item => renderActivityItem(item))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom items */}
      <div className="relative flex flex-col gap-1">
        {bottomItems.map(item => renderActivityItem(item, true))}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}