import { goto } from '@utils/goto';

export function* logoutSuccessHandler() {
  yield goto('/');
}
