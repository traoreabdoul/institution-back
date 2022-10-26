export const DEFAULT_POSTGRES_PORT = "5432";
export const DEFAULT_POSTGRES_USER = "postgres";
export const DEFAULT_POSTGRES_DB = "postgres";
export const ACCESS_TOKEN_DURATION = "15m";
export const REFRESH_TOKEN_DURATION = "7d";
export const CONFIRM_TOKEN_DURATION_HOURS = 48;
export const CONVERT_MILLISECONDS_IN_HOURS = 3600000;
export enum Environment {
  Production = "prod",
  Dev = "staging",
}
export enum UserStatus {
  ENABLE = "enable",
  DISABLE = "disable",
  BLOCK = "block",
}
export enum EvaluationStatus {
  ATTENTE = "en attente",
  VALIDE = "valide",
  REJETE = "rejete",
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MANAGER = "manager",
}

export enum HttpErrorCode {
  ACCOUNT_NOT_UNIQUE_ERROR = 23505,
}
