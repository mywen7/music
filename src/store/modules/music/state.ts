import { SongInfo } from '../../../player/interface';

const currentSong: SongInfo = {
  id: 0,
  name: '',
  artists: '',
  imgUrl: '',
  duration: 0,
}
export default {
  // 当前播放歌曲
  currentSong,
  // 当前播放时长，
  currentTime: 0 ,
}