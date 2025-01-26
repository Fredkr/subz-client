export type GetCursorRequest = {
  sortField?: string;
  sortDirection?: string;
  cursor?: string | null;
  limit?: number;
};
