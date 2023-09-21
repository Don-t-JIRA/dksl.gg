const ErrorComponent = ({ error }) => {
  if (error == undefined) {
    return <div>알 수 없는 오류 발생</div>
  }
  return (<div>
    {error.message}
    <img src={`https://http.cat/${error.status}`} alt="Miyaong" />
  </div>)
}

export default ErrorComponent;