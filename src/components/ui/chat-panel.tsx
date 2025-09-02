import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

import { Button } from "./button";
import { Textarea } from "./textarea";
import { Card } from "./card";

interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatPanel({ isOpen, onToggle }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{
      id: string;
      message: string;
      isUser: boolean;
      timestamp: Date;
    }>
  >([
    {
      id: "1",
      message:
        "Hello! I'm your AI workflow assistant. I can help you create, modify, and optimize your workflows. What would you like to do?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response (in production, this would call an actual AI service)
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(message.trim()),
        isUser: false,
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("add") && lowerMessage.includes("node")) {
      return "I can help you add nodes! What type of node would you like to add? You can choose from Trigger, Condition, or Action nodes.";
    } else if (
      lowerMessage.includes("connect") ||
      lowerMessage.includes("edge")
    ) {
      return "To connect nodes, simply drag from a source handle to a target handle. The connection will automatically create an edge between the nodes.";
    } else if (
      lowerMessage.includes("delete") ||
      lowerMessage.includes("remove")
    ) {
      return "To delete a node, right-click on it and select 'Delete' or use the delete button in the node's toolbar. This will also remove any connected edges.";
    } else if (
      lowerMessage.includes("trigger") ||
      lowerMessage.includes("condition") ||
      lowerMessage.includes("action")
    ) {
      return "Great question! Here's how these node types work:\n• Triggers: Start workflows (e.g., vehicle detection)\n• Conditions: Make decisions (e.g., is vehicle registered?)\n• Actions: Execute tasks (e.g., open gate, send notification)";
    } else if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      return "I'm here to help! You can ask me about:\n• Adding/removing nodes\n• Connecting nodes\n• Understanding node types\n• Workflow best practices\n• Troubleshooting issues";
    } else {
      return (
        "I understand you're asking about '" +
        userMessage +
        "'. Let me help you with that. Could you provide more details about what you'd like to accomplish with your workflow?"
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        size="icon"
        className="h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={onToggle}
        aria-label="Open AI Chat"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 h-[500px] shadow-xl border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="font-medium text-sm">AI Workflow Assistant</h3>
        </div>
        <Button
          size="icon"
          variant="secondary"
          onClick={onToggle}
          className="h-8 w-8"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto h-[380px] space-y-3">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${chat.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                chat.isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about workflows..."
            className="pr-16 resize-none"
            rows={3}
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="absolute bottom-2 right-2 h-8 px-3"
            aria-label="Send message"
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
