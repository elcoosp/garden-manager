import { View, ScrollView, Pressable } from 'react-native';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Droplets, Sun, Ruler } from 'lucide-react-native';
import { useState } from 'react';
import { PlantRecommendation } from '@garden-manager/shared';
interface PlantCardProps {
  plant: PlantRecommendation;
  onAddToPlan?: (plant: PlantRecommendation) => void;
}

export function PlantCard({ plant, onAddToPlan }: PlantCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader>
        <View className="flex-row items-start justify-between">
          <View>
            <CardTitle className="text-xl">{plant.name}</CardTitle>
            <Badge variant="outline" className="mt-2">
              <Text>{plant.type}</Text>
            </Badge>
          </View>
          <Button size="sm" variant="outline" onPress={() => onAddToPlan?.(plant)} className="px-3">
            <Text>Add</Text>
          </Button>
        </View>
      </CardHeader>

      <CardContent className="space-y-4">
        <View>
          <Text className="mb-2 font-medium">Planting Season</Text>
          <View className="flex-row flex-wrap gap-2">
            {plant.plantingSeason.map((season) => (
              <Badge key={season} variant="secondary">
                <Text>{season}</Text>
              </Badge>
            ))}
          </View>
        </View>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Pressable className="w-full flex-row items-center justify-between py-2">
              <Text className="font-medium">Care Instructions</Text>
              <ChevronDown size={16} className={isExpanded ? 'rotate-180' : ''} />
            </Pressable>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <View className="flex-row items-center gap-2">
              <Droplets size={16} color="#3b82f6" />
              <Text className="text-sm">Water: {plant.careInstructions.water}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Sun size={16} color="#f59e0b" />
              <Text className="text-sm">Sun: {plant.careInstructions.sun}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ruler size={16} color="#10b981" />
              <Text className="text-sm">Spacing: {plant.careInstructions.spacing}</Text>
            </View>
          </CollapsibleContent>
        </Collapsible>

        {plant.companionPlants.length > 0 && (
          <View>
            <Text className="mb-2 font-medium">Companion Plants</Text>
            <View className="flex-row flex-wrap gap-2">
              {plant.companionPlants.map((companion) => (
                <Badge key={companion} variant="outline">
                  <Text>{companion}</Text>
                </Badge>
              ))}
            </View>
          </View>
        )}
      </CardContent>

      <CardFooter className="border-t border-gray-200 pt-4">
        <Button variant="ghost" size="sm" className="w-full">
          <Text>View Details</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
