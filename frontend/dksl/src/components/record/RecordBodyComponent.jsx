// Styled
import * as S from '@/styles/record/body.style';
// Component
import TabMainComponent from './tabContent/TabMainComponent';
import TabAnalyzeComponent from './tabContent/TabAnalyzeComponent';
import TabGroupComponent from './tabContent/TabGroupComponent';

/**
 *
 * @param props
 * @tab
 * 0 -> main
 * 1 -> analyze
 * 2 -> group
 * 3 -> review
 */
const RecordBodyComponent = (props) => {
  console.log(props.recorddata);
  return (
    <S.RecordLayout>
      <S.TabLayout>
        <div className="tab">
          <div className="tab-title">
            <S.TabItem
              istab={props.tab == 0 ? 1 : 0}
              onClick={() => props.setTab(0)}
            >
              전적
            </S.TabItem>
            <S.TabItem
              istab={props.tab == 1 ? 1 : 0}
              onClick={() => props.setTab(1)}
            >
              분석
            </S.TabItem>
            <S.TabItem
              istab={props.tab == 2 ? 1 : 0}
              onClick={() => props.setTab(2)}
            >
              소속
            </S.TabItem>
            <S.TabItem
              istab={props.tab == 3 ? 1 : 0}
              onClick={() => props.setTab(3)}
            >
              리뷰
            </S.TabItem>
          </div>
        </div>
        <div className="tab-body">
          {props.tab == 0 && <TabMainComponent data={props.recorddata} />}
          {props.tab == 1 && <TabAnalyzeComponent data={props.analyzedata} />}
          {props.tab == 2 && <TabGroupComponent />}
        </div>
      </S.TabLayout>
    </S.RecordLayout>
  );
};

export default RecordBodyComponent;
