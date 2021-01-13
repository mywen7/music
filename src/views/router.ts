import { useRouter } from 'vue-router';

export function RouterPush() {
  const router = useRouter();
  const routerPush = (name: string, id: number) => {
    router.push({
      name,
      query: {
        id,
      },
    });
  }
  return {
    routerPush,
  }
}
