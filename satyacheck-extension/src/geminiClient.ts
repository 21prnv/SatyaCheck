/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyBj67DtbPmqVeKqn887qtNVcVG3VRORKhw"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const analyzeContentWithGemini = async (data: any) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

  const prompt = `Analyze the given news or social media post and determine whether it is fake or real. Provide a detailed, specific explanation for your assessment. If the post is fake, explain exactly what you found to classify it as fake, such as 'I checked all recent internet sources and found no credible reports confirming this news,' or 'I discovered inconsistencies in the timeline and original source.' If the post is real, give a thorough explanation, such as 'After reviewing multiple independent sources and performing a deep web search, I found consistent reporting across verified platforms.' Structure the response as an object with key-value pairs, including the following: whether the post is fake (fake: bool), whether the post is real (real: bool), the percentage probability of the post being fake (fake_percentage: int), the percentage probability of it being real (real_percentage: int), and specific reasons for the determination. For example, 'I conducted a deep web search and cross-referenced various trusted sources which either confirmed or denied the post.' Include links to related sources for verification (related_links: list). Additionally, indicate whether the author is verified or credible (author_verified: bool), the date of the post (post_date: string), whether the topic is within the author’s expertise (subject_expertise: string), whether the post has appeared on multiple credible media outlets (media_presence: bool), and cross-referenced sources used for fact-checking (cross_check_sources: list). Ensure you conduct a deep web search and provide a comprehensive, evidence-backed explanation for your findings. Data:
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
