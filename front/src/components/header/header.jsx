import { Link, useNavigate } from "react-router-dom"
import logo from "../../logo.svg"
import UserIcon from "../../atom/userIcon"

export default function Header(){

    const mypageButtonNavi = useNavigate();

    //userIcon 클릭시 호출될 함수
    const handleUserIconClick = () => {
        console.log(1)
        mypageButtonNavi("/mypage/information");
    }

    return(
        <div className="fixed h-14 w-full flex flex-row items-center justify-between bg-gray-400 z-40">
            <Link to={"/"}><img src={logo} className="h-12 w-[70]"/></Link>
            <div className="mr-4">
                <UserIcon size="lg" onclick={()=>handleUserIconClick()}/>

            </div>
        </div>
    )
}


