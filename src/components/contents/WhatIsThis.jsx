import { menuComponents } from "../../constants";
import { cat, catGif } from "../../utils";
import FooterComps from "./FooterComps";

const WhatIsThis = () => {
  return (
    <div className="comps-container">
      <p className="font-semibold">{menuComponents[0].title}</p>
      <h1 className="comps-h1">What is this?</h1>
      <p className="comps-desc">
        So this is website where i put all my small projects and it&apos;s code e.g.
        some navbar&apos;s styles.
      </p>
      <p className="comps-desc">
        Y&apos;all can use it for free or whatever😒.
      </p>
      <img className="w-96" src={cat} alt="cat" />
      <img className="w-96" src={catGif} alt="cat gif" />
      <FooterComps/>
    </div>
  );
};

export default WhatIsThis
