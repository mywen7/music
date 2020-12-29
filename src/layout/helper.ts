import { useRouter } from 'vue-router';

export function getSidebarRoutes() {
  const router = useRouter();
  const routes = router.getRoutes();
  return routes
    .filter((r) => r.children.length === 0)
    .filter((route) => route.meta.sidebar);
}