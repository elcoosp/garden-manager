import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { TextInput, View, Alert } from 'react-native';
import { useRegister } from '@/lib/api-hooks';
import { useForm, Controller } from 'react-hook-form';
import type { RegisterDto } from '@/lib/openapi';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { mutate: registerUser, isPending } = useRegister();

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const onSubmit = (data: RegisterDto) => {
    registerUser(data, {
      onSuccess: (response) => {
        router.replace('/');
      },
      onError: (error: any) => {
        Alert.alert(
          'Registration Failed',
          error.response?.data?.message || 'Something went wrong. Please try again.'
        );
      },
    });
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Name Field */}
            <View className="gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Controller
                control={control}
                name="name"
                rules={{ required: 'Name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    submitBehavior="submit"
                  />
                )}
              />
              {errors.name && <Text className="text-sm text-red-500">{errors.name.message}</Text>}
            </View>

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
              </View>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
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
              <Text>{isPending ? 'Creating account...' : 'Continue'}</Text>
            </Button>
          </View>
          <View className="items-center">
            <Text className="text-center text-sm">Already have an account?</Text>
            <Link href="/sign-in" asChild className="text-sm underline underline-offset-4">
              <Text>Sign In</Text>
            </Link>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
