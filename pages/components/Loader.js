import { useState } from "react";
import fact from "./facts.json";
const Loader = () => {
  const [ctr, Updatectr] = useState(0);
  setInterval(() => {
    Updatectr((ctr + 1) % 10);
  }, 10000);
  return (
    <>
      <div class="section-center lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="facts">
        <h3>{fact.facts[ctr]}</h3>
      </div>
    </>
  );
};
export default Loader;
