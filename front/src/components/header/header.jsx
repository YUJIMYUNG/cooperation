import logo from "../../logo.svg"

export default function Header(){

    return(
        <div className="fixed h-14 w-full flex flex-row items-center justify-between bg-gray-400">
            <a href="/"><img src={logo} className="h-12 w-[70]"/></a>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full mr-5">
                <span className="font-medium text-gray-300">Juasd</span>
            </div>
        </div>
    )
}


