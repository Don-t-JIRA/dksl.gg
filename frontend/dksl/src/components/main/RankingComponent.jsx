import * as S from '../../styles/main/ranking.style';

const RankingComponent = (props) => {
  // const arr 
  return (
    <S.RankingLayout>
      <S.HOFContainer>
        <S.SectionTitle>
          &#127942; 명예의 전당
        </S.SectionTitle>
        <S.TabBox>
          <S.TabItem isActive={props.hofTab == 0} onClick={() => props.setHofTab(0)}>일간</S.TabItem>
          <S.TabItem isActive={props.hofTab == 1} onClick={() => props.setHofTab(1)}>주간</S.TabItem>
          <S.TabItem isActive={props.hofTab == 2} onClick={() => props.setHofTab(2)}>월간</S.TabItem>
        </S.TabBox>
        {/* <S.ContentBox>
          {}
        </S.ContentBox> */}
      </S.HOFContainer>
      <S.RankContainer>
        <S.SectionTitle>
          &#127969; 소속 별 순위
        </S.SectionTitle>
      </S.RankContainer>
    </S.RankingLayout>
  );
}

export default RankingComponent;