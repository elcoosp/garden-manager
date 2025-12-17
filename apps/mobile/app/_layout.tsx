import '@/global.css';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@formatjs/intl-pluralrules/polyfill-force';
import '@formatjs/intl-locale/polyfill-force';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/fr';
import { messages as enMessages } from '@/locales/en/messages';
import { messages as frMessages } from '@/locales/fr/messages';

i18n.load({ fr: frMessages, en: enMessages });
i18n.activate('en');
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                },
                headerTintColor: '#212529',
                headerTitleStyle: {
                  fontWeight: '600',
                },
                headerShadowVisible: false,
                contentStyle: {
                  backgroundColor: '#F8F9FA',
                },
                animation: 'slide_from_right',
              }}>
              <Stack.Screen
                name="index"
                options={{
                  title: 'Home',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="sign-in"
                options={{
                  title: 'Sign in',
                }}
              />
                      <Stack.Screen
                name="sign-up"
                options={{
                  title: 'Sign up',
                }}
              />
              <Stack.Screen
                name="+not-found"
                options={{
                  title: 'Not Found',
                }}
              />
            </Stack>
            <PortalHost />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </I18nProvider>
  );
}
