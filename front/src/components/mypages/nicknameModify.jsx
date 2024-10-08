import React, { useEffect, useState } from 'react';
import UserIcon from '../../atom/userIcon';
import Input from '../../atom/Input';
import Button from '../../atom/button';
import { LOCAL_HOST } from '../../constant/path';
import { useSelector } from 'react-redux';

const NicknameModify = () => {

    //const [userIdx, setUserIdx] = useState("");//로그인한 유저 idx
    const userIdx = useSelector(state => state.members?.idx)
    const userNickname = useSelector(state => state.members?.nickname)
    const [updateNickname, setUpdaterNickname] = useState(""); //수정할 닉네임

    const [errorMessage, setErrorMessage] = useState(""); //에러 메세지
    const [selectedColor, setSelectedColor] = useState("gray")//선택한 userIcon색상 
    const [showColorPicker, setShowColorPicker] = useState(false);//선택 색상 메뉴
    const [loading, setLoading] = useState(true);
    
    // useEffect(() => {
    //     console.log(userIdx)
    //     if (userIdx && userNickname) {
    //       setLoading(false);
    //     }
    //   }, [userIdx, userNickname]);
    
    useEffect(() => {
        if (userNickname) {
            setUpdaterNickname(userNickname);
        }
    }, [userNickname]);


    //서버에 요청을 보내 해당 userIdx에 맞는 유저에 대한 정보를 가져옴
    // useEffect(() => {
    //     if (userIdx && userNickname) {
    //       getUserInfo(userIdx);
    //       console.log(userIdx)
    //     }
    //   }, [userIdx, userNickname]);

    // if (loading) {
    //     return <div>데이터를 불러오는 중입니다... </div>;
        
    //   } 


//     const getUserInfo = async (userIdx) => {
//         console.log(99);
//         try {
//             const formData = userNickname;
            
// // /0  /1  /
//             const response = await fetch(`${LOCAL_HOST}/api/member/${userIdx}`,{
//                 method: 'PUT',
//                 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//                 body: formData.toString()
//             })

//             const data = await response.json();

//             } catch(error){
//                 console.log("userInfo error")
//             }
//         } 
    


    const userNicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/ //닉네임 유효성 검사 : 영어 대소문자, 한글, 10자이내
    const colorOptions = {
        black: 'bg-gray-700 text-white',
        blue: 'bg-blue-500 text-white',
        green: 'bg-green-500 text-white',
        yellow: 'bg-yellow-400 text-black',
        red: 'bg-red-500 text-white',
        skyBlue: 'bg-sky-400 text-white',
        purple: 'bg-purple-500 text-white',
        fuchsia: 'bg-fuchsia-500 text-white',
        gray: 'bg-gray-200 text-gray-600'
    }

    //닉네임 유효성 검사
    const validNickname = () => {
        if(!userNicknameRegex.test(userNickname)) {
            setErrorMessage("닉네임은 영어 대소문자, 숫자, 한글 10자 이내로 입력해야 합니다.");
        } else {
            setErrorMessage("");
        }
    }

    //색상 선택시 호출
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setShowColorPicker(false); //색상 선택 후 메뉴 닫기
    }

    return (
        <div className='w-600 h-800 m-auto place-content-center'>
            {/* 유저 아이콘 영역(색상 변경) */}
            <div className='h-72 flex  justify-center items-center'>
                <div className='flex' onClick={()=> setShowColorPicker(!showColorPicker)}>
                    <UserIcon size='xl' color={selectedColor}/>
                </div>
                {/* 색상 선택 메뉴 */}
                <div>
                    {showColorPicker && (
                        <div className="color-picker-container p-4 m-6 border border-gray-300 rounded-md shadow-md">
                            <p className="text-center mb-2 text-xs">아이콘 색상 선택</p>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.keys(colorOptions).map((color) => (
                                    <button
                                        key={color}
                                        className={`w-10 h-10 rounded-lg ${colorOptions[color]}`}
                                        onClick={() => handleColorSelect(color)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* 아이디, 닉네임(정보+수정), 이메일 정보 영역 */}
            <div className='w-600 h-500'>
                {/* 아이디 정보 */}
                <div className='flex p-2 h-20'>
                    <label className='p-4 flex justify-start w-48'>ID</label>
                    <p className='p-4 flex justify-center w-96'>ID</p>
                </div>

                {/* 닉네임 정보, 수정 영역 */}
                <div className='flex justify-center items-center p-2 h-20'>
                    <div>
                        <label className='p-4 flex justify-start w-48'>NICK NAME</label>
                    </div>
                    <div className='flex w-96 justify-center items-center'>
                        <Input placeholder={"닉네임"} widthSize={'200'} onChange={(e)=>setUpdaterNickname(e.target.value)} onBlur={()=>validNickname()} value={updateNickname}></Input>
                        <Button text={"수정하기"} type={"button"}></Button>
                    </div>
                    <div>
                        {errorMessage.userNickname && (
                            <p className="font-nanum-squareL text-xs text-red-600">{errorMessage}</p>
                        )}
                    </div>
                </div>

                {/* 이메일 정보 */}
                <div className='flex p-2 h-20'>
                    <label className='p-4 flex justify-start w-48'>EMAIL</label>
                    <p className='p-4 flex justify-center w-96'>asdf123@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default NicknameModify;