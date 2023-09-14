import * as S from '../../styles/main/ranking.style';

const RankingComponent = (props) => {
  // const arr 
  return (
    <S.RankingLayout>
      <div className='container'>
        <p className='title'>
          &#127942; 명예의 전당
        </p>
        <S.TabBox>
          <S.TabItem istab={props.hofTab == 0 ? 1 : 0} onClick={() => props.setHofTab(0)}>일간</S.TabItem>
          <S.TabItem istab={props.hofTab == 1 ? 1 : 0} onClick={() => props.setHofTab(1)}>주간</S.TabItem>
          <S.TabItem istab={props.hofTab == 2 ? 1 : 0} onClick={() => props.setHofTab(2)}>월간</S.TabItem>
        </S.TabBox>
        <S.ContentTable>
          <S.ContentItem>
            <p className='idx'>

            </p>
            <img className='image' src='src/assets/dkslhead.svg'>

            </img>
            <p className='name'>

            </p>
            <p className='tier'>
              
            </p>
          </S.ContentItem>
        </S.ContentTable>
      </div>
      <div className='container'>
        <p className='title'>
          &#127969; 소속 별 순위
        </p>
      </div>
    </S.RankingLayout>
  );
}

export default RankingComponent;