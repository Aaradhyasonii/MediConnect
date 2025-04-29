import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MoreHorizontal, MessageCircle, Bot, User } from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on what you've described, these symptoms could be related to several conditions. I'd recommend scheduling an appointment with a doctor for proper evaluation.",
        "It's important to monitor these symptoms. If they worsen or persist for more than a few days, please consult a healthcare professional.",
        "Have you tried any over-the-counter medications for relief? While these might help with symptoms, it's still important to get a proper diagnosis.",
        "Your symptoms could be related to seasonal allergies, a common cold, or something else. A doctor can help determine the cause and recommend appropriate treatment.",
        "Would you like me to help you find a specialist who can address these specific symptoms?",
        "While I can provide general information, remember that I'm not a replacement for professional medical advice. Always consult with a healthcare provider for diagnosis and treatment."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'bot',
        text: randomResponse,
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 w-[380px] max-w-full h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 animate-slideUp">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center">
          <Bot size={20} className="mr-2" />
          <div>
            <h3 className="font-medium">AI Health Assistant</h3>
            <p className="text-xs text-blue-100">Powered by MediConnect AI</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-blue-200 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white border border-gray-200 rounded-tl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.type === 'bot' ? (
                  <Bot size={14} className="text-blue-600 mr-1" />
                ) : (
                  <User size={14} className="text-white mr-1" />
                )}
                <span 
                  className={`text-xs ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.type === 'user' ? 'You' : 'AI Assistant'} • {formatTime(message.timestamp)}
                </span>
              </div>
              <p 
                className={`text-sm ${
                  message.type === 'user' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {message.text}
              </p>
              <div className="flex justify-end">
                {message.type === 'bot' && (
                  <button className="text-gray-400 hover:text-gray-600 p-1 text-xs">
                    <MoreHorizontal size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center mb-4">
            <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none p-3 flex items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your health question..."
            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-sm max-h-24"
            rows={1}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-2 rounded-full ${
              inputText.trim() 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          For emergencies, please call 911 or your local emergency services immediately.
        </p>
      </div>
    </div>
  );
};

export default AIChat;