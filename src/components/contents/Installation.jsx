import FooterComps from "./FooterComps";
import { installation, menuComponents } from "../../constants";

const Installation = () => {
  return (
    <div className="comps-container">
      <p className="font-semibold text-slate-600">{menuComponents[0].title}</p>
      <h1 className="comps-h1">Installation</h1>
      <p className="comps-desc">
        Before you use components, you need to install these things.
      </p>
      <div className="w-full py-5">
        <div className="border-l-[1px] outline-none border-slate-300 flex flex-col gap-y-6">
          {installation.map(({ title, url, text }, i) => (
            <div key={i} className="flex">
              <div className="w-1.5 h-7 bg-slate-300 rounded-r-md" />
              <div className="pl-6 flex flex-col gap-y-3">
                <p className="text-xl font-semibold">{title}</p>
                <div className="flex">
                  <p className="text-lg text-slate-700 mr-1.5">Url : </p>
                  <a
                    className="text-lg text-blue-500 hover:text-blue-700 visited:text-purple-700 active:text-red-500"
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    {text}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterComps />
    </div>
  );
};

export default Installation;
