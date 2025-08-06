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
    <div className="h-9 bg-tabs-background border-b border-tabs-border flex items-center">
      <div className="flex-1 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center px-3 py-1.5 text-xs border-r border-tabs-border cursor-pointer 
              hover:bg-tabs-active-background/60 transition-all duration-200 group relative
              ${tab.isActive 
                ? 'bg-tabs-active-background text-tabs-active-foreground shadow-sm' 
                : 'text-tabs-foreground hover:text-tabs-active-foreground'
              }
            `}
            onClick={() => onTabClick(tab.id)}
          >
            <span className="min-w-0 truncate font-medium">{tab.name}</span>
            {tab.isDirty && (
              <span className="ml-2 w-1.5 h-1.5 bg-orange-400 rounded-full" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent/60 rounded p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
            {tab.isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}