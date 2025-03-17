"use client";
import mammoth from "mammoth";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, FileDown, FileUp, Settings, Printer } from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Numbering,
  LevelFormat,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  HorizontalPosition,
  convertInchesToTwip,
} from "docx";
import DocumentEditor from "./document-editor";

export default function DocumentPage() {
  const [documentContent, setDocumentContent] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("Untitled Document");

  const handleSave = () => {
    // In a real app, this would save to a database or file system
    console.log("Saving document:", documentContent);
    alert("Document saved!");
  };

  const handleExport = async () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = documentContent;
    const children: (Paragraph | Table)[] = [];

    // Helper: Parse inline elements
    const parseInlineElements = (parentNode: ChildNode): TextRun[] => {
      const inlineChildren: TextRun[] = [];

      parentNode.childNodes.forEach((child) => {
        if (child.nodeName === "BR") {
          inlineChildren.push(new TextRun({ break: 1 }));
        } else if (child.nodeType === 3) {
          // Text node
          inlineChildren.push(
            new TextRun({
              text: child.textContent || "",
              font: "Arial",
              size: 24,
            })
          );
        } else if (child.nodeType === 1) {
          const element = child as HTMLElement;
          const textContent = element.textContent || "";
          const style = element.style;
          const color = style?.color?.replace(/^rgb\((.+)\)$/, (_, c) => {
            const [r, g, b] = c.split(",").map(Number);
            return `#${((1 << 24) + (r << 16) + (g << 8) + b)
              .toString(16)
              .slice(1)}`;
          });

          inlineChildren.push(
            new TextRun({
              text: textContent,
              bold: ["STRONG", "B"].includes(child.nodeName),
              italics: ["EM", "I"].includes(child.nodeName),
              underline: child.nodeName === "U" ? {} : undefined,
              strike: ["S", "STRIKE"].includes(child.nodeName),
              color: color,
              font: "Arial",
              size: 24,
            })
          );
        }
      });

      return inlineChildren;
    };

    // Main parsing logic
    tempElement.childNodes.forEach((node) => {
      const nodeName = node.nodeName;

      if (/^H[1-6]$/.test(nodeName)) {
        const headingLevel = Number(nodeName[1]);
        children.push(
          new Paragraph({
            children: parseInlineElements(node),
            heading: `Heading${headingLevel}`,
            spacing: { after: 300 },
          })
        );
      } else if (nodeName === "P") {
        children.push(
          new Paragraph({
            children: parseInlineElements(node),
            spacing: { after: 300 },
          })
        );
      } else if (nodeName === "UL" || nodeName === "OL") {
        const isOrdered = nodeName === "OL";
        node.childNodes.forEach((li) => {
          if (li.nodeName === "LI") {
            children.push(
              new Paragraph({
                children: parseInlineElements(li),
                numbering: {
                  reference: isOrdered ? "ordered-list" : "unordered-list",
                  level: 0,
                },
              })
            );
          }
        });
      } else if (nodeName === "HR") {
        // ✅ Proper Horizontal Line rendering
        children.push(
          new Paragraph({
            children: [new TextRun("")], // Adding empty content to ensure line is drawn
            border: {
              bottom: { color: "000000", space: 1, value: "single", size: 6 },
            },
            spacing: { after: 300 },
          })
        );
      } else if (nodeName === "TABLE") {
        const rows: TableRow[] = [];
        node.querySelectorAll("tr").forEach((tr) => {
          const cells: TableCell[] = [];
          tr.querySelectorAll("td, th").forEach((cell) => {
            cells.push(
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseInlineElements(cell),
                  }),
                ],
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "000000",
                  },
                  left: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                  right: {
                    style: BorderStyle.SINGLE,
                    size: 2,
                    color: "000000",
                  },
                },
                width: { size: 50, type: WidthType.PERCENTAGE },
              })
            );
          });
          rows.push(new TableRow({ children: cells }));
        });

        children.push(
          new Table({
            rows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          })
        );
      }
    });

    // ✅ Construct the document
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "ordered-list",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
          {
            reference: "unordered-list",
            levels: [
              {
                level: 0,
                format: "bullet",
                text: "•",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(1),
                right: convertInchesToTwip(1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(1),
              },
            },
          },
          children,
        },
      ],
    });

    // ✅ Export as DOCX
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Exported-Document.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ✅ Helper to export document as DOCX file
  const exportDocument = async (doc: Document) => {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Exported-Document.docx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    mammoth
      .convertToHtml(
        { arrayBuffer },
        {
          styleMap: ["p.Heading1 => hr"],
        }
      )
      .then(function (result) {
        console.log(result.value); // HTML content
        // Set this content into Tiptap or any other editor
        setDocumentContent(result.value);
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      });

    // const reader = new FileReader()
    // reader.onload = (event) => {
    //   const content = event.target?.result as string
    //   setDocumentContent(content)
    //   setDocumentName(file.name.replace(/\.[^/.]+$/, ""))
    // }
    // reader.readAsText(file)
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">{documentName}</h1>
          <input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            aria-label="Document name"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>

          <label className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <span>
                <FileUp className="w-4 h-4 mr-2" />
                Import
              </span>
            </Button>
            <input type="file" className="hidden" onChange={handleImport} />
          </label>

          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>

          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>
      <main className="flex-1 px-4 bg-gray-100  mx-auto w-full max-w-7xl">
        <Card className="h-full p-0">
          <CardContent className="p-0 h-full overflow-auto">
            <DocumentEditor
              content={documentContent}
              onChange={setDocumentContent}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
