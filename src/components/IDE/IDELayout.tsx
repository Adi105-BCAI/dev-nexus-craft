import { useState, useCallback } from "react";
import { MenuBar } from "./MenuBar";
import { TopBar } from "./TopBar";
import { ActivityBar } from "./ActivityBar";
import { FileExplorer } from "./FileExplorer";
import { PanelContainer } from "./PanelContainer";
import { CodeEditor } from "./CodeEditor";
import { AIAssistant } from "./AIAssistant";
import { Terminal } from "./Terminal";

// Mock data
const initialTabs = [
  {
    id: "1",
    name: "main.py",
    path: "/src/main.py",
    isDirty: false,
    isActive: true,
  },
  {
    id: "2", 
    name: "README.md",
    path: "/README.md",
    isDirty: true,
    isActive: false,
  },
  {
    id: "3",
    name: "config.py",
    path: "/src/config.py", 
    isDirty: false,
    isActive: false,
  },
];

const fileStructure = [
  {
    id: "root",
    name: "my-project",
    type: "folder" as const,
    path: "/",
    children: [
      {
        id: "src",
        name: "src",
        type: "folder" as const,
        path: "/src",
        children: [
          {
            id: "main",
            name: "main.py",
            type: "file" as const,
            path: "/src/main.py",
          },
          {
            id: "config",
            name: "config.py",
            type: "file" as const,
            path: "/src/config.py",
          },
          {
            id: "utils",
            name: "utils.py",
            type: "file" as const,
            path: "/src/utils.py",
          },
        ],
      },
      {
        id: "docs",
        name: "docs",
        type: "folder" as const,
        path: "/docs",
        children: [
          {
            id: "readme",
            name: "README.md",
            type: "file" as const,
            path: "/README.md",
          },
        ],
      },
      {
        id: "package",
        name: "package.json",
        type: "file" as const,
        path: "/package.json",
      },
    ],
  },
];

const fileContents: Record<string, { content: string; language: string }> = {
  "/src/main.py": {
    content: `import os
import sys
from config import DATABASE_URL, DEBUG_MODE

def main():
    """Main application entry point."""
    print("Starting application...")
    
    if DEBUG_MODE:
        print(f"Debug mode enabled")
        print(f"Database URL: {DATABASE_URL}")
    
    # Initialize database connection
    try:
        connect_to_database()
        print("✓ Database connection established")
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        sys.exit(1)
    
    # Start the application server
    start_server()

def connect_to_database():
    """Connect to the database."""
    # TODO: Implement database connection
    pass

def start_server():
    """Start the application server."""
    print("🚀 Server started on http://localhost:8000")

if __name__ == "__main__":
    main()`,
    language: "python",
  },
  "/README.md": {
    content: `# My Project

This is a modern Python application with the following features:

## Features

- **Database Integration**: Connects to PostgreSQL database
- **Configuration Management**: Environment-based configuration
- **Error Handling**: Comprehensive error handling and logging
- **Testing**: Unit tests with pytest

## Installation

\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Usage

\`\`\`bash
python src/main.py
\`\`\`

## Configuration

Create a \`.env\` file with:

\`\`\`
DATABASE_URL=postgresql://user:pass@localhost/db
DEBUG_MODE=true
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request`,
    language: "markdown",
  },
  "/src/config.py": {
    content: `import os
from typing import Optional

# Database configuration
DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///app.db")

# Application settings
DEBUG_MODE: bool = os.getenv("DEBUG_MODE", "false").lower() == "true"
SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")

# Server configuration
HOST: str = os.getenv("HOST", "localhost")
PORT: int = int(os.getenv("PORT", "8000"))

class Config:
    """Application configuration class."""
    
    def __init__(self):
        self.database_url = DATABASE_URL
        self.debug = DEBUG_MODE
        self.secret_key = SECRET_KEY
        self.host = HOST
        self.port = PORT
    
    def validate(self) -> bool:
        """Validate configuration settings."""
        if not self.secret_key or self.secret_key == "dev-secret-key":
            if not self.debug:
                raise ValueError("SECRET_KEY must be set in production")
        
        return True`,
    language: "python",
  },
};

const initialMessages = [
  {
    id: "1",
    role: "assistant" as const,
    content: "Hello! I'm your AI assistant. I can help you with code review, debugging, and development tasks. What would you like to work on?",
    agent: "Builder",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2", 
    role: "user" as const,
    content: "Can you help me review the main.py file? I want to make sure the error handling is robust.",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "3",
    role: "assistant" as const,
    content: `I've reviewed your main.py file. Here are some suggestions for improving error handling:

1. **Specific Exception Handling**: Consider catching specific exceptions instead of using a broad Exception catch.

2. **Logging**: Add proper logging instead of print statements:
\`\`\`python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
\`\`\`

3. **Graceful Shutdown**: Add signal handlers for graceful shutdown.

4. **Retry Logic**: Consider adding retry logic for database connections.

Would you like me to show you the improved version?`,
    agent: "Validator", 
    timestamp: new Date(Date.now() - 180000),
  },
];

const initialTerminalLines = [
  {
    id: "1",
    type: "command" as const,
    content: "python main.py",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2",
    type: "output" as const,
    content: "Starting application...",
    timestamp: new Date(Date.now() - 119000),
  },
  {
    id: "3",
    type: "output" as const,
    content: "Debug mode enabled",
    timestamp: new Date(Date.now() - 118000),
  },
  {
    id: "4",
    type: "success" as const,
    content: "Database connection established",
    timestamp: new Date(Date.now() - 117000),
  },
  {
    id: "5",
    type: "success" as const,
    content: "🚀 Server started on http://localhost:8000",
    timestamp: new Date(Date.now() - 116000),
  },
  {
    id: "6",
    type: "command" as const,
    content: "python test_config.py",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "7",
    type: "error" as const,
    content: "Configuration validation failed",
    timestamp: new Date(Date.now() - 59000),
  },
];

export function IDELayout() {
  const [tabs, setTabs] = useState(initialTabs);
  const [selectedFile, setSelectedFile] = useState("/src/main.py");
  const [messages, setMessages] = useState(initialMessages);
  const [terminalLines, setTerminalLines] = useState(initialTerminalLines);
  const [activePanel, setActivePanel] = useState("explorer");

  const handleTabClick = useCallback((tabId: string) => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setSelectedFile(tab.path);
    }
  }, [tabs]);

  const handleTabClose = useCallback((tabId: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      if (newTabs.length > 0 && !newTabs.some(tab => tab.isActive)) {
        newTabs[0].isActive = true;
        setSelectedFile(newTabs[0].path);
      }
      return newTabs;
    });
  }, []);

  const handleFileSelect = useCallback((filePath: string) => {
    setSelectedFile(filePath);
    
    // Check if file is already open in a tab
    const existingTab = tabs.find(tab => tab.path === filePath);
    if (existingTab) {
      handleTabClick(existingTab.id);
    } else {
      // Create new tab
      const fileName = filePath.split('/').pop() || 'untitled';
      const newTab = {
        id: Date.now().toString(),
        name: fileName,
        path: filePath,
        isDirty: false,
        isActive: true,
      };
      
      setTabs(prev => [
        ...prev.map(tab => ({ ...tab, isActive: false })),
        newTab
      ]);
    }
  }, [tabs, handleTabClick]);

  const handleSendMessage = useCallback((message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I understand your request. Let me analyze the code and provide suggestions.",
        agent: "Builder",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  }, []);

  const handleCommand = useCallback((command: string) => {
    const newCommand = {
      id: Date.now().toString(),
      type: "command" as const,
      content: command,
      timestamp: new Date(),
    };
    
    setTerminalLines(prev => [...prev, newCommand]);
    
    // Simulate command output
    setTimeout(() => {
      const output = {
        id: (Date.now() + 1).toString(),
        type: "output" as const,
        content: `Executing: ${command}`,
        timestamp: new Date(),
      };
      setTerminalLines(prev => [...prev, output]);
    }, 100);
  }, []);

  const handlePanelChange = useCallback((panelId: string) => {
    setActivePanel(panelId);
  }, []);

  const activeTab = tabs.find(tab => tab.isActive);
  const currentFile = selectedFile && fileContents[selectedFile];

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <MenuBar />
      <TopBar 
        tabs={tabs}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar 
          activePanel={activePanel}
          onPanelChange={handlePanelChange}
        />
        
        {activePanel === "explorer" ? (
          <FileExplorer
            files={fileStructure}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        ) : (
          <PanelContainer
            activePanel={activePanel}
            files={fileStructure}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentFile ? (
            <CodeEditor
              content={currentFile.content}
              language={currentFile.language}
              fileName={activeTab?.name || "untitled"}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-editor-background">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Welcome to Modern IDE</h2>
                <p className="text-muted-foreground">Select a file to start editing</p>
              </div>
            </div>
          )}
          
          <Terminal
            lines={terminalLines}
            onCommand={handleCommand}
          />
        </div>
        
        <AIAssistant
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}