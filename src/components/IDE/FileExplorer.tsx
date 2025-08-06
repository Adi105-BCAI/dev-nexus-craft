import { useState } from "react";
import { 
  Folder, 
  FolderOpen, 
  Package,
  GitBranch,
  ChevronRight,
  ChevronDown,
  Search,
  MoreHorizontal,
  Plus,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageIcon } from "./LanguageIcon";
import { Input } from "@/components/ui/input";

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

interface FileMetadata {
  lastModified?: Date;
  size?: number;
  gitStatus?: 'modified' | 'added' | 'deleted' | 'untracked';
}

const getGitStatusColor = (status?: string) => {
  switch (status) {
    case 'modified': return 'text-amber-400';
    case 'added': return 'text-green-400';
    case 'deleted': return 'text-red-400';
    case 'untracked': return 'text-blue-400';
    default: return '';
  }
};

export function FileExplorer({ files, selectedFile, onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  // Mock file metadata
  const fileMetadata: Record<string, FileMetadata> = {
    '/src/main.py': { 
      lastModified: new Date(Date.now() - 120000), 
      size: 2048, 
      gitStatus: 'modified' 
    },
    '/README.md': { 
      lastModified: new Date(Date.now() - 300000), 
      size: 1024, 
      gitStatus: 'added' 
    },
    '/src/config.py': { 
      lastModified: new Date(Date.now() - 600000), 
      size: 512 
    },
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const filteredFiles = (nodes: FileNode[]): FileNode[] => {
    if (!searchQuery) return nodes;
    
    return nodes.filter(node => {
      if (node.type === 'folder') {
        const hasMatchingChildren = node.children && filteredFiles(node.children).length > 0;
        return node.name.toLowerCase().includes(searchQuery.toLowerCase()) || hasMatchingChildren;
      }
      return node.name.toLowerCase().includes(searchQuery.toLowerCase());
    }).map(node => ({
      ...node,
      children: node.children ? filteredFiles(node.children) : undefined
    }));
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedFile === node.path;
    const metadata = fileMetadata[node.path];
    const gitStatus = metadata?.gitStatus;
    const paddingLeft = `${depth * 16 + 8}px`;

    return (
      <div key={node.id}>
        <div
          className={`
            flex items-center py-0.5 px-2 text-xs cursor-pointer hover:bg-accent/60 rounded transition-colors group
            ${isSelected ? 'bg-accent text-accent-foreground' : ''}
          `}
          style={{ paddingLeft }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          {/* Folder icon or chevron */}
          {node.type === 'folder' ? (
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 mr-1 text-muted-foreground group-hover:text-foreground transition-colors" />
              ) : (
                <ChevronRight className="w-3 h-3 mr-1 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
              <FolderOpen className="w-3.5 h-3.5 mr-2 text-blue-400" />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-4 mr-1" /> {/* Spacer for alignment */}
              <LanguageIcon fileName={node.name} className="w-3.5 h-3.5 mr-2" />
            </div>
          )}

          {/* File/folder name */}
          <span className="flex-1 truncate text-sidebar-foreground group-hover:text-foreground transition-colors">{node.name}</span>

          {/* Git status */}
          {gitStatus && (
            <span className="ml-2 text-xs text-orange-400 font-semibold bg-orange-400/10 px-1 rounded">
              {gitStatus === 'modified' ? 'M' : gitStatus === 'added' ? 'U' : gitStatus}
            </span>
          )}
        </div>

        {/* Render children if folder is expanded */}
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => (
              renderFileNode(child, depth + 1)
            ))}
          </div>
        )}
      </div>
    );
  };

  const displayFiles = filteredFiles(files);

  return (
    <div className="w-60 bg-sidebar-background border-r border-sidebar-border h-full flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-border">
        <h2 className="text-xs font-medium text-sidebar-foreground flex items-center gap-2 uppercase tracking-wide">
          <FolderOpen className="w-3.5 h-3.5" />
          Explorer
        </h2>
        
        {/* Search Input */}
        <div className="mt-2 relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-7 text-xs bg-background/50 border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50"
          />
        </div>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-y-auto px-1 py-1">
        {displayFiles.map(file => renderFileNode(file))}
      </div>

      {/* Stats */}
      <div className="px-3 py-2 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {displayFiles.reduce((count, file) => count + (file.children?.length || 0) + 1, 0)} files
        </div>
      </div>
    </div>
  );
}