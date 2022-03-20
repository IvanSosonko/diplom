import React from "react";
import Header from "./components/Header";
import Heroes from "./components/Heroes";
import WorkSpace from "./components/WorkSpace";
import {InitHeroesData} from './controllers/HeroesController'

function App() {
  const [windowSize, setWindowSize] = React.useState({ height: window.innerHeight-1, width: window.innerWidth })

  React.useEffect(() => {
    window.addEventListener("resize", () => { setWindowSize({ height: window.innerHeight-1, width: window.innerWidth }) })
  }, [])

  return (
    <div className="App" style={{height:windowSize.height,width:windowSize.width,background:"url(./assets/1-1.jpg)"}}>
      <Header />
      <article style={{height:"calc(100% - 50px)",display:"flex",width:"100%"}}>
        <Heroes />
        <WorkSpace/>
      </article>

    </div>
  );
}

export default App;
