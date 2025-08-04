import { useState } from "react";
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  FileCode, 
  Settings,
  Package,
  GitBranch,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isExpanded?: boolean;
}

interface FileExplorerProps {
  files: FileNode[];
  selectedFile?: string;
  onFileSelect: (filePath: string) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'py':
    case 'js':
    case 'ts':
    case 'tsx':
    case 'jsx':
      return FileCode;
    case 'json':
      return Settings;
    case 'md':
      return FileText;
    default:
      return FileText;
  }
};

export function FileExplorer({ files, selectedFile, onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedFile === node.path;
    const IconComponent = node.type === 'folder' 
      ? (isExpanded ? FolderOpen : Folder)
      : getFileIcon(node.name);

    return (
      <div key={node.id}>
        <div
          className={`
            flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm
            hover:bg-sidebar-accent transition-colors
            ${isSelected ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'}
          `}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          {node.type === 'folder' && (
            <div className="flex items-center justify-center w-4 h-4">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          )}
          {node.type === 'file' && <div className="w-4" />}
          <IconComponent className="h-4 w-4" />
          <span className="truncate">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children?.map(child => 
          renderFileNode(child, depth + 1)
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full overflow-y-auto">
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-sidebar-foreground">Explorer</h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Package className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <GitBranch className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <div className="mb-2">
          <div className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-2 py-1">
            MY PROJECT
          </div>
        </div>
        {files.map(file => renderFileNode(file))}
      </div>
    </div>
  );
}