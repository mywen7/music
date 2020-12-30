export interface Banner {
  imageUrl: string;
  url: string;
}
export interface Playlist {
  id: number;
  img: string;
  desc: string;
  title: string;
}

export type PlayListCard = keyof Playlist;

export type PlaylistCardUncertain =  {
  [key in PlayListCard]?: Playlist[key]
}
