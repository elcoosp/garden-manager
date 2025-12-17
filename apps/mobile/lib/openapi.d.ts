import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AuthResponse {
            user: User;
            accessToken: string;
            refreshToken: string;
        }
        export interface CreateGardenPlanDto {
            /**
             * ZIP code for location-based recommendations
             * example:
             * 90210
             */
            zipCode: string;
            /**
             * Size of the garden
             * example:
             * medium
             */
            gardenSize: "small" | "medium" | "large";
            /**
             * Average daily sunlight hours
             * example:
             * 6
             */
            sunlightHours: number;
            /**
             * Gardener experience level
             * example:
             * beginner
             */
            experienceLevel: "beginner" | "intermediate" | "expert";
            /**
             * Garden goals and preferences
             * example:
             * [
             *   "grow vegetables",
             *   "attract pollinators"
             * ]
             */
            goals: string[];
        }
        export interface CreateJournalEntryDto {
            /**
             * Garden profile ID
             * example:
             * a1b2c3d4-e5f6-7890-abcd-ef1234567890
             */
            gardenId: string; // uuid
            /**
             * Entry date
             * example:
             * 2024-03-15T10:30:00Z
             */
            date: string; // date-time
            /**
             * Journal entry notes
             * example:
             * Planted tomatoes in the north bed. Watered all plants.
             */
            notes: string;
            /**
             * Photo URL or base64 encoded image
             * example:
             * https://example.com/garden-photo.jpg
             */
            photoUrl?: string;
        }
        export interface DeleteResponseDto {
            /**
             * Success message
             * example:
             * Journal entry deleted successfully
             */
            message: string;
        }
        export interface DiagnosePlantDto {
            /**
             * Description of plant issue or question
             * example:
             * My tomato plant leaves are turning yellow
             */
            description: string;
            /**
             * Base64 encoded image or URL
             * example:
             * data:image/jpeg;base64,/9j/4AAQSkZJRg...
             */
            image?: string;
        }
        export interface DiagnosisListItemDto {
            /**
             * example:
             * d1a2g3n4-o5s6-7i8s-9abc-def123456789
             */
            id: string;
            /**
             * example:
             * My tomato plant leaves are turning yellow
             */
            description: string;
            /**
             * example:
             * https://example.com/image.jpg
             */
            imageUrl?: string;
            /**
             * Diagnosis result object
             */
            diagnosis: {
                [key: string]: any;
            };
            createdAt: string; // date-time
        }
        export interface DiagnosisResponseDto {
            /**
             * Unique diagnosis ID
             * example:
             * d1a2g3n4-o5s6-7i8s-9abc-def123456789
             */
            diagnosisId: string;
            /**
             * AI-generated diagnosis and recommendations
             */
            diagnosis: {
                [key: string]: any;
            };
        }
        export interface ForgotPasswordDto {
            email: string;
        }
        export interface GardenPlanResponseDto {
            /**
             * Unique garden profile ID
             * example:
             * a1b2c3d4-e5f6-7890-abcd-ef1234567890
             */
            gardenId: string;
            /**
             * Generated planting plan with recommendations
             */
            plantingPlan: {
                [key: string]: any;
            };
        }
        export interface GardenProfileResponseDto {
            /**
             * example:
             * a1b2c3d4-e5f6-7890-abcd-ef1234567890
             */
            id: string;
            /**
             * example:
             * u9i8o7p6-q5w4-3e2r-1t0y-9u8i7o6p5q4w
             */
            userId: string;
            /**
             * example:
             * 90210
             */
            zipCode: string;
            /**
             * example:
             * medium
             */
            gardenSize: string;
            /**
             * example:
             * 6
             */
            sunlightHours: number;
            /**
             * example:
             * beginner
             */
            experienceLevel: string;
            /**
             * example:
             * [
             *   "grow vegetables",
             *   "attract pollinators"
             * ]
             */
            goals: string[];
            /**
             * Full planting plan object
             */
            plantingPlan?: {
                [key: string]: any;
            } | null;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        export interface JournalEntryResponseDto {
            /**
             * example:
             * j1o2u3r4-n5a6-7l8e-9ntry-abc123456789
             */
            id: string;
            /**
             * example:
             * a1b2c3d4-e5f6-7890-abcd-ef1234567890
             */
            gardenId: string;
            /**
             * example:
             * 2024-03-15T10:30:00Z
             */
            date: string; // date-time
            /**
             * example:
             * Planted tomatoes in the north bed. Watered all plants.
             */
            notes: string;
            /**
             * example:
             * https://example.com/garden-photo.jpg
             */
            photoUrl?: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        export interface LoginDto {
            email: string;
            password: string;
        }
        export interface MessageResponse {
            message: string;
        }
        export interface RegisterDto {
            email: string;
            password: string;
            name: string;
        }
        export interface ResetPasswordDto {
            token: string;
            newPassword: string;
        }
        export interface UpdateJournalEntryDto {
            /**
             * Updated entry date
             * example:
             * 2024-03-15T10:30:00Z
             */
            date?: string; // date-time
            /**
             * Updated notes
             * example:
             * Planted tomatoes and peppers. Watered all plants thoroughly.
             */
            notes?: string;
            /**
             * Updated photo URL
             * example:
             * https://example.com/updated-photo.jpg
             */
            photoUrl?: string;
        }
        export interface User {
            id: string;
            email: string;
            name: string;
            createdAt: string; // date-time
        }
    }
}
declare namespace Paths {
    namespace AuthControllerForgotPassword {
        export type RequestBody = Components.Schemas.ForgotPasswordDto;
        namespace Responses {
            export type $200 = Components.Schemas.MessageResponse;
            export type $201 = Components.Schemas.MessageResponse;
        }
    }
    namespace AuthControllerGetProfile {
        namespace Responses {
            export type $200 = Components.Schemas.User;
        }
    }
    namespace AuthControllerLogin {
        export type RequestBody = Components.Schemas.LoginDto;
        namespace Responses {
            export type $201 = Components.Schemas.AuthResponse;
        }
    }
    namespace AuthControllerRegister {
        export type RequestBody = Components.Schemas.RegisterDto;
        namespace Responses {
            export type $201 = Components.Schemas.AuthResponse;
        }
    }
    namespace AuthControllerResetPassword {
        export type RequestBody = Components.Schemas.ResetPasswordDto;
        namespace Responses {
            export type $200 = Components.Schemas.MessageResponse;
            export type $201 = Components.Schemas.MessageResponse;
        }
    }
    namespace GardenControllerDiagnose {
        export type RequestBody = Components.Schemas.DiagnosePlantDto;
        namespace Responses {
            export type $201 = Components.Schemas.DiagnosisResponseDto;
        }
    }
    namespace GardenControllerGeneratePlan {
        export type RequestBody = Components.Schemas.CreateGardenPlanDto;
        namespace Responses {
            export type $201 = Components.Schemas.GardenPlanResponseDto;
        }
    }
    namespace GardenControllerGetDiagnoses {
        namespace Responses {
            export type $200 = Components.Schemas.DiagnosisListItemDto[];
        }
    }
    namespace GardenControllerGetProfile {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GardenProfileResponseDto;
            export interface $404 {
            }
        }
    }
    namespace GardenControllerGetProfiles {
        namespace Responses {
            export type $200 = Components.Schemas.GardenProfileResponseDto[];
        }
    }
    namespace JournalControllerCreateEntry {
        export type RequestBody = Components.Schemas.CreateJournalEntryDto;
        namespace Responses {
            export type $201 = Components.Schemas.JournalEntryResponseDto;
            export interface $403 {
            }
        }
    }
    namespace JournalControllerDeleteEntry {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DeleteResponseDto;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace JournalControllerGetEntriesByGarden {
        namespace Parameters {
            export type GardenId = string;
        }
        export interface PathParameters {
            gardenId: Parameters.GardenId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.JournalEntryResponseDto[];
            export interface $403 {
            }
        }
    }
    namespace JournalControllerGetEntry {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.JournalEntryResponseDto;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace JournalControllerUpdateEntry {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.UpdateJournalEntryDto;
        namespace Responses {
            export type $200 = Components.Schemas.JournalEntryResponseDto;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * AuthController_register
   */
  'AuthController_register'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerRegister.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerRegister.Responses.$201>
  /**
   * AuthController_login
   */
  'AuthController_login'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerLogin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerLogin.Responses.$201>
  /**
   * AuthController_forgotPassword
   */
  'AuthController_forgotPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerForgotPassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerForgotPassword.Responses.$200 | Paths.AuthControllerForgotPassword.Responses.$201>
  /**
   * AuthController_resetPassword
   */
  'AuthController_resetPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerResetPassword.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerResetPassword.Responses.$200 | Paths.AuthControllerResetPassword.Responses.$201>
  /**
   * AuthController_getProfile
   */
  'AuthController_getProfile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerGetProfile.Responses.$200>
  /**
   * GardenController_generatePlan - Generate planting plan
   * 
   * Generate an AI-powered planting plan based on garden profile and save it to the database
   */
  'GardenController_generatePlan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GardenControllerGeneratePlan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GardenControllerGeneratePlan.Responses.$201>
  /**
   * GardenController_getProfiles - Get all garden profiles
   * 
   * Retrieve all garden profiles for the authenticated user
   */
  'GardenController_getProfiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GardenControllerGetProfiles.Responses.$200>
  /**
   * GardenController_getProfile - Get garden profile by ID
   * 
   * Retrieve a specific garden profile by its ID
   */
  'GardenController_getProfile'(
    parameters?: Parameters<Paths.GardenControllerGetProfile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GardenControllerGetProfile.Responses.$200>
  /**
   * GardenController_diagnose - Diagnose plant issues
   * 
   * Use AI to diagnose plant problems based on description and optional image
   */
  'GardenController_diagnose'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GardenControllerDiagnose.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GardenControllerDiagnose.Responses.$201>
  /**
   * GardenController_getDiagnoses - Get all plant diagnoses
   * 
   * Retrieve all plant diagnoses for the authenticated user
   */
  'GardenController_getDiagnoses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GardenControllerGetDiagnoses.Responses.$200>
  /**
   * JournalController_createEntry - Create journal entry
   * 
   * Create a new journal entry for a garden
   */
  'JournalController_createEntry'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.JournalControllerCreateEntry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.JournalControllerCreateEntry.Responses.$201>
  /**
   * JournalController_getEntriesByGarden - Get journal entries by garden
   * 
   * Retrieve all journal entries for a specific garden
   */
  'JournalController_getEntriesByGarden'(
    parameters?: Parameters<Paths.JournalControllerGetEntriesByGarden.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.JournalControllerGetEntriesByGarden.Responses.$200>
  /**
   * JournalController_getEntry - Get journal entry by ID
   * 
   * Retrieve a specific journal entry
   */
  'JournalController_getEntry'(
    parameters?: Parameters<Paths.JournalControllerGetEntry.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.JournalControllerGetEntry.Responses.$200>
  /**
   * JournalController_updateEntry - Update journal entry
   * 
   * Update an existing journal entry
   */
  'JournalController_updateEntry'(
    parameters?: Parameters<Paths.JournalControllerUpdateEntry.PathParameters> | null,
    data?: Paths.JournalControllerUpdateEntry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.JournalControllerUpdateEntry.Responses.$200>
  /**
   * JournalController_deleteEntry - Delete journal entry
   * 
   * Delete a journal entry
   */
  'JournalController_deleteEntry'(
    parameters?: Parameters<Paths.JournalControllerDeleteEntry.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.JournalControllerDeleteEntry.Responses.$200>
}

export interface PathsDictionary {
  ['/auth/register']: {
    /**
     * AuthController_register
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerRegister.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerRegister.Responses.$201>
  }
  ['/auth/login']: {
    /**
     * AuthController_login
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerLogin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerLogin.Responses.$201>
  }
  ['/auth/forgot-password']: {
    /**
     * AuthController_forgotPassword
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerForgotPassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerForgotPassword.Responses.$200 | Paths.AuthControllerForgotPassword.Responses.$201>
  }
  ['/auth/reset-password']: {
    /**
     * AuthController_resetPassword
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerResetPassword.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerResetPassword.Responses.$200 | Paths.AuthControllerResetPassword.Responses.$201>
  }
  ['/auth/profile']: {
    /**
     * AuthController_getProfile
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerGetProfile.Responses.$200>
  }
  ['/garden/plan']: {
    /**
     * GardenController_generatePlan - Generate planting plan
     * 
     * Generate an AI-powered planting plan based on garden profile and save it to the database
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GardenControllerGeneratePlan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GardenControllerGeneratePlan.Responses.$201>
  }
  ['/garden/profiles']: {
    /**
     * GardenController_getProfiles - Get all garden profiles
     * 
     * Retrieve all garden profiles for the authenticated user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GardenControllerGetProfiles.Responses.$200>
  }
  ['/garden/profiles/{id}']: {
    /**
     * GardenController_getProfile - Get garden profile by ID
     * 
     * Retrieve a specific garden profile by its ID
     */
    'get'(
      parameters?: Parameters<Paths.GardenControllerGetProfile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GardenControllerGetProfile.Responses.$200>
  }
  ['/garden/diagnose']: {
    /**
     * GardenController_diagnose - Diagnose plant issues
     * 
     * Use AI to diagnose plant problems based on description and optional image
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GardenControllerDiagnose.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GardenControllerDiagnose.Responses.$201>
  }
  ['/garden/diagnoses']: {
    /**
     * GardenController_getDiagnoses - Get all plant diagnoses
     * 
     * Retrieve all plant diagnoses for the authenticated user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GardenControllerGetDiagnoses.Responses.$200>
  }
  ['/journal']: {
    /**
     * JournalController_createEntry - Create journal entry
     * 
     * Create a new journal entry for a garden
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.JournalControllerCreateEntry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.JournalControllerCreateEntry.Responses.$201>
  }
  ['/journal/garden/{gardenId}']: {
    /**
     * JournalController_getEntriesByGarden - Get journal entries by garden
     * 
     * Retrieve all journal entries for a specific garden
     */
    'get'(
      parameters?: Parameters<Paths.JournalControllerGetEntriesByGarden.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.JournalControllerGetEntriesByGarden.Responses.$200>
  }
  ['/journal/{id}']: {
    /**
     * JournalController_getEntry - Get journal entry by ID
     * 
     * Retrieve a specific journal entry
     */
    'get'(
      parameters?: Parameters<Paths.JournalControllerGetEntry.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.JournalControllerGetEntry.Responses.$200>
    /**
     * JournalController_updateEntry - Update journal entry
     * 
     * Update an existing journal entry
     */
    'put'(
      parameters?: Parameters<Paths.JournalControllerUpdateEntry.PathParameters> | null,
      data?: Paths.JournalControllerUpdateEntry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.JournalControllerUpdateEntry.Responses.$200>
    /**
     * JournalController_deleteEntry - Delete journal entry
     * 
     * Delete a journal entry
     */
    'delete'(
      parameters?: Parameters<Paths.JournalControllerDeleteEntry.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.JournalControllerDeleteEntry.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AuthResponse = Components.Schemas.AuthResponse;
export type CreateGardenPlanDto = Components.Schemas.CreateGardenPlanDto;
export type CreateJournalEntryDto = Components.Schemas.CreateJournalEntryDto;
export type DeleteResponseDto = Components.Schemas.DeleteResponseDto;
export type DiagnosePlantDto = Components.Schemas.DiagnosePlantDto;
export type DiagnosisListItemDto = Components.Schemas.DiagnosisListItemDto;
export type DiagnosisResponseDto = Components.Schemas.DiagnosisResponseDto;
export type ForgotPasswordDto = Components.Schemas.ForgotPasswordDto;
export type GardenPlanResponseDto = Components.Schemas.GardenPlanResponseDto;
export type GardenProfileResponseDto = Components.Schemas.GardenProfileResponseDto;
export type JournalEntryResponseDto = Components.Schemas.JournalEntryResponseDto;
export type LoginDto = Components.Schemas.LoginDto;
export type MessageResponse = Components.Schemas.MessageResponse;
export type RegisterDto = Components.Schemas.RegisterDto;
export type ResetPasswordDto = Components.Schemas.ResetPasswordDto;
export type UpdateJournalEntryDto = Components.Schemas.UpdateJournalEntryDto;
export type User = Components.Schemas.User;
