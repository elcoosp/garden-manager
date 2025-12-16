export interface PlantRecommendation {
    name: string;
    type: 'vegetable' | 'herb' | 'flower';
    plantingSeason: string[];
    companionPlants: string[];
    careInstructions: {
        water: string;
        sun: string;
        spacing: string;
    };
}
export interface MonthlyTask {
    month: string;
    tasks: string[];
}
export interface PlantingPlan {
    season: string;
    recommendations: PlantRecommendation[];
    plantingCalendar: MonthlyTask[];
}
export interface GardenProfile {
    id: string;
    userId: string;
    zipCode: string;
    gardenSize: 'small' | 'medium' | 'large';
    sunlightHours: number;
    experienceLevel: 'beginner' | 'intermediate' | 'expert';
    goals: string[];
}
//# sourceMappingURL=garden.d.ts.map