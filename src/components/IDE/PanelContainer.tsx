import { Search, GitBranch, Bug, Puzzle, Database, User, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface PanelContainerProps {
  activePanel: string;
  files: any[];
  selectedFile: string;
  onFileSelect: (filePath: string) => void;
}

const SearchPanel = () => (
  <div className="p-4 space-y-4">
    <div className="space-y-2">
      <Input placeholder="Search..." className="h-8" />
      <Input placeholder="Replace..." className="h-8" />
    </div>
    <div className="flex gap-2">
      <Button variant="outline" size="sm">Match Case</Button>
      <Button variant="outline" size="sm">Whole Word</Button>
      <Button variant="outline" size="sm">Regex</Button>
    </div>
    <div className="text-sm text-muted-foreground">
      No results found
    </div>
  </div>
);

const SourceControlPanel = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2">
      <GitBranch className="h-4 w-4" />
      <span className="text-sm font-medium">main</span>
      <Badge variant="secondary" className="text-xs">3 changes</Badge>
    </div>
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Changes
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500">M</span>
          <span>src/main.py</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-500">A</span>
          <span>src/utils.py</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-red-500">D</span>
          <span>src/old.py</span>
        </div>
      </div>
    </div>
    <div className="pt-2">
      <Input placeholder="Message (Ctrl+Enter to commit)" className="h-8 text-sm" />
      <Button className="w-full mt-2" size="sm">Commit</Button>
    </div>
  </div>
);

const DebugPanel = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2">
      <Bug className="h-4 w-4" />
      <span className="text-sm font-medium">Run and Debug</span>
    </div>
    <Button className="w-full" size="sm">
      <span className="mr-2">▶</span>
      Start Debugging
    </Button>
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Breakpoints
      </div>
      <div className="text-sm text-muted-foreground">
        No breakpoints set
      </div>
    </div>
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Call Stack
      </div>
      <div className="text-sm text-muted-foreground">
        Not debugging
      </div>
    </div>
  </div>
);

const ExtensionsPanel = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2">
      <Puzzle className="h-4 w-4" />
      <span className="text-sm font-medium">Extensions</span>
    </div>
    <Input placeholder="Search Extensions..." className="h-8" />
    <div className="space-y-3">
      <div className="p-3 border border-border rounded">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
            <span className="text-xs font-bold">PY</span>
          </div>
          <div>
            <div className="text-sm font-medium">Python</div>
            <div className="text-xs text-muted-foreground">Microsoft</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          IntelliSense, linting, debugging & more
        </div>
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Install
        </Button>
      </div>
    </div>
  </div>
);

const DatabasePanel = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2">
      <Database className="h-4 w-4" />
      <span className="text-sm font-medium">Database</span>
    </div>
    <Button variant="outline" className="w-full" size="sm">
      Connect to Database
    </Button>
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Connections
      </div>
      <div className="text-sm text-muted-foreground">
        No active connections
      </div>
    </div>
  </div>
);

const AccountsPanel = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2">
      <User className="h-4 w-4" />
      <span className="text-sm font-medium">Accounts</span>
    </div>
    <Button className="w-full" size="sm">
      Sign in to Sync Settings
    </Button>
    <div className="text-xs text-muted-foreground">
      Turn on Settings Sync to share your settings across all your devices.
    </div>
  </div>
);

const SettingsPanel = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center gap-2">
      <Settings className="h-4 w-4" />
      <span className="text-sm font-medium">Settings</span>
    </div>
    <Input placeholder="Search settings..." className="h-8" />
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="text-sm font-medium">Commonly Used</div>
        <div className="space-y-1">
          <div className="text-sm">Auto Save</div>
          <div className="text-sm">Font Size</div>
          <div className="text-sm">Tab Size</div>
          <div className="text-sm">Word Wrap</div>
        </div>
      </div>
    </div>
  </div>
);

export function PanelContainer({ activePanel, files, selectedFile, onFileSelect }: PanelContainerProps) {
  const renderPanel = () => {
    switch (activePanel) {
      case "search":
        return <SearchPanel />;
      case "source-control":
        return <SourceControlPanel />;
      case "debug":
        return <DebugPanel />;
      case "extensions":
        return <ExtensionsPanel />;
      case "database":
        return <DatabasePanel />;
      case "accounts":
        return <AccountsPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  const panelTitles = {
    explorer: "Explorer",
    search: "Search",
    "source-control": "Source Control",
    debug: "Run and Debug",
    extensions: "Extensions",
    database: "Database",
    terminal: "Terminal",
    accounts: "Accounts",
    settings: "Settings",
  };

  if (activePanel === "explorer") {
    return null; // FileExplorer handles this
  }

  return (
    <div className="w-80 bg-sidebar-background border-r border-sidebar-border flex flex-col">
      <div className="h-8 flex items-center px-4 border-b border-sidebar-border">
        <span className="text-xs font-medium uppercase tracking-wide text-sidebar-foreground">
          {panelTitles[activePanel as keyof typeof panelTitles]}
        </span>
      </div>
      <ScrollArea className="flex-1">
        {renderPanel()}
      </ScrollArea>
    </div>
  );
}