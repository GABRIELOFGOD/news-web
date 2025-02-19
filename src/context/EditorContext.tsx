"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { NewsStatus } from "@/models/newsTypes";
import { Category } from "@/models/categoryTypes";

interface EditorContextType {
  blog: BlogStructure;
  setBlog: (blog: BlogStructure) => void;
  textEditor: EditorJS | null;
  setTextEditor: (textEditor: EditorJS | null) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  editorReady: boolean;
  setEditorReady: (ready: boolean) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export interface BlogStructure {
  title: string;
  content: any[];
  banner: File | null;
  tags: string[];
  desc: string;
  state: NewsStatus;
}

export const EditorContextProvider = ({ children }: { children: ReactNode }) => {
  const [blog, setBlog] = useState<BlogStructure>({ title: "", content: [], banner: null, tags: [], desc: "", state: NewsStatus.DRAFT });
  const [textEditor, setTextEditor] = useState<EditorJS | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editorReady, setEditorReady] = useState<boolean>(false);
  
  return <EditorContext.Provider value={{
    blog, setBlog,
    textEditor, setTextEditor,
    categories, setCategories,
    editorReady, setEditorReady
  }}>{children}</EditorContext.Provider>;
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorContextProvider");
  }
  return context;
}
