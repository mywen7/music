export interface SongInfo {
  id: number;
  name: string;
  artists: string;
  imgUrl: string;
  currentTime: number;
  duration: number;
}
export interface PlayingSong extends SongInfo {
  url: string;
}
export interface ModeMap {
  icon: string;
  name: string;
}
