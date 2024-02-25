export function Refine_MongoId(data: string | undefined): boolean {
  return data ? !!data.match(/^[0-9a-fA-F]{24}$/)?.[0] : true;
}
