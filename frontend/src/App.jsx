import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import axios from "axios"
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("scira");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("https://ai-integrated-chatbot.onrender.com/api/query", {
        prompt,
        mode
      });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("❌ Error: " + err.message);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-light text-white">AI Query</h1>
          </div>
          <p className="text-slate-400 text-lg">Ask anything, get intelligent responses</p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700/50">
          <div className="space-y-6">
            {/* Textarea */}
            <div className="relative">
              <textarea
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                rows={4}
                placeholder="What would you like to know?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                Ctrl + Enter to submit
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <select 
                className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                value={mode} 
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="scira">Scira</option>
                <option value="deepseek">Deepseek</option>
                <option value="chain">Chain (Deepseek+Scira)</option>
              </select>

              <button
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center"
                onClick={handleSubmit}
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Response Section */}
        {(response || loading) && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <h2 className="text-xl font-medium text-white">Response</h2>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
              {loading ? (
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
                  Processing your request...
                </div>
              ) : (
                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
