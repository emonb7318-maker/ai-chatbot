import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatbotWebsite() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I am your AI chatbot. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("my name is")) {
      const n = msg.replace("my name is", "").trim();
      setName(n);
      return "Nice to meet you " + n + " 😊";
    }

    if (msg.includes("what is my name")) {
      return name ? "Your name is " + name : "I don't know your name yet!";
    }

    if (msg.includes("hello") || msg.includes("hi")) {
      return name ? "Hello " + name + " 👋" : "Hello 👋";
    }

    if (msg.includes("how are you")) return "I'm doing great 🤖";
    if (msg.includes("joke")) return "Why did the computer get cold? Because it left its Windows open 😂";
    if (msg.includes("bye")) return "Goodbye 👋";

    return "Hmm 🤔 I am still learning that.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    const reply = getReply(input);

    setMessages([...newMessages, { sender: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardContent className="p-4">
          <h1 className="text-xl font-bold mb-3">🤖 Smart AI Chatbot</h1>

          <div className="h-80 overflow-y-auto bg-black p-3 rounded mb-3">
            {messages.map((m, i) => (
              <div key={i} className="mb-2">
                <b>{m.sender === "user" ? "You" : "AI"}:</b> {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              className="text-black"
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
