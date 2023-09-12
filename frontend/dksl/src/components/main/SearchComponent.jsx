import * as S from '../../styles/main/search.style';

const SearchComponent = () => {
  return (
    <>
    
    <S.SearchLayout>
      <S.SearchContainer>
        <S.SearchTitle>나의 전적을 분석해보세요.</S.SearchTitle>
        <S.SearchBox>
          <S.SearchInput placeholder='소환사명 입력하기' />
          <S.SearchBtn />
        </S.SearchBox>
      </S.SearchContainer>
    </S.SearchLayout>
    <S.TaggingContainer></S.TaggingContainer>
    </>
  );
}

export default SearchComponent;