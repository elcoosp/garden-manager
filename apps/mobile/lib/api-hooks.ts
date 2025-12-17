import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getApiClient } from './api';
import type { Paths } from './openapi.d.ts';

// ========== Auth Hooks ==========

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

// ========== Garden Hooks ==========

const useGeneratePlantingPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['generate-planting-plan'],
    mutationFn: (body: Paths.GardenControllerGeneratePlan.RequestBody) =>
      getApiClient()
        .then((client) => client.GardenController_generatePlan(null, body))
        .then((res) => res.data),
    onSuccess: () => {
      // Invalidate garden profiles to refresh the list
      queryClient.invalidateQueries({ queryKey: ['garden-profiles'] });
    },
  });
};

const useGardenProfiles = () =>
  useQuery({
    queryKey: ['garden-profiles'],
    queryFn: () =>
      getApiClient()
        .then((client) => client.GardenController_getProfiles())
        .then((res) => res.data),
  });

const useGardenProfile = (id: string) =>
  useQuery({
    queryKey: ['garden-profile', id],
    queryFn: () =>
      getApiClient()
        .then((client) => client.GardenController_getProfile({ id }))
        .then((res) => res.data),
    enabled: !!id,
  });

const useDiagnosePlant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['diagnose-plant'],
    mutationFn: (body: Paths.GardenControllerDiagnose.RequestBody) =>
      getApiClient()
        .then((client) => client.GardenController_diagnose(null, body))
        .then((res) => res.data),
    onSuccess: () => {
      // Invalidate diagnoses to refresh the list
      queryClient.invalidateQueries({ queryKey: ['plant-diagnoses'] });
    },
  });
};

const usePlantDiagnoses = () =>
  useQuery({
    queryKey: ['plant-diagnoses'],
    queryFn: () =>
      getApiClient()
        .then((client) => client.GardenController_getDiagnoses())
        .then((res) => res.data),
  });

// ========== Journal Hooks ==========

const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['create-journal-entry'],
    mutationFn: (body: Paths.JournalControllerCreateEntry.RequestBody) =>
      getApiClient()
        .then((client) => client.JournalController_createEntry(null, body))
        .then((res) => res.data),
    onSuccess: (data) => {
      // Invalidate journal entries for the specific garden
      queryClient.invalidateQueries({ 
        queryKey: ['journal-entries', data.gardenId] 
      });
    },
  });
};

const useJournalEntries = (gardenId: string) =>
  useQuery({
    queryKey: ['journal-entries', gardenId],
    queryFn: () =>
      getApiClient()
        .then((client) => client.JournalController_getEntriesByGarden({ gardenId }))
        .then((res) => res.data),
    enabled: !!gardenId,
  });

const useJournalEntry = (id: string) =>
  useQuery({
    queryKey: ['journal-entry', id],
    queryFn: () =>
      getApiClient()
        .then((client) => client.JournalController_getEntry({ id }))
        .then((res) => res.data),
    enabled: !!id,
  });

const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['update-journal-entry'],
    mutationFn: ({ 
      id, 
      body 
    }: { 
      id: string; 
      body: Paths.JournalControllerUpdateEntry.RequestBody 
    }) =>
      getApiClient()
        .then((client) => client.JournalController_updateEntry({ id }, body))
        .then((res) => res.data),
    onSuccess: (data) => {
      // Invalidate specific entry and list
      queryClient.invalidateQueries({ queryKey: ['journal-entry', data.id] });
      queryClient.invalidateQueries({ 
        queryKey: ['journal-entries', data.gardenId] 
      });
    },
  });
};

const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['delete-journal-entry'],
    mutationFn: (id: string) =>
      getApiClient()
        .then((client) => client.JournalController_deleteEntry({ id }))
        .then((res) => res.data),
    onSuccess: (_, id) => {
      // Invalidate all journal queries
      queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
      queryClient.invalidateQueries({ queryKey: ['journal-entry', id] });
    },
  });
};

// ========== Exports ==========

export {
  // Auth
  useLogin,
  useRegister,
  useForgotPassword,
  useResetPassword,
  // Garden
  useGeneratePlantingPlan,
  useGardenProfiles,
  useGardenProfile,
  useDiagnosePlant,
  usePlantDiagnoses,
  // Journal
  useCreateJournalEntry,
  useJournalEntries,
  useJournalEntry,
  useUpdateJournalEntry,
  useDeleteJournalEntry,
};