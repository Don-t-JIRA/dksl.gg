// React
import { useRef } from 'react';
// Styled
import * as S from '@/styles/record/tabreview.style';
// Componnet
import LoadingComponent from '../../common/LoadingComponent';

const TabReviewComponent = ({ reviewList }) => {
  const search = useRef();
  reviewList = ['NoDasdta'];

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
              <div className="review-body">
                <S.CommentBox>
                  <div className="profile-section">
                    <div className="profile">
                      <img src="/image/react.svg" alt="icons" className="icon" />
                      <img src="/image/rank-icons/master.png" alt="tier" className="tier" />
                      <p className="name">Meannnn</p>
                    </div>
                    <p className="time">2019-11-12 16:34</p>
                  </div>
                  <div className="content-section">
                    <p className="content">
                      착한 유저입니다!
                    </p>
                  </div>
                </S.CommentBox>
              </div>
            </div>
            <div className="search-input">
              <input placeholder="" ref={search} />
              <img src="/image/send.png" onClick={() => onSearch()} />
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
