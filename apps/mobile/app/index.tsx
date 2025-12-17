import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack, useRouter } from 'expo-router';
import {
  MoonStarIcon,
  StarIcon,
  SunIcon,
  SproutIcon,
  FlowerIcon,
  UserIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, ScrollView, Pressable } from 'react-native';

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
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center gap-8 p-6">
          {/* Hero Section */}
          <View className="items-center gap-4">
            <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
            <Text className="text-center text-3xl font-bold">Garden Manager</Text>
            <Text className="text-center text-lg text-gray-600">
              Plan, grow, and manage your perfect garden
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold text-gray-900">Quick Actions</Text>

            <View className="gap-3">
              <Pressable onPress={() => router.push('/garden/plan')}>
                <View className="rounded-xl border border-gray-200 bg-white p-4">
                  <View className="flex-row items-center gap-4">
                    <View className="rounded-full bg-green-100 p-3">
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
              </Pressable>

              <Pressable onPress={() => router.push('/garden/profile')}>
                <View className="rounded-xl border border-gray-200 bg-white p-4">
                  <View className="flex-row items-center gap-4">
                    <View className="rounded-full bg-blue-100 p-3">
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
              </Pressable>
            </View>
          </View>
          {/* Features Grid */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold">Features</Text>

            <View className="flex-row flex-wrap gap-4">
              <View className="min-w-[48%] flex-1 rounded-xl border border-gray-200 bg-white p-4">
                <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-amber-100 p-3">
                  <FlowerIcon size={20} color="#f59e0b" />
                </View>
                <Text className="mb-1 font-semibold">Plant Library</Text>
                <Text className="text-sm text-gray-600">Browse vegetables, herbs, and flowers</Text>
              </View>

              <View className="min-w-[48%] flex-1 rounded-xl border border-gray-200 bg-white p-4">
                <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-purple-100 p-3">
                  <StarIcon size={20} color="#8b5cf6" />
                </View>
                <Text className="mb-1 font-semibold">Companion Planting</Text>
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
                <Button className="min-w-[120px] flex-1">
                  <Text>Sign In</Text>
                </Button>
              </Link>
              <Link href="/sign-up" asChild>
                <Button variant="outline" className="min-w-[120px] flex-1">
                  <Text>Sign Up</Text>
                </Button>
              </Link>
            </View>
          </View>

          {/* Recent Activity Placeholder */}
          <View className="w-full gap-4">
            <Text className="text-xl font-semibold">Recent Activity</Text>
            <View className="rounded-xl border border-gray-200 bg-white p-4">
              <Text className="text-center text-gray-600">
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
