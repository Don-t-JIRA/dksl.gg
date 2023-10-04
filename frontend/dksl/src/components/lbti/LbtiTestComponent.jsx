import * as S from '@/styles/lbti/test.style';

const LbtiTestComponent = () => {
    return (
        <S.LbtiTestLayout>
            <S.TestContainer>
                <div className="test-box">
                    <div className="question-box">
                        <div className="question">
                            자신이 즐겨하던 챔피언이 너프로 큰 타격을 받았습니다.
                        </div>
                        <div className="question">
                            랭크 게임에서 당신은 어떤 챔피언을 선택하실 건가요?
                        </div>
                    </div>
                    <div className="radio-box">
                        <div className="radio-group">
                            <input type="radio" name="rank-type" />
                            <label>티어</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="rank-type" />
                            <label>레벨</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="rank-type" />
                            <label>플레이</label>
                        </div>
                    </div>
                    <div className="btn-box">
                        <button className="prev-btn">
                            이전
                        </button>
                        <button className="next-btn">
                            다음
                        </button>
                    </div>
                </div>
            </S.TestContainer>
        </S.LbtiTestLayout>
    );
};

export default LbtiTestComponent;