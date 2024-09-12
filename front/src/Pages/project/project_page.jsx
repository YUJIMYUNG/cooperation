import Button from "../../atom/button";
import ProjectBlock from "../../components/projects/project_block";
import ProjectBlockInner from "../../components/projects/project_block_inner";
import ProjectHeader from "../../components/projects/project_header";


export default function ProjectPage(){
    return(
        <div className="w-11/12 mx-auto">
            <ProjectHeader title={"프로젝트"} children={<Button text={"프로젝트 생성"} color={"yellow"}/>}/>

            <div className="grid grid-cols-11 mt-5 text-center align-middle">
                <p className="col-span-2">제목</p>
                <p className="col-span-1">생성자</p>
                <p className="col-span-3">설명</p>
                <p className="col-span-2">시작 날짜</p>
                <p className="col-span-2">마감 날짜</p>
                <p className="col-span-1">추가 작업</p>
            </div>

            <ProjectBlock />

        </div>
    )
}