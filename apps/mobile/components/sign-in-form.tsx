import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { type TextInput, View, Alert } from 'react-native';
import { useLogin } from '@/lib/api-hooks'; // Adjust the import path
import { useForm, Controller } from 'react-hook-form';
import type { LoginDto } from '@/lib/openapi'; // Adjust the import path

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginUser, isPending } = useLogin();

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const onSubmit = (data: LoginDto) => {
    loginUser(data, {
      onSuccess: (response) => {
        console.log('Login successful:', response);
        router.replace('/');
      },
      onError: (error: any) => {
        Alert.alert(
          'Login Failed',
          error.response?.data?.message || 'Invalid email or password. Please try again.'
        );
      },
    });
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Sign in to your app</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Email Field */}
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType="next"
                    submitBehavior="submit"
                  />
                )}
              />
              {errors.email && <Text className="text-sm text-red-500">{errors.email.message}</Text>}
            </View>

            {/* Password Field */}
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                    router.push('/forgot-password');
                  }}>
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </Button>
              </View>
              <Controller
                control={control}
                name="password"
                rules={{ required: 'Password is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-sm text-red-500">{errors.password.message}</Text>
              )}
            </View>

            <Button className="w-full" onPress={handleSubmit(onSubmit)} disabled={isPending}>
              <Text>{isPending ? 'Signing in...' : 'Continue'}</Text>
            </Button>
          </View>
          <View className="items-center">
            <Text className="text-center text-sm">Don&apos;t have an account? </Text>
            <Link href="/sign-up" asChild className="text-sm underline underline-offset-4">
              <Text>Sign Up</Text>
            </Link>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
