import { useMutation, useQuery } from '@tanstack/react-query';
import { getApiClient } from './api';
import type { Paths } from './openapi.d.ts';

const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (body: Paths.AuthControllerLogin.RequestBody) =>
      getApiClient()
        .then((client) => client.AuthController_login(null, body))
        .then((res) => res.data),
  });

const useRegister = () =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: (body: Paths.AuthControllerRegister.RequestBody) =>
      getApiClient()
        .then((client) => client.AuthController_register(null, body))
        .then((res) => res.data),
  });

const useForgotPassword = () =>
  useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (body: Paths.AuthControllerForgotPassword.RequestBody) =>
      getApiClient()
        .then((client) => client.AuthController_forgotPassword(null, body))
        .then((res) => res.data),
  });

const useResetPassword = () =>
  useMutation({
    mutationKey: ['reset-password'],
    mutationFn: (body: Paths.AuthControllerResetPassword.RequestBody) =>
      getApiClient()
        .then((client) => client.AuthController_resetPassword(null, body))
        .then((res) => res.data),
  });

export { useLogin, useRegister, useForgotPassword, useResetPassword };
