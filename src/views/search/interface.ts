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
  title: TypeEnum;
  type: string;
  content: Song[];
}

export enum TypeEnum {
  song = '单曲', playlist = '歌单',
  mv = 'MV', artist = '歌手',
  album = '专辑',
}