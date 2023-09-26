import { atom, useSetAtom, useAtomValue } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

const getAuth = async () => {
  const token = {
    accessToken: sessionStorage.getItem('accessToken'),
    refreshToken: sessionStorage.getItem('refreshToken'),
  };

  if (token.accessToken) {

  }

  if (token.refreshToken) {
    const refresh = await reAccessToken();
    if (refresh.status == 200) {
      sessionStorage.setItem('accessToken', refresh.data.accessToken);

      
    }
  }
}

const authAtom = atomWithDefault(getAuth);

const updateAuthAtom = atom(null, async (get, set) => {
  set(authAtom, await getAuth());
});

export const useUpdateAuth = () => useSetAtom(updateAuthAtom);

export const useAuth = () => useAtomValue(authAtom);