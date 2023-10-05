import * as S from '@/styles/lbti/result.style';

const LbtiResultComponent = ({ lbti }) => {
    const lbtiStr = (lbti) ? (lbti.firstTendency.initial +
        lbti.secondTendency.initial +
        lbti.thirdTendency.initial +
        lbti.fourthTendency.initial +
        " - " + lbti.name) : null;

    return (
        <S.LbtiResultLayout>
            <S.ResultContainer>
                <div className="result-box">
                    <div className="result-content">당신의 결과는...</div>
                    <img src={`https://http.cat/200`} />
                    <div className="result-title">💡 {lbtiStr}</div>
                    <div className="tag-box">
                        <S.TagItem $bg="red">
                            <div className="text">
                            {(lbti) ? lbti.firstTendency.name : null}
                            </div>
                        </S.TagItem>
                        <S.TagItem $bg="green">
                            <div className="text">
                            {(lbti) ? lbti.secondTendency.name : null}
                            </div>
                        </S.TagItem>
                        <S.TagItem $bg="violet">
                            <div className="text">
                            {(lbti) ? lbti.thirdTendency.name : null}
                            </div>
                        </S.TagItem>
                        <S.TagItem $bg="var(--maincolor-depth1)">
                            <div className="text">
                            {(lbti) ? lbti.fourthTendency.name : null}
                            </div>
                        </S.TagItem>
                    </div>
                    <div className="description-content">{(lbti) ? lbti.description : null}</div>
                </div>
            </S.ResultContainer>
        </S.LbtiResultLayout>
    );
};

export default LbtiResultComponent;