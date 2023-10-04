import * as S from '@/styles/lbti/result.style';

const LbtiResultComponent = ({lbti}) => {
    console.log(lbti);
    const lbtiStr = (lbti)? (lbti.firstTendency.initial + 
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
                        <button disabled>{(lbti)? lbti.firstTendency.name : null}</button>
                        <button disabled>{(lbti)? lbti.secondTendency.name : null}</button>
                        <button disabled>{(lbti)? lbti.thirdTendency.name : null}</button>
                        <button disabled>{(lbti)? lbti.fourthTendency.name : null}</button>
                    </div>
                    <div className="description-content">{(lbti)? lbti.description : null}</div>
                </div>
            </S.ResultContainer>
        </S.LbtiResultLayout>
    );
};

export default LbtiResultComponent;