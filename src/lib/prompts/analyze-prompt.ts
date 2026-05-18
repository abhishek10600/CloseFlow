interface AnalyzePromptProps {
  dm: string;
}

export function analyzePrompt({ dm }: AnalyzePromptProps) {
  return `
You are an elite cold outreach expert.

Analyze this outreach message deeply.

Focus on:
- desperation
- low status language
- weak CTA
- robotic wording
- lack of personalization
- generic messaging
- emotional friction
- poor positioning

DM:
${dm}

IMPORTANT:

Return ONLY valid JSON.

Do NOT include markdown.
Do NOT include explanations.

JSON structure:

{
  "overallScore": 0,
  "mainProblem": "",
  "problems": [],
  "improvements": [],
  "rewriteVersion": ""
}

Rules:
- Score should be from 1-10
- Be brutally honest
- Keep rewritten version concise
- Make rewritten version confident
- Avoid robotic AI language
`;
}
