// React
import { useMemo } from 'react';
// Styled
import * as S from '../../styles/main/search.style';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  // 하단 랭킹의 탭 state가 변경되어도 값이 바뀌지 않게 하기 위해
  const num = useMemo(() => Math.floor(Math.random() * 10) + 1, []);

  const navigate = useNavigate();

  const onSearch = () => {
    navigate('/record');
  }

  return (
    <>
      <S.SearchLayout bgnum={num}>
        <div className='container'>
          <div className='title'>나의 전적을 분석해보세요.</div>
          <div className='box'>
            <input placeholder='소환사명 입력하기' />
            <img src='/src/assets/search.svg' onClick={() => onSearch()} />
          </div>
        </div>
      </S.SearchLayout>
      <S.TaggingContainer>
        <p className='title'>&#128161; 나의 <b>롤BTI</b>는 무엇일까?</p>
        <button className='btn'>검사하기</button>
      </S.TaggingContainer>
    </>
  );
}

export default SearchComponent;