import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon, SproutIcon, FlowerIcon, UserIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, ScrollView } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'Garden Manager',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center p-6 gap-8">
          {/* Hero Section */}
          <View className="items-center gap-4">
            <Image 
              source={LOGO[colorScheme ?? 'light']} 
              style={IMAGE_STYLE} 
              resizeMode="contain" 
            />
            <Text className="text-3xl font-bold text-center">
              Garden Manager
            </Text>
            <Text className="text-gray-600 text-center text-lg">
              Plan, grow, and manage your perfect garden
            </Text>
          </View>

      {/* Quick Actions */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold text-gray-900">Quick Actions</Text>
            
            <View className="gap-3">
              <Link href="/garden/plan" asChild>
                <View className="bg-white p-4 rounded-xl border border-gray-200">
                  <View className="flex-row items-center gap-4">
                    <View className="bg-green-100 p-3 rounded-full">
                      <SproutIcon size={24} color="#10b981" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-900">Planting Plan</Text>
                      <Text className="text-sm text-gray-600">
                        View and customize your planting schedule
                      </Text>
                    </View>
                  </View>
                </View>
              </Link>

              <Link href="/garden/profile" asChild>
                <View className="bg-white p-4 rounded-xl border border-gray-200">
                  <View className="flex-row items-center gap-4">
                    <View className="bg-blue-100 p-3 rounded-full">
                      <UserIcon size={24} color="#3b82f6" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-gray-900">Garden Profile</Text>
                      <Text className="text-sm text-gray-600">
                        Update your garden settings and preferences
                      </Text>
                    </View>
                  </View>
                </View>
              </Link>
            </View>
          </View>
          {/* Features Grid */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold">Features</Text>
            
            <View className="flex-row flex-wrap gap-4">
              <View className="flex-1 min-w-[48%] bg-white p-4 rounded-xl border border-gray-200">
                <View className="bg-amber-100 p-3 rounded-full w-12 h-12 items-center justify-center mb-3">
                  <FlowerIcon size={20} color="#f59e0b" />
                </View>
                <Text className="font-semibold mb-1">Plant Library</Text>
                <Text className="text-sm text-gray-600">
                  Browse vegetables, herbs, and flowers
                </Text>
              </View>

              <View className="flex-1 min-w-[48%] bg-white p-4 rounded-xl border border-gray-200">
                <View className="bg-purple-100 p-3 rounded-full w-12 h-12 items-center justify-center mb-3">
                  <StarIcon size={20} color="#8b5cf6" />
                </View>
                <Text className="font-semibold mb-1">Companion Planting</Text>
                <Text className="text-sm text-gray-600">
                  Discover plants that grow well together
                </Text>
              </View>
            </View>
          </View>

          {/* Auth Buttons */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold">Get Started</Text>
            <View className="flex-row flex-wrap justify-center gap-3">
              <Link href="/sign-in" asChild>
                <Button className="flex-1 min-w-[120px]">
                  <Text>Sign In</Text>
                </Button>
              </Link>
              <Link href="/sign-up" asChild>
                <Button variant="outline" className="flex-1 min-w-[120px]">
                  <Text>Sign Up</Text>
                </Button>
              </Link>
            </View>
          </View>

          {/* Recent Activity Placeholder */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold">Recent Activity</Text>
            <View className="bg-white p-4 rounded-xl border border-gray-200">
              <Text className="text-gray-600 text-center">
                No recent activity. Start planning your garden!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}