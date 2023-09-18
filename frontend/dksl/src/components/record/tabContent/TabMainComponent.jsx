// Styled
import * as S from '@/styles/record/tabmain.style';
// Select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const options = [{ value: 'default', label: '큐 타입' }];

const animatedComponent = makeAnimated();

const TabMainComponent = () => {
  return (
    <S.TabMainLayout>
      <S.LeftLayout>

      </S.LeftLayout>
      <S.RightLayout>
      <div className="rank-type">
        <div className="radio-group">
          <input type="radio" name="rank-type" />
          <label>랭크 전체</label>
          <input type="radio" name="rank-type" />
          <label>솔로 랭크</label>
          <input type="radio" name="rank-type" />
          <label>자유 랭크</label>
        </div>
        <div className="select-group">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponent}
            defaultValue={options[0]}
            options={options}
          />
        </div>
      </div>
      </S.RightLayout>
    </S.TabMainLayout>
  );
};

export default TabMainComponent;
