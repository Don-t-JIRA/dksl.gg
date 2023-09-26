const MainComponent = ({ count, setCount }) => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="image/Riot.svg" className="logo" alt="Dksl logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src="image/dkslhead.svg"
            className="logo react"
            alt="Riot logo"
          />
        </a>
      </div>
      <h1>dkslgg</h1>
      <p>Count가 9보다 커진다면 무언가가!</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default MainComponent;
