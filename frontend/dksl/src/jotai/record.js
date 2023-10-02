import { sample } from '../data';
import { spell } from '../spell';
import { rune } from '../rune';
import { atomWithDefault } from 'jotai/utils';
import { useAtomValue } from 'jotai';

// 함께한 소환사 아이콘, 이름, 게임 수, 승-패, 승률 메서드
// 20 게임의 매치 데이터와 검색된 소환사 받기
const getDuoPlayer = (data, cur) => {
  const result = [];
  const map = new Map();

  data.forEach((e, i) => {
    // e.forEach((v, j) => {
    //   if (!map.has(v.summoner_name))
    // })
  });

  return result;
};

// 획득 골드량 포맷팅 메서드
const formatGold = (number) => {
  if (number >= 10000) {
    const quotient = Math.floor(number / 1000);
    return `${quotient / 10}만`;
  }
  if (number >= 1000) {
    const quotient = Math.floor(number / 100);
    return `${quotient / 10}천`;
  }
  return number.toString();
};

// 요청 데이터 가공 메서드
const formattingData = async () => {
  let win = 0;
  const user = sample.profile[0].summoner_name;

  const duoPlayer = await getDuoPlayer(sample.match_histories, user);
  console.log(duoPlayer);

  const arr = sample.match_histories.map((e) => {
    let cur;
    let summary = [[], []];
    // 매치마다 시간 계산
    const timestamp = e[0].play_time;
    const now = new Date();
    const time = Math.floor((now - timestamp) / 1000);
    let match_ago;
    if (time / 3600 > 23) {
      match_ago = `${Math.floor(time / 3600 / 24)}일 전`;
    } else {
      if ((time % 3600) / 60 < 60) {
        match_ago = `${Math.floor((time % 3600) / 60)}분 전`;
      } else {
        match_ago = `${Math.floor(time / 3600)}시간 전`;
      }
    }

    // 매치 별 플레이 시간 가공
    const str = e[0].play_duration.split('');
    if (str.length < 5) {
      e[0].play_duration = str[0] + str[1] + ':' + str[2] + str[3];
    }

    const winner = [];
    const loser = [];

    e.forEach((v, i) => {
      // 소환사마다 획득 골드 계산
      const gold = v.gold;
      v.gold = formatGold(gold);

      // 소환사 스펠 정보 가공
      const spell_0 = v.spell_0_id;
      const spell_1 = v.spell_1_id;

      if (typeof spell_0 == 'number') {
        v.spell_0_id = spell.data[spell_0].id;
        v.spell_1_id = spell.data[spell_1].id;
      }

      // 소환사 룬 정보 가공
      const rune_0 = v.rune_0_id;
      const rune_1 = v.rune_1_id;

      if (typeof rune_0 == 'number') {
        rune.forEach((e) => {
          if (e.id == rune_0) {
            const rune_icon = e.icon.split('/');
            const end_str = rune_icon[rune_icon.length - 1].split('.')[0];
            v.rune_0_id = end_str;
          }
          if (e.id == rune_1) {
            const rune_icon = e.icon.split('/');
            const end_str = rune_icon[rune_icon.length - 1].split('.')[0];
            v.rune_1_id = end_str;
          }
        });
      }

      // 이긴 소환사 진 소환사 정보 가공
      if (v.win_or_lose == 0) {
        summary[1].push({
          name: v.summoner_name,
          champ: v.champion_name_en,
        });
        loser.push(v);
      } else {
        summary[0].push({
          name: v.summoner_name,
          champ: v.champion_name_en,
        });
        winner.push(v);
      }

      // 검색된 소환사 저장
      if (v.summoner_name == user) {
        cur = i;
        win = v.win_or_lose;
      }
    });

    // 계산된 매치 시간대 저장
    e[cur].play_time = match_ago;

    // 객체 배열로 리턴
    return {
      win,
      cur,
      summary,
      data: e,
      winner,
      loser,
    };
  });

  // 가공된 데이터 리턴
  return {
    profile: sample.profile[0],
    match_histories: arr,
  };
};

const recordAtom = atomWithDefault(formattingData);

// const updateRecordAtom = atom(null, async (get, set) => {
//   set(recordAtom, await getRecord());
// });

export const useRecord = () => useAtomValue(recordAtom);

// export const useUpdateRecord = () => useSetAtom(updateRecordAtom);
