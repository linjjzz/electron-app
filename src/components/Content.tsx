import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import { useFileContentStore } from 'src/store'


type Props = {}

const Content = (props: Props) => {
  // const [value, setValue] = useState("**Hello world!!!**");
  const content = useFileContentStore((state) => state.content)
  return (
    <MDEditor
      height="100%"
      visibleDragbar={false}
      value={content}
    // onChange={setValue}
    />
  )
}

export default Content