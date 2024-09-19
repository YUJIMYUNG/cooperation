import H1 from "../../atom/h1";

export default function BodyHeader({title, subtitle,children }){
    return(
        <div className="w-full mb-5">
            <div>
                <div className="flex justify-between h-16 mt-5 border-b-2 items-center">
                    <div className="flex items-end">
                        <H1 title={title}></H1>
                        {subtitle && <h2 className="text-base text-gray-500 ml-3">{subtitle}</h2>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}