// import { useState } from 'react';
import MainComponent from "../components/MainComponent";
import TestComponent from "../components/TestComponent";
import countAtom from "../jotai/testCount";
import { useAtom } from "jotai";
import CalendarComponent from "../components/CalendarComponent";
import { calenderData, pieData } from "../data";
import * as S from '../styles/common/main.style';

const MainContainer = () => {
  // const [count, setCount] = useState(0);
  const [count, setCount] = useAtom(countAtom);

  return (
    <>
      <MainComponent count={count} setCount={setCount} />
      <TestComponent />
      <S.mainDiv>
        <CalendarComponent data={pieData} />
      </S.mainDiv>
      <S.mainDiv>
        <CalendarComponent data={calenderData} type />
      </S.mainDiv>
    </>
  );
};

export default MainContainer;
