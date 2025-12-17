import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button'; // Adjust import path
import { Input } from '@/components/ui/input'; // Adjust import path
import { Text } from '@/components/ui/text'; // Adjust import path
import type { ResetPasswordDto } from '@/lib/openapi';

// Extended form schema with confirmPassword for frontend validation
const resetPasswordFormSchema = z
  .object({
    token: z.string(),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

interface ResetPasswordFormProps {
  token: string;
  onSubmit: (data: ResetPasswordDto) => Promise<void>;
}

export function ResetPasswordForm({ token, onSubmit }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      token,
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmitForm = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // Only send token and newPassword to the backend
      await onSubmit({
        token: data.token,
        newPassword: data.newPassword,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <Input {...field} autoComplete="password" placeholder="New Password" />
          )}
        />
        {errors.newPassword && (
          <Text className="text-sm text-red-500">{errors.newPassword.message}</Text>
        )}
      </div>

      <div>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input {...field} autoComplete="password" placeholder="Confirm Password" />
          )}
        />
        {errors.confirmPassword && (
          <Text className="text-sm text-red-500">{errors.confirmPassword.message}</Text>
        )}
      </div>

      <Button disabled={isLoading}>{isLoading ? 'Resetting...' : 'Reset Password'}</Button>
    </form>
  );
}
