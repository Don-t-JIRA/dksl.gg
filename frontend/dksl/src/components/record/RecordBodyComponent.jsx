// React
import React from 'react';
// Styled
import * as S from '@/styles/record/body.style';
import TabMainComponent from './tabContent/TabMainComponent';

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
          <TabMainComponent />
        </div>
      </S.TabLayout>
    </S.RecordLayout>
  );
};

export default RecordBodyComponent;
