import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useState } from "react"
// import "./document-editor.css"
import { EditorToolbar } from "./editor-toolbar"

interface DocumentEditorProps {
    content?: string
    onChange?: (html: string) => void
    readOnly?: boolean
  }

export default function DocumentEditor({
    content ,
    onChange,
    readOnly = false,
  }: DocumentEditorProps) {
    const [editorContent, setEditorContent] = useState("")
  
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Link.configure({
          openOnClick: false,
        }),
        Image,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TableHeader,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Placeholder.configure({
          placeholder: "Start typing...",
        }),
      ],
      content: editorContent,
      editable: !readOnly, 
      onUpdate: ({ editor }) => { 
        const html = editor.getHTML() 
        setEditorContent(html)
        if (onChange) {
          onChange(html)
        }
      },
    },[editorContent])
    useEffect(() => {
      setEditorContent(content || "")
    }, [content])
  
    return (
      <div className="flex flex-col justify-between border border-[#e0e0e0] rounded shadow-md bg-white h-full min-h-[600px]">
        {!readOnly && editor && <EditorToolbar editor={editor} />}
        <div className="p-4">
          <EditorContent editor={editor} className="document-editor-content p-4" />
        </div>
        {!readOnly && (
          <div className="flex justify-between px-3 py-1 bg-gray-100 border-t border-gray-300 text-xs text-gray-600">
            <div className="word-count">Words: {editorContent.split(/\s+/).filter(Boolean).length}</div>
            <div className="document-modified">Last modified: {new Date().toLocaleString()}</div>
          </div>
        )}
      </div>
    )
  }
  
  