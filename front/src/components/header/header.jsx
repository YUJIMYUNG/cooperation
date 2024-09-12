import logo from "../../logo.svg"

export default function Header(){

    return(
        <div className="fixed h-14 w-full flex flex-row items-center justify-between bg-gray-400">
            <a href="/"><img src={logo} className="h-12 w-[70]"/></a>
            <img src={logo} className="h-12"/>
        </div>
    )
}


