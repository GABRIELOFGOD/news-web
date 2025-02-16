"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface EditorContextType {
  blog: BlogStructure;
  setBlog: (blog: BlogStructure) => void;
  textEditor: TextEditorState;
  setTextEditor: (textEditor: TextEditorState) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export interface BlogStructure {
  title: string;
  content: any[];
  banner: string;
  tags: string[];
  desc: string;
}

export interface TextEditorState {
  isReady: boolean;
}

export const EditorContextProvider = ({ children }: { children: ReactNode }) => {
  const [blog, setBlog] = useState<BlogStructure>({ title: "", content: [], banner: "", tags: [], desc: "" });
  const [textEditor, setTextEditor] = useState<TextEditorState>({
    isReady: false,
  });
  
  return <EditorContext.Provider value={{
    blog, setBlog,
    textEditor, setTextEditor,
  }}>{children}</EditorContext.Provider>;
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorContextProvider");
  }
  return context;
}
