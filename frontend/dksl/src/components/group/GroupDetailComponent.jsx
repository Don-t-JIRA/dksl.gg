// Styled
import * as S from '@/styles/group/detail.style';

const GroupDetailComponent = ({ detailList }) => {
  const getByteToImage = (imgSrc) => {
    const binaryString = atob(imgSrc);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const img = new Blob([bytes], {
      type: 'image/jpg',
    });
    console.log(URL.createObjectURL(img));
    return URL.createObjectURL(img);
  };

  return (
    <S.DetailLayout>
      <S.DetailContainer>
          <div className="group-profile">
            <p className="title">&#127969; 소속</p>
            <div className="card-body">
              <div className="group-img">
                <img
                  src={
                    detailList.img
                      ? `${getByteToImage(detailList.img)}`
                      : '/image/noimage.png'
                  }
                  alt="group-profile"
                  className="image"
                />
              </div>
              <div className="group-desc">
                <p className="group-title">SSAFY 9기</p>
                <div className="info">
                  <p className="group-personnel">
                    <b>인원</b> 297명
                  </p>
                  <p className="group-tier">
                    <b>평균티어</b> 플레티넘
                  </p>
                  <p className="group-leader">
                    <b>소속장</b> 싸진남
                  </p>
                </div>
                <p className="group-content">
                  &#127775; SSAFY 9기 모여라~~ <br />
                  Samsung Software Academy For Youth의 9기 교육생들이 모인
                  소속입니다.
                </p>
              </div>
            </div>
          </div>
          <div className="detail-body">
            <div className="left-box">
              <button className="group-join">이 소속에 가입하기</button>
              <div className="average-tier">
                <p className="title">&#127941; 평균 티어</p>
                <div className="tier-body">
                  <div className="img-box">
                    <img
                      src="/image/rank-icons/master.png"
                      alt="group-tier"
                      className="image"
                    />
                  </div>
                  <div className="desc">
                    <p className="tier">Master</p>
                    <p className="point">68P</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-box">
              <div className="member-rank">
                <p className="title">&#128101; 소속원 순위</p>
                <div className="radio-group">
                  <input type="radio" name="rank-type" defaultChecked />
                  <label>티어</label>
                  <input type="radio" name="rank-type" />
                  <label>레벨</label>
                  <input type="radio" name="rank-type" />
                  <label>플레이</label>
                </div>
                <div className="ranking-table">
                  <div className="table-head">
                    <div className="table-row">
                      <p className="rank">등수</p>
                      <p className="member-name">소속원 이름</p>
                      <p className="member-tier">티어</p>
                      <p className="member-persent">상위</p>
                    </div>
                  </div>
                  <div className="table-body">
                    <div className="table-row current">
                      <p className="rank">297</p>
                      <div className="member-name">
                        <img
                          className="image"
                          src="/image/lbti-img.svg"
                          alt="member-profile_img"
                        />
                        <p className="member-level">123레벨</p>
                        갓뎀뻑
                      </div>
                      <p className="member-tier">Unranked</p>
                      <p className="member-persent">99%</p>
                    </div>
                    <div className="table-row">
                      <p className="rank">1</p>
                      <div className="member-name">
                        <img
                          className="image"
                          src="/image/lbti-img.svg"
                          alt="member-profile_img"
                        />
                        <p className="member-level">400레벨</p>
                        롤진남
                      </div>
                      <p className="member-tier">챌린저</p>
                      <p className="member-persent">1%</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <p className="desc">
                    소속에 가입하고 모두의 순위를 확인하세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </S.DetailContainer>
    </S.DetailLayout>
  );
};

export default GroupDetailComponent;
