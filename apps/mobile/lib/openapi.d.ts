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
    export interface ForgotPasswordDto {
      email: string;
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
}

export interface OperationMethods {
  /**
   * AuthController_register
   */
  'AuthController_register'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerRegister.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AuthControllerRegister.Responses.$201>;
  /**
   * AuthController_login
   */
  'AuthController_login'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerLogin.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AuthControllerLogin.Responses.$201>;
  /**
   * AuthController_forgotPassword
   */
  'AuthController_forgotPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerForgotPassword.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<
    | Paths.AuthControllerForgotPassword.Responses.$200
    | Paths.AuthControllerForgotPassword.Responses.$201
  >;
  /**
   * AuthController_resetPassword
   */
  'AuthController_resetPassword'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerResetPassword.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<
    | Paths.AuthControllerResetPassword.Responses.$200
    | Paths.AuthControllerResetPassword.Responses.$201
  >;
  /**
   * AuthController_getProfile
   */
  'AuthController_getProfile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.AuthControllerGetProfile.Responses.$200>;
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
    ): OperationResponse<Paths.AuthControllerRegister.Responses.$201>;
  };
  ['/auth/login']: {
    /**
     * AuthController_login
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerLogin.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AuthControllerLogin.Responses.$201>;
  };
  ['/auth/forgot-password']: {
    /**
     * AuthController_forgotPassword
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerForgotPassword.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<
      | Paths.AuthControllerForgotPassword.Responses.$200
      | Paths.AuthControllerForgotPassword.Responses.$201
    >;
  };
  ['/auth/reset-password']: {
    /**
     * AuthController_resetPassword
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerResetPassword.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<
      | Paths.AuthControllerResetPassword.Responses.$200
      | Paths.AuthControllerResetPassword.Responses.$201
    >;
  };
  ['/auth/profile']: {
    /**
     * AuthController_getProfile
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.AuthControllerGetProfile.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;

export type AuthResponse = Components.Schemas.AuthResponse;
export type ForgotPasswordDto = Components.Schemas.ForgotPasswordDto;
export type LoginDto = Components.Schemas.LoginDto;
export type MessageResponse = Components.Schemas.MessageResponse;
export type RegisterDto = Components.Schemas.RegisterDto;
export type ResetPasswordDto = Components.Schemas.ResetPasswordDto;
export type User = Components.Schemas.User;
