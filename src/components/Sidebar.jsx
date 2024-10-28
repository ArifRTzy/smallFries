import { Link, Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (       
    <div className='pt-[60px] w-full'>
        <div className="w-[90%] mx-auto flex">
            <div className="w-[20%] h-[150vh] overflow-auto">
                <div className="">
                    <input type="text" className='border-2'/>
                </div>
                <div className="">
                    <li >
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/comp">comp</Link>
                    </li>
                </div>
            </div>
            <div className="w-[80%]">
        <Outlet />
      </div>
        </div>
    </div>
  )
}

export default Sidebar
