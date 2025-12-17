import { View } from 'react-native';
import { GardenProfileForm } from '@/components/garden/garden-profile-form';
import { sampleGardenProfile } from '@/data/sample-data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GardenProfile } from '@garden-manager/shared';

export default function GardenProfileScreen() {
  const handleSaveProfile = (profile: GardenProfile) => {
    // Handle saving profile to backend/local storage
    console.log('Saving profile:', profile);
  };

  const handleDeleteProfile = () => {
    // Handle profile deletion
    console.log('Deleting profile');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <GardenProfileForm
          profile={sampleGardenProfile}
          onSave={handleSaveProfile}
          onDelete={handleDeleteProfile}
        />
      </View>
    </SafeAreaView>
  );
}