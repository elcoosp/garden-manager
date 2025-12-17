import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { PlantCard } from '@/components/garden/plant-card';
import { MonthlyTaskAccordion } from '@/components/garden/monthly-task-accordion';
import { PlantFilter } from '@/components/garden/plant-filter';
import { samplePlantingPlan, allSeasons } from '@/data/sample-data';
import { PlantRecommendation } from '@garden-manager/shared';

export default function PlantingPlanScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>('Spring');

  const filteredPlants = selectedType
    ? samplePlantingPlan.recommendations.filter(
        (plant) => plant.type === selectedType
      )
    : samplePlantingPlan.recommendations;

  const handleAddToPlan = (plant: PlantRecommendation) => {
    // Handle adding plant to user's plan
    console.log('Adding plant:', plant.name);
  };

  const handleTaskToggle = (month: string, taskIndex: number) => {
    // Handle task completion toggle
    console.log(`Toggled task ${taskIndex} for ${month}`);
  };

  return (
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">Spring Planting Plan</Text>
          <Text className="text-gray-600 mb-6">
            Your personalized planting guide for {samplePlantingPlan.season}
          </Text>

          <PlantFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            seasons={allSeasons}
          />

          <Text className="text-xl font-semibold mb-4">Recommended Plants</Text>
          <View className="mb-8">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.name}
                plant={plant}
                onAddToPlan={handleAddToPlan}
              />
            ))}
          </View>

          <Text className="text-xl font-semibold mb-4">Monthly Tasks</Text>
          <MonthlyTaskAccordion
            tasks={samplePlantingPlan.plantingCalendar}
            onTaskToggle={handleTaskToggle}
          />
        </View>
      </ScrollView>
  );
}