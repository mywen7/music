export interface Song {
  id: number;
  name: string;
  albumName: string;
  duration: number;
  imgUrl: string;
  artists: string;
  mvId: number;
}

export enum SongType {
  '全部' = 0,
  '华语' = 7,
  '欧美' = 96,
  '日本' = 8,
  '韩国' = 16,
}