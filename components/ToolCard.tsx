import React, { useState } from 'react';
import { ToolConfig, ToolType } from '../types';
import { generateAIResponse } from '../services/geminiService';

interface ToolCardProps {
  config: ToolConfig;
}

const ToolCard: React.FC<ToolCardProps> = ({ config }) => {
  // ES6 Feature: Destructuring from useState hook
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setOutput(''); // Clear previous output

    try {
      // ES6 Feature: Async/Await for cleaner promise handling
      const result = await generateAIResponse(config.id, input);
      setOutput(result);
    } catch (error) {
      setOutput('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter for better UX
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
            {config.icon}
          </div>
          <h2 className="text-lg font-bold text-slate-800">{config.title}</h2>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <div>
          <label htmlFor={`input-${config.id}`} className="sr-only">Input</label>
          <textarea
            id={`input-${config.id}`}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none text-slate-700 text-sm placeholder:text-slate-400"
            rows={config.id === ToolType.SUMMARIZE ? 4 : 3}
            placeholder={config.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all
            ${loading || !input.trim() 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700 active:scale-[0.98]'
            } flex justify-center items-center space-x-2`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>{config.buttonText}</span>
              {/* ES6 Feature: Template Literals not strictly needed here but conceptually present in JSX */}
            </>
          )}
        </button>

        {/* Output Section */}
        {output && (
          <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xs font-bold text-primary-800 uppercase tracking-wider mb-2">
              Gemini Result:
            </h3>
            <div className="prose prose-sm prose-primary max-w-none text-slate-700 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolCard;