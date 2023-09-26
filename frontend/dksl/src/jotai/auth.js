import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { getMember } from '../services/UserService';

const getAuth = async () => {
  const token = {
    access: sessionStorage.getItem('accessToken'),
    refresh: sessionStorage.getItem('refreshToken'),
  };

  if (token.access) {
    const reAuth = await getMember();
    if (reAuth.status == 200) return reAuth.data;
  }

  if (token.refres) {
    const reAccess = await reAccessToken();
    if (reAccess.status == 200) {
      sessionStorage.setItem('accessToken', reAccess.data.accessToken);

      const reAuth = await getMember();
      if (reAuth.status == 200) return reAuth.data;
    }
  }

  return null;
}

const authAtom = atomWithDefault(getAuth);

const updateAuthAtom = atom(null, async (get, set) => {
  set(authAtom, await getAuth());
});

export const useUpdateAuth = () => useSetAtom(updateAuthAtom);

export const useAuth = () => useAtomValue(authAtom);


