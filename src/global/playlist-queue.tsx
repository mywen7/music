import http from '@/libs/fetch';
import { Song } from '@/views/songs/interface';
import { ref, Ref } from 'vue';

export const songList: Ref<Song[]> = ref([]);

export const fetchPlayList = async (id: number) => {
  try {
    const res = await http('/playlist/detail', {
      method: 'GET',
      query: {
        id,
      },
    });
    const trackIds = res.playlist.trackIds.map((ele: any) => ele.id).join(',');
    await http('song/detail', {
      method: 'GET',
      query: {
        ids: trackIds,
      }
    })
    songList.value = res.songs.map((ele: any) => {
      return {
        id: ele.id,
        name: ele.name,
        albumName: ele.al.name,
        duration: ele.dt,
        imgUrl: ele.al.picUrl,
        artists: ele.ar.map((a: any) => a.name).join('/'),
        mvId: ele.mv,
      }
    });
  } catch (e) {
    console.log('歌单列表获取出错了！')
  }
};
