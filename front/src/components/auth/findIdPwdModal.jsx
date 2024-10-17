import React, { useState } from "react";
import AuthSection from "../../atom/AuthSection";
import ModalTop from "./modalTop";
import ModalBody from "./modalBody";
import ModalBottom from "./modalBottom";
import Button from "../../atom/button";
import Input from "../../atom/Input";

const FindIdPwdModal = ({ handleModal, switchToLogin, switchToRegister }) => {
  const [emailDomain, setEmailDomain] = useState(""); //이메일 도메인
  const [isFindingId, setIsFindingId] = useState(true); //true면 아이디 찾기 화면, False면 비밀번호 찾기 화면

  //도메인 선택기능
  const hadleDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  // 아이디 찾기 버튼 - 아이디 찾기 화면으로 전환 함수
  const switchToFindId = () => {
    setIsFindingId(true);
  };

  // 비밀번호 찾기 버튼 - 비밀번호 찾기 화면으로 전환 함수
  const switchToFindPwd = () => {
    setIsFindingId(false);
  };

  return (
    <div handleModal={handleModal}>
      <AuthSection>
        <div className="w-500 h-700">
          <ModalTop category={"아이디/비밀번호 찾기"} />

          <ModalBody>
            <div>
              {/* 아이디찾기, 비번 찾기 버튼 영역 */}
              <div className="w-400 h-24 flex justify-center ">
                <Button
                  color={isFindingId ? "yellow" : "white"}
                  onClickHandler={switchToFindId}
                  text={"아이디 찾기"}
                  type={"button"}
                />
                <Button
                  color={isFindingId ? "white" : "yellow"}
                  onClickHandler={switchToFindPwd}
                  text={"비밀번호 찾기"}
                  type={"button"}
                />
              </div>

              {/* 이메일 input 영역  -  아이디 찾기, 비밀번호 찾기 화면 조건부 렌더링 */}
              <div>
                {isFindingId ? (
                  <div className="flex gap-2 h-32 justify-center">
                    <div>
                      <Input
                        widthSize={"200"}
                        placeholder={"가입시 등록한 이메일을 입력하세요."}
                      />
                    </div>
                    <div>
                      <select
                        className="border w-48 h-10 rounded-md shadow-sm font-nanum-squareL text-sm p-1"
                        onChange={hadleDomainChange}
                      >
                        <option value="">직접입력</option>
                        <option value="@gmail.com">@gmail.com</option>
                        <option value={"@naver.com"}>@naver.com</option>
                        <option value={"@daum.net"}>@daum.net</option>
                        <option value={"@nate.com"}>@nate.com</option>
                        <option value={"@icloud.com"}>@icloud.com</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-32 gap-2 place-content-between justify-center">
                    <div>
                      <Input
                        widthSize={"140"}
                        placeholder={"이메일을 입력하세요."}
                      />
                    </div>
                    <div>
                      <select
                        className="border w-36 h-10 rounded-md shadow-sm font-nanum-squareL text-sm p-1"
                        onChange={hadleDomainChange}
                      >
                        <option value="">직접입력</option>
                        <option value="@gmail.com">@gmail.com</option>
                        <option value={"@naver.com"}>@naver.com</option>
                        <option value={"@daum.net"}>@daum.net</option>
                        <option value={"@nate.com"}>@nate.com</option>
                        <option value={"@icloud.com"}>@icloud.com</option>
                      </select>
                    </div>
                    <div>
                      <Button
                        color={"gray"}
                        onClickHandler={handleModal}
                        text={"인증번호 발송"}
                        type={"button"}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 로그인 버튼  */}
              <div className="flex justify-center">
                <Button
                  color={"yellow"}
                  onClickHandler={handleModal}
                  text={"로그인"}
                  type={"button"}
                />
              </div>
            </div>
          </ModalBody>

          <ModalBottom>
            <div>
              <Button
                color={""}
                onClickHandler={switchToRegister}
                text={"회원가입"}
                type={"button"}
              />
              <Button
                color={""}
                onClickHandler={switchToLogin}
                text={"로그인"}
                type={"button"}
              />
            </div>
          </ModalBottom>
        </div>
      </AuthSection>
    </div>
  );
};

export default FindIdPwdModal;
