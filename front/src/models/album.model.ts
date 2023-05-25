export interface Album {
  id: number;
  userId: number;
  title?: string;
  numberOfPhotos?: number | null;
  author?: string | null;
}
