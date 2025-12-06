import React from 'react';
import Layout from './components/Layout';
import ToolCard from './components/ToolCard';
import { ToolConfig, ToolType } from './types';

// Configuration for our 4 AI features
// Using an array of objects to map over makes the code DRY (Don't Repeat Yourself)
const TOOLS: ToolConfig[] = [
  {
    id: ToolType.ASK,
    title: "Ask Me Anything",
    description: "Have a burning question? Ask AI anything from history to science.",
    placeholder: "e.g., Why is the sky blue?",
    buttonText: "Ask Gemini",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: ToolType.SUMMARIZE,
    title: "Text Summarizer",
    description: "Paste a long paragraph or article, and get a concise summary instantly.",
    placeholder: "Paste your text here (e.g., a news article, an email)...",
    buttonText: "Summarize Text",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    )
  },
  {
    id: ToolType.IDEAS,
    title: "Idea Generator",
    description: "Stuck? Get creative ideas for blog posts, stories, or projects.",
    placeholder: "e.g., Blog post ideas about healthy eating...",
    buttonText: "Spark Ideas",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: ToolType.DEFINE,
    title: "Definition Finder",
    description: "Don't know a word? Get a simple, clear definition with examples.",
    placeholder: "e.g., Serendipity, Quantum Computing...",
    buttonText: "Get Definition",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
];

const App: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Unleash Your Creativity
          </h2>
          <p className="text-lg text-slate-600">
            Select a tool below to experience the power of the Gemini 2.5 Flash model. 
            Built with modern React and TypeScript.
          </p>
        </div>

        {/* ES6 Feature: .map() used to render the list of tools efficiently */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} config={tool} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default App;