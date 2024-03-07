export * as ActivitySchema from "./Activity";
export * as CardlistSchema from "./CardList";
export * as FeatureSchema from "./Feature";
export * as BoardSchema from "./Board";
export * as UserSchema from "./User";
export * as WorkspaceSchema from "./Workspace";

export const COLLECTION_NAMES = [
  "cardlists",
  "boards",
  "workspaces",
  "users",
  "members",
] as const;
