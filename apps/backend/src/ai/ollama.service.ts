// apps/backend/src/ai/ollama.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';
import ollama from 'ollama';
import { GardenProfile, PlantingPlan, PlantRecommendation, MonthlyTask } from '@garden-manager/shared';

// Zod schemas for strict validation
const PlantRecommendationSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['vegetable', 'herb', 'flower']),
  plantingSeason: z.array(z.string()).min(1),
  companionPlants: z.array(z.string()),
  careInstructions: z.object({
    water: z.string(),
    sun: z.string(),
    spacing: z.string(),
  }),
});

const MonthlyTaskSchema = z.object({
  month: z.string(),
  tasks: z.array(z.string()).min(1),
});

const PlantingPlanSchema = z.object({
  season: z.string(),
  recommendations: z.array(PlantRecommendationSchema).min(1),
  plantingCalendar: z.array(MonthlyTaskSchema).min(1),
});

type ValidatedPlantingPlan = z.infer<typeof PlantingPlanSchema>;

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);
  private readonly model = process.env.OLLAMA_MODEL || 'qwen3-coder:480b-cloud';
  private readonly host = process.env.OLLAMA_HOST || 'http://localhost:11434';

  async generatePlantingPlan(
    profile: Omit<GardenProfile, 'id' | 'userId'>,
  ): Promise<ValidatedPlantingPlan> {
    // Validate input profile
    this.validateProfile(profile);

    // Create structured prompt with JSON schema for better output consistency
    // @ts-expect-error
    const jsonSchema = zodToJsonSchema(PlantingPlanSchema);
    const prompt = this.createPlantingPlanPrompt(profile, jsonSchema);

    try {
      const response = await ollama.chat({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.createSystemPrompt(jsonSchema),
          },
          { role: 'user', content: prompt },
        ],
        format: 'json',
        options: {
          temperature: 0.2, // Lower temperature for more consistent JSON output
        },
      });

      // Parse and validate the response
      const parsedContent = await this.parseAndValidateResponse(response.message.content);
      
      return parsedContent;
    } catch (error) {
      this.logger.error(`Failed to generate planting plan: ${error.message}`, error.stack);
      // Return typed fallback plan
      return this.getFallbackPlan(profile);
    }
  }

  async diagnosePlant(description: string, imageUrl?: string): Promise<string> {
    // Validate description
    if (!description || description.trim().length < 10) {
      throw new Error('Plant description must be at least 10 characters long');
    }

    const messages: any[] = [
      {
        role: 'user',
        content: `Diagnose this plant problem: ${description}`,
      },
    ];

    if (imageUrl) {
      messages[0].images = [imageUrl];
    }

    try {
      const response = await ollama.chat({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are a certified plant pathologist. Provide structured diagnosis with:
1) Likely cause (be specific)
2) Immediate actions (numbered steps)
3) Organic treatments (bullet points)
4) Prevention tips (bullet points)
5) Expected recovery timeline`,
          },
          ...messages,
        ],
        options: {
          temperature: 0.3,
        },
      });

      return response.message.content;
    } catch (error) {
      this.logger.error(`Failed to diagnose plant: ${error.message}`, error.stack);
      return this.getFallbackDiagnosis(description);
    }
  }

  private createPlantingPlanPrompt(profile: Omit<GardenProfile, 'id' | 'userId'>, jsonSchema: any): string {
    // Determine climate type based on location and sunlight
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    return `
      As an expert organic gardener, create a detailed planting plan for:
      - Location zipcode: ${profile.zipCode || 'General garden'} (latitude-based recommendations)
      - Garden size: ${profile.gardenSize} (${this.getSizeDescription(profile.gardenSize)})
      - Sunlight: ${profile.sunlightHours} hours/day (${this.getSunlightDescription(profile.sunlightHours)})
      - Gardener experience: ${profile.experienceLevel}
      - Primary goals: ${profile.goals.join(', ')}
      - Current season: ${currentMonth} ${currentYear}

      IMPORTANT: Return a valid JSON object EXACTLY matching this structure:
      ${JSON.stringify(jsonSchema, null, 2)}

      Guidelines:
      1. Choose plants suitable for the climate type
      2. Consider the garden size and sunlight hours
      3. Tailor recommendations to the gardener's experience level
      4. Include companion planting suggestions
      5. Provide specific, actionable care instructions
      6. Create a monthly planting calendar for the next 6 months
      7. Suggest both cool-season and warm-season plants where appropriate
      8. Consider container-friendly options if garden size is small
      9. Include organic pest control methods suitable for the plants

      Return ONLY the JSON object, no additional text.
    `;
  }

  private createSystemPrompt(jsonSchema: any): string {
    return `You are a master gardener with 30 years of global organic farming experience.
    You provide specific, actionable, and scientifically accurate gardening advice that works worldwide.
    
    You understand different climate zones (tropical, temperate, arid, continental, polar) and 
    can adapt planting recommendations accordingly.
    
    CRITICAL: You must ALWAYS return valid JSON that matches this exact schema:
    ${JSON.stringify(jsonSchema, null, 2)}
    
    Do not include any markdown, code blocks, or additional text. Only the JSON object.`;
  }

  private async parseAndValidateResponse(content: string): Promise<ValidatedPlantingPlan> {
    try {
      // Clean the response content (remove markdown code blocks, extra text)
      const cleanedContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      // Parse JSON
      const parsed = JSON.parse(cleanedContent);
      
      // Validate against schema
      const result = PlantingPlanSchema.safeParse(parsed);
      
      if (!result.success) {
        this.logger.warn('Ollama response validation failed:', result.error);
        throw new Error(`Invalid response structure: ${result.error.message}`);
      }
      
      return result.data;
    } catch (error) {
      this.logger.error('Failed to parse Ollama response:', error);
      throw new Error(`Invalid JSON response: ${error.message}`);
    }
  }

  private validateProfile(profile: Omit<GardenProfile, 'id' | 'userId'>): void {
    if (!['small', 'medium', 'large'].includes(profile.gardenSize)) {
      throw new Error('Invalid garden size');
    }

    if (profile.sunlightHours < 0 || profile.sunlightHours > 24) {
      throw new Error('Sunlight hours must be between 0 and 24');
    }

    if (!['beginner', 'intermediate', 'expert'].includes(profile.experienceLevel)) {
      throw new Error('Invalid experience level');
    }

    if (!profile.goals || profile.goals.length === 0) {
      throw new Error('At least one garden goal must be specified');
    }
  }


  private getSizeDescription(size: 'small' | 'medium' | 'large'): string {
    const descriptions = {
      small: 'under 100 sq ft or container garden',
      medium: '100-500 sq ft or raised beds',
      large: 'over 500 sq ft or full-scale garden',
    };
    return descriptions[size];
  }

  private getSunlightDescription(hours: number): string {
    if (hours < 3) return 'full shade';
    if (hours < 4) return 'partial shade';
    if (hours < 6) return 'partial sun';
    return 'full sun';
  }

  private getFallbackPlan(profile: Omit<GardenProfile, 'id' | 'userId'>): ValidatedPlantingPlan {
    const currentYear = new Date().getFullYear();
    const season = `Spring ${currentYear}`;
    
      // Temperate climate fallback
      return {
        season,
        recommendations: [
          {
            name: 'Lettuce',
            type: 'vegetable',
            plantingSeason: ['Spring', 'Fall'],
            companionPlants: ['Carrots', 'Radishes', 'Chives'],
            careInstructions: {
              water: 'Keep soil consistently moist',
              sun: 'Partial sun (4-6 hours)',
              spacing: '6-12 inches apart',
            },
          },
          {
            name: 'Zucchini',
            type: 'vegetable',
            plantingSeason: ['Spring after last frost', 'Summer'],
            companionPlants: ['Nasturtiums', 'Corn', 'Beans'],
            careInstructions: {
              water: '1-2 inches per week, water at base',
              sun: 'Full sun (6+ hours)',
              spacing: '24-36 inches apart',
            },
          },
        ],
        plantingCalendar: [
          { 
            month: 'March', 
            tasks: [
              'Start seeds indoors for warm-season crops',
              'Direct sow cold-hardy crops',
              'Prepare garden beds'
            ] 
          },
          { 
            month: 'April', 
            tasks: [
              'Transplant seedlings',
              'Direct sow more crops',
              'Begin regular weeding schedule'
            ] 
          },
        ],
      };
  }

  private getFallbackDiagnosis(description: string): string {
    return `
Diagnosis for: "${description.substring(0, 50)}..."

1) Likely Cause: Environmental stress or nutrient imbalance

2) Immediate Actions:
   1. Check soil moisture - adjust watering if needed
   2. Inspect for pests or disease signs
   3. Ensure proper sunlight exposure
   4. Check for root-bound conditions if potted

3) Organic Treatments:
   • Apply diluted seaweed extract for general health
   • Use companion planting for natural pest control
   • Apply organic compost for nutrient boost
   • Use neem oil or insecticidal soap if pests present

4) Prevention Tips:
   • Maintain consistent watering schedule
   • Ensure good air circulation around plants
   • Rotate crops to prevent soil-borne diseases
   • Test soil periodically and amend as needed

5) Expected Recovery: Monitor for 2-3 weeks, adjust care as needed

Note: Consider local climate and seasonal factors in your care routine.
`;
  }
}