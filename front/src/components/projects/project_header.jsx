import H1 from "../../atom/h1";

export default function ProjectHeader({title, subtitle,children }){
    return(
        <div className="w-full">
            <div>
                <div className="flex justify-between h-16 mt-5 border-b-2 items-center">
                    <div>
                        <H1 title={title}></H1>
                        {subtitle && <h2 className="text-2xl ml-3">{subtitle}</h2>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}