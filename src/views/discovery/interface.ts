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

export type PlaylistKey = keyof Playlist;

export type PlaylistUncertain = {
  [key in PlaylistKey]?: Playlist[key];
}
export interface Song {
  id: number;
  artist: string;
  name: string;
  img: string;
}

export interface MV {
  id: number;
  name: string;
  artist: string;
  img: string;
  playCount: number;
}
