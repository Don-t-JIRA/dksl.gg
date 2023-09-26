import TestChartComponent from "../components/TestChartComponent";
import MainComponent from "../components/MainComponent";
import TestComponent from "../components/TestComponent";
import { laderData } from "../data";
import CalendarComponent from "../components/CalendarComponent";
import countAtom from "../jotai/testCount";
import { useAtom } from "jotai";
import { calenderData, pieData } from "../data";
import * as S from '../styles/main.style';

const TestContainer = () => {
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
      <S.mainDiv>
        <TestChartComponent data={laderData} />
      </S.mainDiv>
    </>
  );
};

export default TestContainer;
