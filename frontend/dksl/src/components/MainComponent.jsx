import RiotLogo from '/src/assets/Riot.svg'
import dkslLogo from '/src/assets/dkslhead.svg'

const MainComponent = ({ count, setCount }) => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={dkslLogo} className="logo" alt="Dksl logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={RiotLogo} className="logo react" alt="Riot logo" />
        </a>
      </div>
      <h1>dkslgg</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default MainComponent;