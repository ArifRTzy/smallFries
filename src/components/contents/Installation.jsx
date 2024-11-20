import FooterComps from "./FooterComps"
import { menuComponents } from "../../constants"

const Installation = () => {
  return (
    <div className="comps-container">
      <p className="font-semibold">{menuComponents[0].title}</p>
      <h1 className="comps-h1">Installation</h1>
      <p className="comps-desc">
        Before you use components, you need to install these things.
      </p>
      <FooterComps/>
    </div>
  )
}

export default Installation
