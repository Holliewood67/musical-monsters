import Hero from "./components/hero";
import Monsters from "./components/monsters";
import Services from "./components/services";
import News from "./components/news";
import Events from "./components/events";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Events />
      <Monsters />
    </>
  );
}
