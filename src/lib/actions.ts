
"use server";

import { aiProduceDescriptionGenerator, ProduceDescriptionInput, ProduceDescriptionOutput } from "@/ai/flows/ai-produce-description-generator-flow";
import { aiBlogContentAssistant, AiBlogContentAssistantInput, AiBlogContentAssistantOutput } from "@/ai/flows/ai-blog-content-assistant";


export async function generateDescription(input: ProduceDescriptionInput): Promise<ProduceDescriptionOutput> {
    // In a real application, you would add input validation here.
    try {
        const result = await aiProduceDescriptionGenerator(input);
        return result;
    } catch (error) {
        console.error("Error generating product description:", error);
        // You might want to return a more structured error object
        return { description: "" };
    }
}

export async function generateBlogContent(input: AiBlogContentAssistantInput): Promise<AiBlogContentAssistantOutput> {
     // In a real application, you would add input validation here.
    try {
        const result = await aiBlogContentAssistant(input);
        return result;
    } catch (error) {
        console.error("Error generating blog content:", error);
        // You might want to return a more structured error object
        return { suggestedIdeas: [], draftBlogPost: "" };
    }
}
