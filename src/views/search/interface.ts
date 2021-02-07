export interface PanelInfo{
  title: string;
  content: string[];
}

interface NomalName {
  id: number;
  name: string;
}
export interface NomalType {
  id: number;
  type: string;
}
export interface Song extends NomalName{
  artists?: string;
  album?: NomalName;
}
export interface SongSection {
  title: string;
  type: string;
  content: Song[];
}

export enum TypeEnum {
  song = '单曲', playlist = '歌单',
  mv = 'MV', artist = '歌手',
  album = '专辑',
}
export enum SearchType {
  song = '1', album = '10', artist = '100',
  playlist = '1000', mv = '1004',
}