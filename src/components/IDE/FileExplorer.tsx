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
    const gitStatusColor = getGitStatusColor(metadata?.gitStatus);

    return (
      <div key={node.id}>
        <div
          className={`
            group flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md text-sm
            hover:bg-sidebar-accent transition-smooth
            ${isSelected ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' : 'text-sidebar-foreground'}
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
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {node.type === 'folder' && (
              <div className="flex items-center justify-center w-4 h-4">
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-3 w-3 transition-transform duration-200" />
                )}
              </div>
            )}
            {node.type === 'file' && <div className="w-4" />}
            
            {node.type === 'folder' ? (
              <>
                {isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-amber-400" />
                ) : (
                  <Folder className="h-4 w-4 text-amber-400" />
                )}
              </>
            ) : (
              <LanguageIcon fileName={node.name} showGlow={isSelected} />
            )}
            
            <span className={`truncate flex-1 ${gitStatusColor}`}>
              {node.name}
            </span>
            
            {metadata?.gitStatus && (
              <div className={`w-2 h-2 rounded-full ${getGitStatusColor(metadata.gitStatus)} bg-current opacity-60 group-hover:opacity-100 transition-opacity`} />
            )}
          </div>
          
          {showDetails && node.type === 'file' && metadata && (
            <div className="text-xs text-muted-foreground">
              {Math.round((metadata.size || 0) / 1024)}KB
            </div>
          )}
        </div>
        
        {node.type === 'folder' && isExpanded && node.children?.map(child => 
          renderFileNode(child, depth + 1)
        )}
      </div>
    );
  };

  const displayFiles = filteredFiles(files);

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-sidebar-foreground">Explorer</h2>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => setShowDetails(!showDetails)}
              title="Toggle details"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="New file">
              <Plus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="Git status">
              <GitBranch className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-7 text-xs bg-sidebar-accent/50 border-sidebar-border"
          />
        </div>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-2">
          <div className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
            <span>MY PROJECT</span>
            {searchQuery && (
              <span className="text-xs normal-case text-muted-foreground">
                {displayFiles.reduce((count, file) => count + (file.children?.length || 0) + 1, 0)} items
              </span>
            )}
          </div>
        </div>
        
        {displayFiles.length > 0 ? (
          displayFiles.map(file => renderFileNode(file))
        ) : (
          <div className="text-xs text-muted-foreground text-center py-4">
            {searchQuery ? 'No files found' : 'No files'}
          </div>
        )}
      </div>
    </div>
  );
}