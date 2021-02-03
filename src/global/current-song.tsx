import { SongInfo } from "@/player/interface";
import { ref, Ref } from "vue";

export const currentSong: Ref<SongInfo> = ref({
  name: '余额',
  imgUrl: 'https://p3.music.126.net/oro9WEGcXWgFamaoe1EtuQ==/19242552997932998.jpg',
  artist: '孙燕姿',
  currentTime: 185546,
  duration: 185546,
});
