import { useNavigate } from "react-router-dom";
import Button from "../../atom/button";
import ProjectBlock from "../../components/projects/project_block";
import ProjectHeader from "../../components/projects/project_header";
import Search from "../../atom/search";


export default function ProjectPage(){
    const navigate = useNavigate();

        // 예시 프로젝트 데이터 (실제로는 API나 상태 관리 라이브러리에서 가져올 것입니다)
        const projects = [
            { id: 1, title: "프로젝트 1", creator: "사용자1", description: "설명1", startDate: "2024-09-01", endDate: "2024-12-31" },
            { id: 2, title: "프로젝트 2", creator: "사용자2", description: "설명2", startDate: "2024-10-01", endDate: "2025-03-31" },
        ];
    

    const createProjectHandler = ()=>{
        navigate("/create-project");
    }

    return(
        <div className="w-11/12 mx-auto">
            <div>
                <ProjectHeader title={"프로젝트"} 
                    children={
                        <div className="flex gap-4">
                            <Search placeholder={"검색"}/>
                            <Button text={"프로젝트 생성"} color={"yellow"} type={"button"} onClickHandler={createProjectHandler}/>
                        </div>}/>       
            </div>
            <div className="grid grid-cols-11 mt-5 text-center align-middle">
                <p className="col-span-2">제목</p>
                <p className="col-span-1">생성자</p>
                <p className="col-span-3">설명</p>
                <p className="col-span-2">시작 날짜</p>
                <p className="col-span-2">마감 날짜</p>
                <p className="col-span-1">추가 작업</p>
            </div>
            <div>
                {projects.map((e, i) =>(
                    <ProjectBlock 
                        key={e.id} 
                        creator={e.creator}
                        description={e.description}
                        startDate={e.startDate}
                        endDate={e.endDate}
                        title={e.title}
                        index={i} />
                ) )}
            </div>

        </div>
    )
}