import { useRef, useEffect } from "react";

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r\n/g, "\n").trim();

  // Fix malformed labels like "Label] -->" to "[Label] -->"
  clean = clean.replace(/(\w[^[\]]*)\] -->/g, '[$1] -->');

  // Apply auto-fix for nodes
  clean = autoFixNodes(clean);

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }
  return clean;
};

const autoFixNodes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim();
    if (used.has(key)) {
      return used.get(key);
    }

    index++;
    const id = `N${index}`;
    const node = `${id}["${key}]`;

    used.set(key, node);
    return node;
  });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "default" });

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const safeChart = cleanMermaidChart(diagram);
        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);
        containerRef.current.innerHTML = `<pre class="text-sm text-gray-700 whitespace-pre-wrap">${diagram}</pre>`;
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
}

export default MermaidSetup;
