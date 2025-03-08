/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiApiKey = async () => {
  if (chrome.storage) {
    // Running as Chrome extension
    const result = await chrome.storage.local.get(['geminiApiKey']);
    return result.geminiApiKey;
  } else {
    // Running in development
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
};

export const analyzeContentWithGemini = async (data: any) => {
  const apiKey = await getGeminiApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

  const prompt = `Given the title of a news article or social media post, perform a comprehensive analysis to determine its authenticity. First, conduct a deep web search using the title to find matching or similar articles across credible news sources and fact-checking websites. Then determine whether the content is fake or real based on this thorough investigation.

Provide a detailed, evidence-based explanation for your assessment:
- For fake content: Specify what the search revealed, such as "No credible sources reporting this news" or "Found contradicting information from verified sources"
- For real content: Detail the verification process, like "Multiple reputable news outlets have reported this with consistent details" or "Official sources have confirmed this information"

Structure the response as an object with these key-value pairs:
{
  fake: boolean,
  real: boolean,
  fake_percentage: number (0-100),
  real_percentage: number (0-100),
  explanation: string (detailed reasoning),
  related_links: string[] (verified source URLs),
  author_verified: boolean,
  post_date: string,
  subject_expertise: string,
  media_presence: boolean,
  cross_check_sources: string[]
}

Focus your web search and analysis on the article's title to:
1. Find matching articles from credible news sources
2. Check fact-checking websites
3. Verify the timeline of events
4. Cross-reference with official statements
5. Examine the author's credibility and expertise

Input Data:
${JSON.stringify(data)}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStartIndex = text.indexOf("{");
    const jsonEndIndex = text.lastIndexOf("}") + 1;
    const jsonString = text.slice(jsonStartIndex, jsonEndIndex);

    try {
      return JSON.parse(jsonString); // Parse the cleaned JSON
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      console.error("Original response:", text);
      throw new Error("Invalid JSON response from Gemini");
    }
  } catch (error) {
    console.error("Error analyzing content with Gemini:", error);
    throw error;
  }
};
