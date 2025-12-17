import { View } from 'react-native';
import { GardenProfileForm } from '@/components/garden/garden-profile-form';
import { sampleGardenProfile } from '@/data/sample-data';
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
    <View className="flex-1 p-4">
      <GardenProfileForm
        profile={sampleGardenProfile}
        onSave={handleSaveProfile}
        onDelete={handleDeleteProfile}
      />
    </View>
  );
}
