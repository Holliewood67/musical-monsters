import WelcomeHeader from "./components/welcome-header";
import Monsters from "./components/monsters";
import Mission from "./components/mission";
import Services from "./components/services";
import News from "./components/news";
import Events from "./components/events";



export default function Home() {
  return (
    <>
      <WelcomeHeader />
      {/* <News /> */}
      <div className="md:hidden">
        <Mission />
      </div>
      <Services />
      <Monsters />
      {/* <Events /> */}
    </>
  );
}
