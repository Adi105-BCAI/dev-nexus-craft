import { GitBranch, FileText, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  currentFile?: string;
  language?: string;
  line?: number;
  column?: number;
  encoding?: string;
  gitBranch?: string;
  hasErrors?: boolean;
  hasWarnings?: boolean;
  indentation?: string;
}

export function StatusBar({
  currentFile,
  language = "plaintext",
  line = 1,
  column = 1,
  encoding = "UTF-8",
  gitBranch = "main",
  hasErrors = false,
  hasWarnings = false,
  indentation = "Spaces: 2"
}: StatusBarProps) {
  return (
    <div className="h-6 bg-[hsl(var(--accent))] border-t border-border flex items-center justify-between px-2 text-xs text-muted-foreground">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Git branch */}
        <div className="flex items-center space-x-1 hover:bg-accent/50 px-1 rounded cursor-pointer">
          <GitBranch className="w-3 h-3" />
          <span>{gitBranch}</span>
        </div>
        
        {/* File status */}
        {currentFile && (
          <div className="flex items-center space-x-1">
            <FileText className="w-3 h-3" />
            <span className="truncate max-w-[200px]">{currentFile}</span>
          </div>
        )}
        
        {/* Errors and warnings */}
        <div className="flex items-center space-x-2">
          {hasErrors && (
            <div className="flex items-center space-x-1 text-destructive hover:bg-accent/50 px-1 rounded cursor-pointer">
              <AlertCircle className="w-3 h-3" />
              <span>1</span>
            </div>
          )}
          {hasWarnings && (
            <div className="flex items-center space-x-1 text-yellow-500 hover:bg-accent/50 px-1 rounded cursor-pointer">
              <Activity className="w-3 h-3" />
              <span>2</span>
            </div>
          )}
          {!hasErrors && !hasWarnings && (
            <div className="flex items-center space-x-1 text-green-500">
              <CheckCircle2 className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Line and column */}
        <div className="hover:bg-accent/50 px-1 rounded cursor-pointer">
          <span>Ln {line}, Col {column}</span>
        </div>
        
        {/* Indentation */}
        <div className="hover:bg-accent/50 px-1 rounded cursor-pointer">
          <span>{indentation}</span>
        </div>
        
        {/* Encoding */}
        <div className="hover:bg-accent/50 px-1 rounded cursor-pointer">
          <span>{encoding}</span>
        </div>
        
        {/* Language mode */}
        <div className="hover:bg-accent/50 px-1 rounded cursor-pointer">
          <span className="capitalize">{language}</span>
        </div>
      </div>
    </div>
  );
}