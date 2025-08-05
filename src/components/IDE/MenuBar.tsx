import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems = {
  File: [
    { label: "New File", shortcut: "Ctrl+N" },
    { label: "New Folder", shortcut: "Ctrl+Shift+N" },
    { label: "Open File...", shortcut: "Ctrl+O" },
    { label: "Open Folder...", shortcut: "Ctrl+K Ctrl+O" },
    { type: "separator" },
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Save As...", shortcut: "Ctrl+Shift+S" },
    { label: "Save All", shortcut: "Ctrl+K S" },
    { type: "separator" },
    { label: "Close Editor", shortcut: "Ctrl+W" },
    { label: "Close Folder", shortcut: "Ctrl+K F" },
    { type: "separator" },
    { label: "Exit", shortcut: "Ctrl+Q" },
  ],
  Edit: [
    { label: "Undo", shortcut: "Ctrl+Z" },
    { label: "Redo", shortcut: "Ctrl+Y" },
    { type: "separator" },
    { label: "Cut", shortcut: "Ctrl+X" },
    { label: "Copy", shortcut: "Ctrl+C" },
    { label: "Paste", shortcut: "Ctrl+V" },
    { type: "separator" },
    { label: "Find", shortcut: "Ctrl+F" },
    { label: "Replace", shortcut: "Ctrl+H" },
    { label: "Find in Files", shortcut: "Ctrl+Shift+F" },
  ],
  Selection: [
    { label: "Select All", shortcut: "Ctrl+A" },
    { label: "Expand Selection", shortcut: "Shift+Alt+→" },
    { label: "Shrink Selection", shortcut: "Shift+Alt+←" },
    { type: "separator" },
    { label: "Copy Line Up", shortcut: "Shift+Alt+↑" },
    { label: "Copy Line Down", shortcut: "Shift+Alt+↓" },
    { label: "Move Line Up", shortcut: "Alt+↑" },
    { label: "Move Line Down", shortcut: "Alt+↓" },
  ],
  View: [
    { label: "Command Palette", shortcut: "Ctrl+Shift+P" },
    { label: "Open View...", shortcut: "Ctrl+Q" },
    { type: "separator" },
    { 
      label: "Appearance", 
      submenu: [
        { label: "Zoom In", shortcut: "Ctrl+=" },
        { label: "Zoom Out", shortcut: "Ctrl+-" },
        { label: "Reset Zoom", shortcut: "Ctrl+0" },
        { type: "separator" },
        { label: "Full Screen", shortcut: "F11" },
      ]
    },
    { 
      label: "Editor Layout", 
      submenu: [
        { label: "Split Up" },
        { label: "Split Down" },
        { label: "Split Left" },
        { label: "Split Right" },
      ]
    },
    { type: "separator" },
    { label: "Explorer", shortcut: "Ctrl+Shift+E" },
    { label: "Search", shortcut: "Ctrl+Shift+F" },
    { label: "Source Control", shortcut: "Ctrl+Shift+G" },
    { label: "Debug", shortcut: "Ctrl+Shift+D" },
    { label: "Extensions", shortcut: "Ctrl+Shift+X" },
  ],
  Go: [
    { label: "Back", shortcut: "Alt+←" },
    { label: "Forward", shortcut: "Alt+→" },
    { type: "separator" },
    { label: "Go to File...", shortcut: "Ctrl+P" },
    { label: "Go to Line...", shortcut: "Ctrl+G" },
    { label: "Go to Symbol...", shortcut: "Ctrl+Shift+O" },
    { type: "separator" },
    { label: "Next Problem", shortcut: "F8" },
    { label: "Previous Problem", shortcut: "Shift+F8" },
  ],
  Terminal: [
    { label: "New Terminal", shortcut: "Ctrl+Shift+`" },
    { label: "Split Terminal", shortcut: "Ctrl+Shift+5" },
    { type: "separator" },
    { label: "Run Task...", shortcut: "Ctrl+Shift+P" },
    { label: "Configure Tasks..." },
  ],
  Help: [
    { label: "Welcome" },
    { label: "Show All Commands", shortcut: "Ctrl+Shift+P" },
    { label: "Documentation" },
    { type: "separator" },
    { label: "Keyboard Shortcuts", shortcut: "Ctrl+K Ctrl+S" },
    { type: "separator" },
    { label: "About" },
  ],
};

interface MenuBarProps {
  className?: string;
}

export function MenuBar({ className }: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`h-8 bg-card border-b border-border flex items-center px-2 select-none ${className}`}>
      {Object.entries(menuItems).map(([menuName, items]) => (
        <DropdownMenu key={menuName} open={openMenu === menuName} onOpenChange={(open) => setOpenMenu(open ? menuName : null)}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs font-normal hover:bg-accent focus:bg-accent"
              onClick={() => handleMenuClick(menuName)}
            >
              {menuName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="min-w-[200px]" 
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {items.map((item, index) => {
              if (item.type === "separator") {
                return <DropdownMenuSeparator key={index} />;
              }
              
              if ("submenu" in item && item.submenu) {
                return (
                  <DropdownMenuSub key={index}>
                    <DropdownMenuSubTrigger className="text-xs">
                      {item.label}
                      <ChevronDown className="ml-auto h-3 w-3" />
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {item.submenu.map((subItem, subIndex) => {
                        if (subItem.type === "separator") {
                          return <DropdownMenuSeparator key={subIndex} />;
                        }
                        return (
                          <DropdownMenuItem key={subIndex} className="text-xs">
                            <span>{subItem.label}</span>
                            {subItem.shortcut && (
                              <span className="ml-auto text-xs text-muted-foreground">
                                {subItem.shortcut}
                              </span>
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                );
              }
              
              return (
                <DropdownMenuItem key={index} className="text-xs">
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.shortcut}
                    </span>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
      
      {/* Right side - could add additional controls here */}
      <div className="ml-auto flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Modern IDE</span>
      </div>
    </div>
  );
}