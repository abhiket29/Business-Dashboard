import React, { useState } from 'react';

/**
 * Chatbot tab component with interactive chat interface
 * @returns {JSX.Element}
 */
const ChatbotTab = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your business assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: getBotResponse(inputMessage), 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sales')) {
      return "I can help you analyze your sales data. Your top-performing product shows strong growth trends. Would you like me to provide specific insights about any particular product?";
    } else if (lowerMessage.includes('profit')) {
      return "Looking at your profit margins, you have an average of 18% profit margin across all products. Your most profitable items are performing well above industry standards.";
    } else if (lowerMessage.includes('expense') || lowerMessage.includes('cost')) {
      return "I can help you analyze your expenses. Amazon fees and TE costs are your main expense categories. Would you like suggestions for cost optimization?";
    } else if (lowerMessage.includes('help')) {
      return "I can assist with sales analysis, profit calculations, expense tracking, and business insights. Just ask me about any specific metric or product!";
    } else if (lowerMessage.includes('recommendation') || lowerMessage.includes('suggest')) {
      return "Based on your data, I recommend focusing on products with profit margins above 18%. Consider optimizing the Amazon fees for better margins.";
    } else {
      return "That's an interesting question! I'm here to help with your business analytics and data insights. Feel free to ask about sales, profits, expenses, or any specific products.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Business Assistant Chatbot</h3>
        <p className="text-sm text-gray-500">Ask me anything about your business data and analytics</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            rows="1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotTab;