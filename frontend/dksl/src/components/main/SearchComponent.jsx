import * as S from '../../styles/main/search.style';

const SearchComponent = () => {
  const num = Math.floor(Math.random() * 10) + 1;

  return (
    <>
      <S.SearchLayout bgnum={num}>
        <div className='container'>
          <div className='title'>나의 전적을 분석해보세요.</div>
          <div className='box'>
            <input placeholder='소환사명 입력하기' />
            <img src='/src/assets/search.svg' />
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