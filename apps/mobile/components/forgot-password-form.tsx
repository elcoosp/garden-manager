import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { View, Alert } from 'react-native';
import { useForgotPassword } from '@/lib/api-hooks'; // Adjust the import path
import { useForm, Controller } from 'react-hook-form';
import type { ForgotPasswordDto } from '@/lib/openapi'; // Adjust the import path

export function ForgotPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    defaultValues: {
      email: '',
    },
  });

  const { mutate: sendResetEmail, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordDto) => {
    sendResetEmail(data, {
      onSuccess: (response) => {
        Alert.alert(
          'Email Sent',
          response.message ||
            'If your email exists in our system, you will receive a password reset link.',
          [
            {
              text: 'OK',
              onPress: () => router.push('/sign-in'),
            },
          ]
        );
      },
      onError: (error: any) => {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Something went wrong. Please try again.'
        );
      },
    });
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Forgot Password</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter your email address and we'll send you a link to reset your password.
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
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    submitBehavior="submit"
                  />
                )}
              />
              {errors.email && <Text className="text-sm text-red-500">{errors.email.message}</Text>}
            </View>

            <Button className="w-full" onPress={handleSubmit(onSubmit)} disabled={isPending}>
              <Text>{isPending ? 'Sending...' : 'Send Reset Link'}</Text>
            </Button>
          </View>
          <View className="items-center">
            <Text className="text-center text-sm">Remember your password? </Text>
            <Link href="/sign-in" asChild className="text-sm underline underline-offset-4">
              <Text>Sign In</Text>
            </Link>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
