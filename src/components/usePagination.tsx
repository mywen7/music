import { onMounted, reactive, ref, Ref, UnwrapRef, watch } from 'vue';

export { default as Pagination} from './pagination.vue';

interface Response<T> {
  total: number;
  items: T[];
}
interface Request {
  page: number;
  size: number;
  tag: string[];
}
type Fetch<T> = (request: Request) => Promise<Response<T>>;

export interface PageProps<T> {
  page: Ref<number>,
  size: Ref<number>,
  tag: Ref<string[]>,
  total: Ref<number>,
  onPageChange: (size: number) => void;
  items: Ref<UnwrapRef<T[]>>;
  banner?: Ref<UnwrapRef<T>>;
  fetchdata: () => Promise<void>;
};

export default function usePage<T>(fetch: Fetch<T>): PageProps<T> {
  const size = ref(50);
  const page = ref(1);
  const tag = ref(['全部']);
  const total = ref(0);
  const onPageChange = (_page: number) => {
    page.value = _page;
  };

  const items = ref<T[]>([]);

  const fetchdata = async () => {
    try {
      const response = await fetch({page: page.value, size: size.value, tag: tag.value});
      total.value = response.total;
      // @ts-ignore
      items.value = response.items;
    } catch (e) {
      console.log('error in usePagination');
    }
  };
  watch(page, fetchdata);
  watch(tag, () => {
    if (page.value === 1) {
      fetchdata();
    } else {
      page.value = 1;
    }
  }, {
    deep: true,
  });
  onMounted(fetchdata);
  return {
    size,
    page,
    items,
    tag,
    total,
    fetchdata,
    onPageChange,
  }
}