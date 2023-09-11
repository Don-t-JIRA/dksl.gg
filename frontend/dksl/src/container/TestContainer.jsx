import TestChartComponent from "../components/TestChartComponent";
import { laderData } from "../data";
import * as S from '../styles/common/main.style';

const TestContainer = () => {
  return (
    <>
      <S.mainDiv>
        <TestChartComponent data={laderData} />
      </S.mainDiv>
    </>
  );
};

export default TestContainer;
