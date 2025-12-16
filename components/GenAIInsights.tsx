import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2 } from 'lucide-react';
import { AccessLog } from '../types';
import { formatDate } from '../constants';

interface GenAIInsightsProps {
  logs: AccessLog[];
}

export const GenAIInsights: React.FC<GenAIInsightsProps> = ({ logs }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsight = async () => {
    if (!process.env.API_KEY) {
        setInsight("API Key not configured in environment.");
        return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare log summary for the prompt to save tokens/avoid huge payloads
      const recentLogs = logs.slice(0, 20); // Last 20 logs
      const logText = recentLogs.map(l => 
        `[${formatDate(l.timestamp)}] ${l.type === 'GUEST' ? 'Guest' : 'Staff'} visit for House ${l.houseNumber} (${l.residentName}) - Status: ${l.status}`
      ).join('\n');

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const prompt = `
        As a security expert, analyze these access logs for an estate. 
        Provide a very brief, bulleted summary of activity patterns, security anomalies (like denials), 
        and traffic flow. Keep it professional and under 100 words.
        
        Logs:
        ${logText}
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      setInsight(response.text);

    } catch (err) {
      console.error("Gemini Error:", err);
      setError("Unable to generate insights at this time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-security-800 to-security-900 rounded-xl p-6 text-white shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <Sparkles className="text-brand-accent" />
            <h3 className="text-lg font-semibold">Security Intelligence</h3>
        </div>
        {!insight && !loading && (
            <button 
                onClick={generateInsight}
                className="text-xs bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
                Generate Analysis
            </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-security-300 py-4">
            <Loader2 className="animate-spin" size={20} />
            <span>Analyzing patterns...</span>
        </div>
      )}

      {error && (
          <p className="text-red-300 text-sm">{error}</p>
      )}

      {insight && (
        <div className="prose prose-invert prose-sm">
            <div className="text-security-100 whitespace-pre-wrap leading-relaxed">
                {insight}
            </div>
            <button 
                onClick={() => setInsight(null)}
                className="mt-4 text-xs text-security-400 hover:text-white underline"
            >
                Clear
            </button>
        </div>
      )}
      
      {!insight && !loading && !error && (
          <p className="text-security-400 text-sm">
              Use AI to detect traffic anomalies and summary reports based on recent entry logs.
          </p>
      )}
    </div>
  );
};