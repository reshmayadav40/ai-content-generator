import React from 'react';

// ES6 Feature: Exporting interfaces helps modularize code
export interface AIResponse {
  text: string;
  error?: string;
}

export enum ToolType {
  ASK = 'ASK',
  SUMMARIZE = 'SUMMARIZE',
  IDEAS = 'IDEAS',
  DEFINE = 'DEFINE'
}

export interface ToolConfig {
  id: ToolType;
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  icon: React.ReactNode;
}