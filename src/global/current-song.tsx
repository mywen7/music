import { SongInfo, PlayingSong } from '@/player/interface';
import { ref, Ref, watch } from 'vue';

export const currentSong: Ref<SongInfo> = ref({
  id: 0,
  name: '',
  imgUrl: '',
  artists: '',
  duration: 0,
});

export const playingSong: Ref<PlayingSong> = ref({
  id: 0,
  name: '',
  imgUrl: '',
  artists: '',
  duration: 0,
  url: '',
})
const fetchSong = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}


export const createCurrentSong = () => {
  const songUrl = fetchSong(currentSong.value.id);
  playingSong.value =  {
    ...currentSong.value,
    url: songUrl,
  }
}

watch(() => currentSong.value.id, () => {
  if (currentSong.value.id) {
    createCurrentSong();
  }
});

export const isPlaying: Ref<boolean> = ref(false);

