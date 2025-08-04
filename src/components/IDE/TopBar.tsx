import { Search, GitBranch, RotateCcw, Settings, Minimize2, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Tab {
  id: string;
  name: string;
  path: string;
  isDirty: boolean;
  isActive: boolean;
}

interface TopBarProps {
  tabs: Tab[];
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export function TopBar({ tabs, onTabClick, onTabClose }: TopBarProps) {
  return (
    <div className="h-12 bg-card border-b border-border flex items-center justify-between select-none">
      {/* Left: App Title */}
      <div className="flex items-center px-4">
        <h1 className="text-sm font-semibold text-foreground">Modern IDE</h1>
      </div>

      {/* Center: Tabs */}
      <div className="flex-1 flex items-center min-w-0">
        <div className="flex items-center overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                flex items-center gap-2 px-3 h-12 border-r border-border cursor-pointer
                hover:bg-accent transition-colors min-w-0 group
                ${tab.isActive ? 'bg-tab-active' : 'bg-tab-background'}
              `}
              onClick={() => onTabClick(tab.id)}
            >
              <span className="text-xs text-muted-foreground truncate">
                {tab.name}
                {tab.isDirty && <span className="text-primary ml-1">●</span>}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Status Icons + Search + Window Controls */}
      <div className="flex items-center gap-2 px-4">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <GitBranch className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-7 h-8 w-48 bg-input border-border"
          />
        </div>

        {/* Window Controls */}
        <div className="flex items-center ml-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
            <Square className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}