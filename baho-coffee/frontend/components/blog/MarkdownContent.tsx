"use client";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown to HTML converter
  const convertMarkdown = (text: string): string => {
    if (!text) return "";

    // Split by lines
    const lines = text.split("\n");
    const processedLines: string[] = [];
    let inList = false;
    let listItems: string[] = [];
    let currentParagraph: string[] = [];
    let tableRows: string[] = [];
    let inTable = false;

    const processInline = (str: string) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
    };

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paraText = currentParagraph.join(" ").trim();
        if (paraText) {
          processedLines.push(`<p>${processInline(paraText)}</p>`);
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (inList && listItems.length > 0) {
        processedLines.push(`<ul>${listItems.join("")}</ul>`);
        listItems = [];
        inList = false;
      }
    };

    const flushTable = () => {
      if (inTable && tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1);
        const tableHtml = `
          <div class="my-8 overflow-x-auto">
            <table class="min-w-full prose-table:my-8 border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr class="bg-primary-50 dark:bg-primary-900/30 rounded-t-lg">
                  ${headerRow}
                </tr>
              </thead>
              <tbody>
                ${bodyRows.join("")}
              </tbody>
            </table>
          </div>
        `;
        processedLines.push(tableHtml);
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Skip empty lines
      if (!line.trim()) {
        flushParagraph();
        flushList();
        flushTable();
        continue;
      }

      // Check for markdown table (lines starting with |)
      if (line.trim().startsWith("|")) {
        flushParagraph();
        flushList();

        const cells = line
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        // Skip separator row (|---|---|)
        if (cells.every((c) => /^[-:]+$/.test(c))) {
          continue;
        }

        inTable = true;
        const isFirstTableRow = tableRows.length === 0;
        const cellTag = isFirstTableRow ? "th" : "td";
        const cellClass = isFirstTableRow
          ? "px-4 py-3 text-left font-semibold text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
          : "px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600";
        const rowHtml = `<tr>${cells.map((c) => `<${cellTag} class="${cellClass}">${processInline(c)}</${cellTag}>`).join("")}</tr>`;
        tableRows.push(rowHtml);
        continue;
      }
      if (inTable) {
        flushTable();
      }

      // Check for headers (must be at start of line)
      if (line.match(/^####\s+(.+)$/)) {
        flushParagraph();
        flushList();
        const content = line.replace(/^####\s+(.+)$/, "$1");
        processedLines.push(`<h4>${content}</h4>`);
        continue;
      }
      if (line.match(/^###\s+(.+)$/)) {
        flushParagraph();
        flushList();
        const content = line.replace(/^###\s+(.+)$/, "$1");
        processedLines.push(`<h3>${content}</h3>`);
        continue;
      }
      if (line.match(/^##\s+(.+)$/)) {
        flushParagraph();
        flushList();
        const content = line.replace(/^##\s+(.+)$/, "$1");
        processedLines.push(`<h2 class="!mt-10 !mb-4">${content}</h2>`);
        continue;
      }
      if (line.match(/^#\s+(.+)$/)) {
        flushParagraph();
        flushList();
        const content = line.replace(/^#\s+(.+)$/, "$1");
        processedLines.push(`<h1>${content}</h1>`);
        continue;
      }

      // Check for list items
      if (line.match(/^[-*]\s+(.+)$/)) {
        flushParagraph();
        if (!inList) {
          inList = true;
        }
        const listContent = line.replace(/^[-*]\s+(.+)$/, "$1");
        listItems.push(`<li>${processInline(listContent)}</li>`);
        continue;
      }

      // Regular text line
      flushList();
      currentParagraph.push(line);
    }

    // Flush any remaining content
    flushParagraph();
    flushList();
    flushTable();

    return processedLines.join("\n");
  };

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-ul:text-gray-700 dark:prose-ul:text-gray-300
        prose-ol:text-gray-700 dark:prose-ol:text-gray-300
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-a:text-primary-600 dark:prose-a:text-primary-400
        prose-a:no-underline hover:prose-a:underline
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2
        prose-p:leading-relaxed prose-p:mb-6 prose-p:mt-2
        prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
        prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
        prose-li:mb-2"
      dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
    />
  );
}
