import { github } from "../../utils"

const FooterComps = () => {
  return (
    <footer className="flex justify-between py-10 border-t-2">
    <p className="text-base text-slate-600">Copyright © 2024 smallFriez</p>
    <a href="https://github.com/ArifRTzy">
      <img className="w-8" src={github} alt="github" />
    </a>
  </footer>
  )
}

export default FooterComps
