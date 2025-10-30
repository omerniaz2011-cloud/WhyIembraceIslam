
import { GoogleGenAI, Type } from "@google/genai";
import { Story } from '../types';
import { STORY_QUESTIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateStories = async (): Promise<Story[]> => {
  try {
    const questionText = STORY_QUESTIONS.map(q => `- ${q.text}`).join('\n');

    const prompt = `
      Please generate 6 fictional and heartfelt stories of individuals who converted to Islam.
      The stories must be from the following locations:
      1. One person from India.
      2. One person from Russia.
      3. One person from Italy.
      4. One person from the USA.
      5. One person from the UK.
      6. One person from South Africa.
      
      For each person, provide a name, their location (city, country), and answers to the following questions:
      ${questionText}

      The answers should be detailed, personal, and reflective. The tone should be sincere and inspiring.
      Provide a placeholder image URL for each person from picsum.photos.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "The person's first name." },
                  location: { type: Type.STRING, description: "The person's city and country." },
                  profileImageUrl: { type: Type.STRING, description: "A random image URL from picsum.photos, e.g., https://picsum.photos/200" },
                  answers: {
                    type: Type.ARRAY,
                    description: "An array of answers corresponding to the provided questions.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        question: { type: Type.STRING, description: "The question being answered." },
                        answer: { type: Type.STRING, description: "The detailed, personal answer to the question." }
                      },
                      required: ["question", "answer"]
                    }
                  }
                },
                required: ["name", "location", "profileImageUrl", "answers"]
              }
            }
          },
          required: ["stories"]
        }
      }
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse.stories as Story[];

  } catch (error) {
    console.error("Error generating stories:", error);
    throw new Error("Failed to generate stories. Please check the API key and try again.");
  }
};
