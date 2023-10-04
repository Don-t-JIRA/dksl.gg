// Jotai
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
// Service
import { getSummonerGroup } from '../services/GroupService';

const getGroup = async (name) => {
  if (name == null || name == undefined) {
    return null;
  }
  console.log(name);
  const data = await getSummonerGroup(name);
  if (data.status == 200) {
    return data.data;
  } else {
    throw new Error('Group Data Fetching Error');
  }

};

const groupAtom = atomWithDefault(getGroup);

const updateGroupAtom = atom(null, async (get, set, update) => {
  set(groupAtom, await getGroup(update));
});

export const useUpdateGroup = () => useSetAtom(updateGroupAtom);

export const useGroup = () => useAtomValue(groupAtom);
