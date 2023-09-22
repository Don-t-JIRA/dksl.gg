// Styled
import * as S from '@/styles/group/main.style';
// router
import { useNavigate } from 'react-router-dom';

const GroupMainComponent = () => {
  const navigate = useNavigate();

  const onSearch = () => {
    navigate('/record');
  }
  return (
    <S.GroupMainLayout>
      <S.MainContainer>
        <div className="create-btn-box">
          <p className="title">소속에 가입하여 <br /> 소환사들과의 순위를 비교해 보세요.</p>
          <a className="create-btn">소속 만들기</a>
        </div>
        <div className="current-group">
          <p className="title">&#127969; 최근 소환사들이 가입한 소속</p>
          <div className="profile-box">
            <S.GroupProfile>
              <div className="image">
                <img src="image/react.svg" alt="profile_img" />
              </div>
              <div className="description">
                <p className="name">SSAFY 9기</p>
                <p className="personnel"><b>인원</b> 297명</p>
              </div>
            </S.GroupProfile>
            <S.GroupProfile>
              <div className="image">
                <img src="image/react.svg" alt="profile_img" />
              </div>
              <div className="description">
                <p className="name">SSAFY 9기</p>
                <p className="personnel"><b>인원</b> 297명</p>
              </div>
            </S.GroupProfile>
            <S.GroupProfile>
              <div className="image">
                <img src="image/react.svg" alt="profile_img" />
              </div>
              <div className="description">
                <p className="name">SSAFY 9기</p>
                <p className="personnel"><b>인원</b> 297명</p>
              </div>
            </S.GroupProfile>
          </div>
        </div>
        <div className="search-box">
          <div className='search-input'>
            <input placeholder='소속명 입력하기' />
            <img src='image/search.svg' onClick={() => onSearch()} />
          </div>
          <div className="result-box">
            <p className="title">&#127969; 검색 소속</p>
            <div className="result-body">
              <div className="result-row">
                <div className="image-area">
                  <img src="image/lbti-img.svg" alt="group-img" />
                </div>
                <div className="name-area">
                  <p>SSAFY 9기</p>
                </div>
                <div className="desc-area">
                  <p>
                    &#127775; SSAFY 9기 모여라!! SAMSUNG Software Academy ...
                  </p>
                </div>
              </div>
              <div className="result-row">
                <div className="image-area">
                  <img src="image/lbti-img.svg" alt="group-img" />
                </div>
                <div className="name-area">
                  <p>SSAFY 9기</p>
                </div>
                <div className="desc-area">
                  <p>
                    &#127775; SSAFY 9기 모여라!! SAMSUNG Software Academy ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </S.MainContainer>
    </S.GroupMainLayout>
  );
}

export default GroupMainComponent;