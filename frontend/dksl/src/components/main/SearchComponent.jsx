import * as S from '../../styles/main/search.style';

const SearchComponent = () => {
  return (
    <>
    
    <S.SearchLayout>
      <S.SearchContainer>
        <S.SearchTitle>나의 전적을 분석해보세요.</S.SearchTitle>
        <S.SearchBox>
          <S.SearchInput placeholder='소환사명 입력하기' />
          <S.SearchBtn src='/src/assets/search.svg' />
        </S.SearchBox>
      </S.SearchContainer>
    </S.SearchLayout>
    <S.TaggingContainer>
      <S.TaggingTitle>&#128161; 나의 <b>롤BTI</b>는 무엇일까?</S.TaggingTitle>
      <S.LbtiBtn>검사하기</S.LbtiBtn>
    </S.TaggingContainer>
    </>
  );
}

export default SearchComponent;