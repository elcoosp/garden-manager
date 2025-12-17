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
import { GardenProfile } from '@garden-manager/shared';

interface GardenProfileFormProps {
  profile: GardenProfile;
  onSave: (profile: GardenProfile) => void;
  onDelete?: () => void;
}

type ExperienceLevel = 'beginner' | 'intermediate' | 'expert';
type GardenSize = 'small' | 'medium' | 'large';


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

  const experienceLevelOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' },
  ];

  const sunlightHoursOptions = [
    { label: 'Less than 4 hours', value: '2' },
    { label: '4-6 hours', value: '5' },
    { label: '6-8 hours', value: '7' },
    { label: 'More than 8 hours', value: '9' },
  ];

  // Get current experience level option
  const currentExperienceLevelOption = experienceLevelOptions.find(
    opt => opt.value === formData.experienceLevel
  ) || experienceLevelOptions[0];

  // Get current sunlight hours option
  const currentSunlightHoursOption = sunlightHoursOptions.find(
    opt => opt.value === formData.sunlightHours.toString()
  ) || sunlightHoursOptions[0];

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
              onValueChange={(value: string) => {
                setFormData({ ...formData, gardenSize: value as GardenSize });
              }}
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
              value={currentExperienceLevelOption}
              onValueChange={(option) => {
                setFormData({ 
                  ...formData, 
                  experienceLevel: option?.value as ExperienceLevel 
                });
              }}
            />
          </View>

          <View className="space-y-4">
            <Text className="font-medium">Sunlight Hours</Text>
            <Select
              value={currentSunlightHoursOption}
              onValueChange={(option) => {
                setFormData({ 
                  ...formData, 
                  sunlightHours: option?.value ? parseInt(option?.value) : 0
                });
              }}
            />
          </View>

          <View className="space-y-4">
            <Text className="font-medium">Garden Goals</Text>
            <View className="flex-row flex-wrap gap-3">
              {gardenGoals.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <Toggle
                    key={goal}
                    pressed={isSelected}
                    onPressedChange={() => handleGoalToggle(goal)}
                    className="mb-2"
                  >
                    <View className="flex-row items-center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleGoalToggle(goal)}
                        className="mr-2"
                      />
                      <Text className="text-sm">{goal}</Text>
                    </View>
                  </Toggle>
                );
              })}
            </View>
          </View>

          <View className="pt-4 space-y-4">
            <Button onPress={handleSave} className='mb-2'>
              <Text>Save Profile</Text>
            </Button>
            {onDelete && (
              <Button
                variant="destructive"
                onPress={() => setIsDeleteDialogOpen(true)}
              >
                <Text>Delete Profile</Text>
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
            <AlertDialogCancel><Text>Cancel</Text></AlertDialogCancel>
            <AlertDialogAction onPress={onDelete}>
              <Text>Delete</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollView>
  );
}