"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect, useCallback } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
}

/* Simple HTML → Markdown converter (good enough for blog posts) */
function htmlToMarkdown(html: string): string {
  if (!html || html === "<p></p>") return "";
  let md = html;

  // Headings
  md = md.replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, (_, level, text) => {
    const clean = text.replace(/<[^>]+>/g, "").trim();
    return `${"#".repeat(Number(level))} ${clean}`;
  });

  // Bold
  md = md.replace(/<(strong|b)>(.*?)<\/\1>/gi, "**$2**");

  // Italic
  md = md.replace(/<(em|i)>(.*?)<\/\1>/gi, "*$2*");

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, text) => {
    return `\n\`\`\`\n${text.replace(/<[^>]+>/g, "")}\n\`\`\`\n`;
  });

  // Inline code
  md = md.replace(/<code>(.*?)<\/code>/gi, "`$1`");

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, text) => {
    return text
      .replace(/<[^>]+>/g, "")
      .split("\n")
      .map((l: string) => `> ${l}`)
      .join("\n");
  });

  // Unordered lists
  md = md.replace(/<li>(.*?)<\/li>/gi, "- $1");

  // Paragraphs
  md = md.replace(/<p[^>]*>/gi, "\n");
  md = md.replace(/<\/p>/gi, "\n");

  // Horizontal rules
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n");

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode entities
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, "\n\n");
  return md.trim();
}

/* Simple Markdown → HTML (for initial load) */
function markdownToHtml(md: string): string {
  if (!md) return "";
  let html = md;

  // Code blocks (before other transforms)
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Inline code (but not inside pre/code blocks)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*?<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Paragraphs — wrap lines that aren't already tags
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  // Line breaks inside paragraphs
  html = html.replace(/\n/g, "<br />");

  return html;
}

/* ── Toolbar ── */
function Toolbar({
  editor,
}: {
  editor: ReturnType<typeof useEditor> | null;
}) {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `rte-btn${active ? " rte-btn-active" : ""}`;

  const groups = [
    [
      {
        label: "B",
        title: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
      },
      {
        label: "I",
        title: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
      },
      {
        label: "</>",
        title: "Code",
        action: () => editor.chain().focus().toggleCode().run(),
        active: editor.isActive("code"),
      },
    ],
    [
      {
        label: "H1",
        title: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
      },
      {
        label: "H2",
        title: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
      },
      {
        label: "H3",
        title: "Heading 3",
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        active: editor.isActive("heading", { level: 3 }),
      },
    ],
    [
      {
        label: "UL",
        title: "Listă",
        action: () => editor.chain().focus().toggleBulletList().run(),
        active: editor.isActive("bulletList"),
      },
      {
        label: "OL",
        title: "Listă numerotată",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        active: editor.isActive("orderedList"),
      },
      {
        label: "❝",
        title: "Citat",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        active: editor.isActive("blockquote"),
      },
    ],
    [
      {
        label: "—",
        title: "Linie orizontală",
        action: () => editor.chain().focus().setHorizontalRule().run(),
        active: false,
      },
      {
        label: "🖼",
        title: "Imagine",
        action: () => {
          const url = window.prompt("URL imagine:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        },
        active: false,
      },
      {
        label: "🔗",
        title: "Link",
        action: () => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = window.prompt("URL link:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        },
        active: editor.isActive("link"),
      },
    ],
  ];

  return (
    <div className="rte-toolbar">
      {groups.map((group, gi) => (
        <div key={gi} className="rte-toolbar-group">
          {group.map((item) => (
            <button
              key={item.title}
              type="button"
              title={item.title}
              className={btnClass(item.active)}
              onMouseDown={(e) => {
                e.preventDefault();
                item.action();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Main Editor Component ── */
export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Scrie conținutul aici...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content: markdownToHtml(content),
    editorProps: {
      attributes: {
        class: "rte-content",
      },
    },
    onUpdate: ({ editor: ed }) => {
      const md = htmlToMarkdown(ed.getHTML());
      onChange(md);
    },
  });

  // Sync external content changes (e.g., when post data loads)
  const syncContent = useCallback(() => {
    if (editor && !editor.isFocused) {
      const currentMd = htmlToMarkdown(editor.getHTML());
      if (currentMd !== content) {
        editor.commands.setContent(markdownToHtml(content));
      }
    }
  }, [editor, content]);

  useEffect(() => {
    syncContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <div className="rte-wrapper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
