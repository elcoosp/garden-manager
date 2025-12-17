import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Select } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Toggle } from '@/components/ui/toggle';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

import {GardenProfile} from '@garden-manager/shared'
interface GardenProfileFormProps {
  profile: GardenProfile;
  onSave: (profile: GardenProfile) => void;
  onDelete?: () => void;
}

export function GardenProfileForm({ profile, onSave, onDelete }: GardenProfileFormProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<GardenProfile>(profile);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(profile.goals);

  const gardenGoals = [
    'Vegetable Production',
    'Herb Garden',
    'Flower Display',
    'Pollinator Friendly',
    'Low Maintenance',
    'Educational',
    'Aesthetic Design',
  ];

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  const handleSave = () => {
    onSave({
      ...formData,
      goals: selectedGoals,
    });
  };

  return (
    <ScrollView>
      <Card>
        <CardHeader>
          <CardTitle>Garden Profile</CardTitle>
          <CardDescription>Customize your garden settings</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <View className="space-y-4">
            <Text className="font-medium">Garden Size</Text>
            <RadioGroup
              value={formData.gardenSize}
              onValueChange={(value: 'small' | 'medium' | 'large') =>
                setFormData({ ...formData, gardenSize: value })
              }
              className="space-y-2"
            >
              <View className="flex-row items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Text>Small (under 100 sq ft)</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Text>Medium (100-500 sq ft)</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Text>Large (over 500 sq ft)</Text>
              </View>
            </RadioGroup>
          </View>

          <View className="space-y-4">
            <Text className="font-medium">Experience Level</Text>
            <Select
              value={formData.experienceLevel}
              onValueChange={(value: 'beginner' | 'intermediate' | 'expert') =>
                setFormData({ ...formData, experienceLevel: value })
              }
              items={[
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Expert', value: 'expert' },
              ]}
            />
          </View>

          <View className="space-y-4">
            <Text className="font-medium">Sunlight Hours</Text>
            <Select
              value={formData.sunlightHours.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, sunlightHours: parseInt(value) })
              }
              items={[
                { label: 'Less than 4 hours', value: '2' },
                { label: '4-6 hours', value: '5' },
                { label: '6-8 hours', value: '7' },
                { label: 'More than 8 hours', value: '9' },
              ]}
            />
          </View>

          <View className="space-y-4">
            <Text className="font-medium">Garden Goals</Text>
            <View className="flex-row flex-wrap gap-3">
              {gardenGoals.map((goal) => (
                <Toggle
                  key={goal}
                  pressed={selectedGoals.includes(goal)}
                  onPressedChange={() => handleGoalToggle(goal)}
                  className="mb-2"
                >
                  <View className="flex-row items-center">
                    <Checkbox
                      checked={selectedGoals.includes(goal)}
                      className="mr-2"
                    />
                    <Text className="text-sm">{goal}</Text>
                  </View>
                </Toggle>
              ))}
            </View>
          </View>

          <View className="pt-4 space-y-4">
            <Button onPress={handleSave}>Save Profile</Button>
            {onDelete && (
              <Button
                variant="destructive"
                onPress={() => setIsDeleteDialogOpen(true)}
              >
                <Text>
                Delete Profile
                </Text>
              </Button>
            )}
          </View>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your garden profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onPress={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollView>
  );
}