// React
import { useMemo, useRef } from 'react';
// Styled
import * as S from '../../styles/main/search.style';

const SearchComponent = ({ onSearch }) => {
  // 하단 랭킹의 탭 state가 변경되어도 값이 바뀌지 않게 하기 위해
  const num = useMemo(() => Math.floor(Math.random() * 10) + 1, []);

  const search = useRef();

  return (
    <>
      <S.SearchLayout bgnum={num}>
        <div className="container">
          <div className="title">
            <div className="typing">나의 전적을 분석해보세요.</div>
          </div>
          <div className="box">
            <input placeholder="소환사명 입력하기" ref={search} />
            <img
              src="image/search.svg"
              onClick={() => onSearch(search.current.value)}
            />
          </div>
        </div>
      </S.SearchLayout>
      <S.TaggingContainer>
        <p className="title">
          &#128161; 나의 <b>롤BTI</b>는 무엇일까?
        </p>
        <button className="btn">검사하기</button>
      </S.TaggingContainer>
    </>
  );
};

export default SearchComponent;
