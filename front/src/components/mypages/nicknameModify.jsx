import React, { useEffect, useState } from "react";
import UserIcon from "../../atom/userIcon";
import Input from "../../atom/Input";
import Button from "../../atom/button";
import { LOCAL_HOST } from "../../constant/path";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../store/memberLoginSlice";
import { updateUser } from "../../store/memberLoginSlice";

const NicknameModify = () => {
  const dispatch = useDispatch();
  const { idx, nickname, email, id, color, status, error } = useSelector(
    (state) => state.members
  );
  const [updateNickname, setUpdateNickname] = useState(""); //수정할 닉네임
  const [errorMessage, setErrorMessage] = useState(""); //에러 메세지
  const [selectedColor, setSelectedColor] = useState(color); //선택(수정)한 userIcon색상
  const [showColorPicker, setShowColorPicker] = useState(false); //선택 색상 메뉴

  const userNicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/; //닉네임 유효성 검사 : 영어 대소문자, 한글, 10자이내
  const colorOptions = {
    black: "bg-gray-700 text-white",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    yellow: "bg-yellow-400 text-black",
    red: "bg-red-500 text-white",
    skyBlue: "bg-sky-400 text-white",
    purple: "bg-purple-500 text-white",
    fuchsia: "bg-fuchsia-500 text-white",
    gray: "bg-gray-200 text-gray-600",
  };

  //닉네임 값이 변결될 때마다 updateNickname을 업데이트
  useEffect(() => {
    setUpdateNickname(nickname);
  }, [nickname, color]);

  //닉네임 유효성 검사
  const validNickname = () => {
    if (!userNicknameRegex.test(updateNickname)) {
      setErrorMessage(
        "닉네임은 영어 대소문자, 숫자, 한글 10자 이내로 입력해야 합니다."
      );
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  //색상 선택시 호출
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false); //색상 선택 후 메뉴 닫기
  };

  //nickname, color를 update(수정)하는 정보를 담아 백으로 보내주는 함수
  // const updateUserInfo = async () => {
  //   try {
  //     const formData = new URLSearchParams();
  //     formData.append("nickname", updateNickname);
  //     formData.append("color", selectedColor);

  //     //백으로 수정한 정보 보내기
  //     const response = await fetch(`${LOCAL_HOST}/api/member/${idx}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: formData.toString(),
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update user information");
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error updating user info:", error);
  //     throw error;
  //   }
  // };

  //update된 정보를 submit하는 함수
  const handleSubmit = async (e) => {
    //preventDafalut : submit과 동시에 새로 이동되는 것을 막아줌(고유 동작을 중단시킴)
    e.preventDefault();

    //validNickname()에 값이 있다면 프로필 업데이트해라
    if (validNickname()) {
      try {
        await dispatch(
          updateUserInfo({
            idx,
            nickname: updateNickname,
            color: selectedColor,
          })
        ).unwrap();
        alert("회원 정보가 성공적으로 업데이트되었습니다.");
      } catch (error) {
        alert("회원 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (status === "loading") {
    return <div>업데이트 중...</div>;
  }

  return (
    <div className="w-600 h-800 m-auto place-content-center">
      <form onSubmit={handleSubmit}>
        {/* 유저 아이콘 영역(색상 변경) */}
        <div className="h-72 flex  justify-center items-center">
          <div
            className="flex"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <UserIcon size="xl" color={selectedColor} />
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
                      type="button"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 아이디, 닉네임(정보+수정), 이메일 정보 영역 */}
        <div className="w-600 h-500">
          {/* 아이디 정보 */}
          <div className="flex p-2 h-20">
            <label className="p-4 flex justify-start w-48">ID</label>
            <p className="p-4 flex justify-center w-96">{id}</p>
          </div>

          {/* 닉네임 정보, 수정 영역 */}
          <div className="flex justify-center items-center p-2 h-20">
            <div>
              <label className="p-4 flex justify-start w-48">NICK NAME</label>
            </div>
            <div className="flex w-96 justify-center items-center">
              <Input
                placeholder={"닉네임"}
                widthSize={"200"}
                onChange={(e) => setUpdateNickname(e.target.value)}
                onBlur={validNickname}
                value={updateNickname}
              ></Input>
            </div>
            <div>
              {errorMessage.userNickname && (
                <p className="font-nanum-squareL text-xs text-red-600">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>

          {/* 이메일 정보 */}
          <div className="flex p-2 h-20">
            <label className="p-4 flex justify-start w-48">EMAIL</label>
            <p className="p-4 flex justify-center w-96">{email}</p>
          </div>

          {/* 회원정보 업데이트 버튼 */}
          <div className="flex justify-center mt-4">
            <Button
              text={"수정하기"}
              type={"submit"}
              disabled={status === "loading"}
            />
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default NicknameModify;
