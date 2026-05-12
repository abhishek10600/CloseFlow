interface GeneratePromptProps {
  niche: string;
  target: string;
  offer: string;
  platform: string;
  tone: string;
}

export function generatePrompt({
  niche,
  target,
  offer,
  platform,
  tone,
}: GeneratePromptProps) {
  return `
You are an elite cold outreach expert.

Generate a high-converting outreach sequence.

Platform:
${platform}

Niche:
${niche}

Target:
${target}

Offer:
${offer}

Tone:
${tone}

IMPORTANT:

Return ONLY valid JSON.

Do NOT include markdown.
Do NOT include code blocks.
Do NOT include explanations.

JSON structure:

{
  "firstMessage": "",
  "followUp": "",
  "personalization": "",
  "cta": "",
  "objectionHandling": ""
}

Rules:
- Make the messaging confident
- Avoid sounding needy
- Keep messages concise
- Make it natural and human
- Avoid robotic AI wording
`;
}
