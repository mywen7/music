export interface PanelInfo{
  title: string;
  content: string[];
}

interface Nomal {
  id: number;
  name: string;
}
export interface Song {
  id: number;
  name: string;
  artists?: string;
  album?: Nomal;
}
export interface SongSection {
  title: string;
  type: string;
  content: Song[];
}

export enum TypeEnum {
  单曲 = 'songs', 歌单 = 'playlists',
  MV = 'mvs', 歌手 = 'artists',
  专辑 = 'albums',
}