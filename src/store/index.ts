import { create } from "zustand";

interface fileContent {
  content: string
  updateContent: (newContent: string) => void
}

const useFileContentStore = create<fileContent>((set) => ({
  content: '',
  updateContent: (newContent) => set({ content: newContent }),
}))

export { useFileContentStore };

