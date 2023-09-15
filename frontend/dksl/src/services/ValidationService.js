const emailVaildationCheck = (email) => {
  // email Checking
  const regexEmail = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (email.length == 0 || !regexEmail.test(email)) {
    return '이메일 형식이 올바르지 않습니다.';
  }
  return 'SUCCESS';
};

const pwValidationCheck = (pw, pwCheck) => {
  // pw Checking
  const regexPw = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  );

  if (pw != pwCheck || pw.length == 0) {
    return '비밀번호가 일치하지 않습니다.';
  }
  if (!regexPw.test(pw)) {
    return `영어, 숫자, 특수문자를 조합해 8자 이상 설정해주세요.`;
  }
  return 'SUCCESS';
};

const userValidationCheck = (user) => {
  // email Checking
  const regexEmail = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const email = user.email;

  if (email.length == 0 || !regexEmail.test(email)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  // pw Checking
  const pw = user.pw;
  const pwCheck = user.pwCheck;
  const regexPw = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  );

  if (pw != pwCheck || pw.length == 0) {
    return '비밀번호가 일치하지 않습니다.';
  }
  if (!regexPw.test(pw)) {
    return '영어, 숫자, 특수문자를 조합해 8자 이상 설정해주세요.';
  }

  // name Checking
  const name = user.name;
  const regexName = new RegExp(/^[a-zA-Zㄱ-힣_]{1,20}$/);

  if (!regexName.test(name)) {
    return '이름에는 한글만 들어갈 수 있습니다.';
  }

  return 'SUCCESS';
};

export {
  userValidationCheck,
  pwValidationCheck,
  emailVaildationCheck
}