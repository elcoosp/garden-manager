// apps/backend/src/ai/ollama.service.ts
import { Injectable } from '@nestjs/common';
import ollama from 'ollama';
import { GardenProfile, PlantingPlan } from '@garden-manager/shared';

@Injectable()
export class OllamaService {
  private readonly model = process.env.OLLAMA_MODEL || 'llama3.1';
  private readonly host = process.env.OLLAMA_HOST || 'http://localhost:11434';

  async generatePlantingPlan(profile: Omit<GardenProfile, "id">): Promise<PlantingPlan> {
    const prompt = `
      As an expert organic gardener, create a planting plan for:
      - USDA Zone: ${profile.zipCode}
      - Garden size: ${profile.gardenSize}
      - Sunlight: ${profile.sunlightHours} hours/day
      - Experience: ${profile.experienceLevel}
      - Goals: ${profile.goals.join(', ')}

      Return JSON with:
      1. Season (e.g., "Spring 2025")
      2. Recommendations (array of plants with name, type, plantingSeason, companionPlants, careInstructions)
      3. PlantingCalendar (array of months with tasks)

      Format: valid JSON only.
    `;

    try {
      const response = await ollama.chat({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              'You are a master gardener with 30 years experience. Provide specific, actionable advice. Always return valid JSON.',
          },
          { role: 'user', content: prompt },
        ],
        format: 'json',
      });

      return JSON.parse(response.message.content);
    } catch (error) {
      // Fallback to hardcoded data if Ollama fails
      return this.getFallbackPlan(profile);
    }
  }

  async diagnosePlant(description: string, imageUrl?: string): Promise<string> {
    const messages: any[] = [
      {
        role: 'user',
        content: `Diagnose this plant problem: ${description}`,
      },
    ];

    if (imageUrl) {
      messages[0].images = [imageUrl];
    }

    const response = await ollama.chat({
      model: this.model,
      messages: [
        {
          role: 'system',
          content:
            'You are a plant pathologist. Provide: 1) Likely cause 2) Immediate actions 3) Organic treatments 4) Prevention tips',
        },
        ...messages,
      ],
    });

    return response.message.content;
  }

  private getFallbackPlan(profile: any): PlantingPlan {
    // Simple fallback data
    return {
      season: 'Spring',
      recommendations: [
        {
          name: 'Tomatoes',
          type: 'vegetable',
          plantingSeason: ['Spring'],
          companionPlants: ['Basil', 'Marigolds'],
          careInstructions: {
            water: '1-2 inches per week',
            sun: 'Full sun (6+ hours)',
            spacing: '24-36 inches apart',
          },
        },
      ],
      plantingCalendar: [
        { month: 'March', tasks: ['Start seeds indoors', 'Prepare soil'] },
        { month: 'April', tasks: ['Transplant seedlings', 'Add compost'] },
      ],
    };
  }
}
