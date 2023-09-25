// React
import { useRef } from 'react';
// Styled
import * as S from '@/styles/record/tabreview.style';
// Componnet
import LoadingComponent from '../../common/LoadingComponent';

const TabReviewComponent = ({ reviewList }) => {
  const search = useRef();
  reviewList = ['NoDadsta'];

  const onSearch = () => {
    console.log(search.current.value);
  };

  return (
    <S.TabReviewLayout>
      {reviewList ? (
        reviewList[0] == 'NoData' ? (
          <S.EmptyReviewLayout>
            <h1 className="icon">&#127969;</h1>
            <p className="head">리뷰가 존재하지 않습니다.</p>
            <p className="desc">해당 소환사에 대한 리뷰가 없습니다.</p>
            <p className="desc">소환사에게 리뷰를 남겨주세요!</p>
            <div className="search-input">
              <input placeholder="" ref={search} />
              <img src="/image/send.png" onClick={() => onSearch()} />
            </div>
          </S.EmptyReviewLayout>
        ) : (
          <S.ReviewContainer>
            <div className="review-box">
              <p className="title">&#127969; 리뷰</p>
              <div className="review-body"></div>
            </div>
          </S.ReviewContainer>
        )
      ) : (
        <LoadingComponent />
      )}
    </S.TabReviewLayout>
  );
};

export default TabReviewComponent;
