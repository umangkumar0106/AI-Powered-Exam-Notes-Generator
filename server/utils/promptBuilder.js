export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
    You are a STRICT JSON generator for an exam preparation system.

    ⚠️ VERY IMPORTANT:
    - Output MUST be valid JSON
    - Your response will cause system failure
    - INVALID JSON will cause system failure
    - Use ONLY double quotes "
    - NO comments, NO trailing commas
    - Escape line breaks using \\n
    - Do NOT use emojis inside text values

    TASK:
    Convert the given topic into exam-focused notes.

    INPUT:
    Topic: ${topic}
    Class Level: ${classLevel || "Not specified"}
    Exam Type: ${examType || "General"}
    Revision Mode: ${revisionMode ? "ON" : "OFF"}
    Include Diagram: ${includeDiagram ? "YES" : "NO"}
    Include Charts: ${includeChart ? "YES" : "NO"}

    GLOBAL CONTENT RULES:
    - Use clear, simple, exam-oriented language
    - Notes MUST be Markdown formatted
    - Headings and bullet points only

    REVISION MODE RULES (CRITICAL):
    - If REVISION MODE is ON:
     - Notes must be VERY SHORT
     - Only bullet points
     - One-line answers only
     - Definitions, formulas, keywords
     - No paragraphs
     - No explanations
     - Content must feel like:
      - last-day revision
      - 5-minute exam cheat sheet
     - revisionPoints MUST summarize ALL important facts

    - If REVISION MODE is OFF:
     - Notes must be DETAILED but exam-focused
     - Each topic should include:
      - definition
      - short explanation
      - example (if applicable)
    - Paragraph length: max 2-4 lines
    - No storytelling, no extra theory

    IMPORTANT RULES: categories:
    - Divide sub-topics into THREE categories:
      - ⭐ Very Important Topics
      - ⭐⭐ Important Topics
      - ⭐⭐⭐ Frequently Asked Topics
    - All three categories MUST be present
    - Base importance on exam frequency and weightage
     
    DIAGRAM RULES:
    - If INCLUDE DIAGRAM is YES:
      - diagram.data MUST be a SINGLE STRING
      - Valid Mermaid syntax only
      - Must start with: graph TD
      - Wrap EVERY node label in square brackets [ ]
      - Use simple node names like A, B, C for connections
      - Example: graph TD\\nA[Start] --> B[Process] --> C[End]
      - Do NOT use special characters inside labels
      - Keep labels short and clear
    - If INCLUDE DIAGRAM is NO:
        - diagram.data MUST be ""

    CHART RULES (RECHARTS):
    - If INCLUDE CHARTS is YES:
     - charts array MUST NOT be empty
     - Generate at least ONE chart relevant to the topic
     - Choose chart based on topic type:
        - THEORY topic -> bar or pie (showing importance/weightage)
        - PROCESS topic -> line or bar (showing steps/stages)
        - COMPARISON topic -> bar chart
     - Use numeric values ONLY for data
     - Labels must be short and exam-oriented
     - Data should be realistic and educational
    - If INCLUDE CHARTS is NO:
     - charts MUST be []

     CHART TYPES ALLOWED:
     - bar
     - line
     - pie

     CHART OBJECT FORMAT:
     {
     "type":"bar",
     "title": "Topic Overview",
     "data": [
        {"name": "Important Concept","value": 85},
        {"name": "Key Formula","value": 70},
        {"name": "Common Question","value": 60}
        ]
      }

    STRICT JSON FORMAT (DO NOT CHANGE):

    {
    "subTopics":{
    "⭐":[],
    "⭐⭐": [],
    "⭐⭐⭐": []
    },
    "importance":"⭐ | ⭐⭐ | ⭐⭐⭐",
    "notes":"string",
    "revisionPoints":[],
    "questions":{
        "short":[],
        "long":[],
        "diagram":""
    },
    "diagram":{
      "type":"flowchart | graph | process",
      "data":""
    },
    "charts": []
    }

    RETURN ONLY VALID JSON.
    `;
};
