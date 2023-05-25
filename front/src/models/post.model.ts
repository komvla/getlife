export interface Post {
  id: number;
  userId: number;
  numberOfComments?: number | null;
  title?: string;
  body?: string;
  author?: string | null;
}
