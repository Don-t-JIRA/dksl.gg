// Styled
import * as S from '@/styles/group/create.style';

const GroupCreateComponent = () => {
  return (
    <S.CreateLayout>
      <div className="input-area-1">
        <input type="file" id="swal-input" className="input-image" />
        <div className="input-title">
          <label htmlFor="swal-input1">소속 이름</label>
          <input type="text" id="swal-input1" />
        </div>
      </div>
      <div className="input-area-2">
        <div className="input-description">
          <label htmlFor="swal-input2">소속 소개</label>
          <textarea id="swal-input2" className="input-description" />
        </div>
      </div>
    </S.CreateLayout>
  );
};

export default GroupCreateComponent;
