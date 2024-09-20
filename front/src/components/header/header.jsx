import { Link } from "react-router-dom"
import logo from "../../logo.svg"
import UserIcon from "../../atom/userIcon"

export default function Header(){

    return(
        <div className="fixed h-14 w-full flex flex-row items-center justify-between bg-gray-400 z-40">
            <Link to={"/"}><img src={logo} className="h-12 w-[70]"/></Link>
            <div className="mr-4">
                <UserIcon size="lg"/>

            </div>
        </div>
    )
}


