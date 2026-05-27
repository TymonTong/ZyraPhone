import { useRouter } from 'vue-router'
import { ROUTE_LOGIN } from '../router'

export function useGoLogin() {
  const router = useRouter()

  function goLogin() {
    router.push(ROUTE_LOGIN)
  }

  return { goLogin }
}
