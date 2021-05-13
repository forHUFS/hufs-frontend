import React, { useState } from 'react'
import { Modal } from 'antd'


function InformationModal() {

    const [isModalVisible, setisModalVisible] = useState(false)

    const show = () => {
        setisModalVisible(true)
    }

    const handleCancel = () => {
        setisModalVisible(false)
    }

    return (
        <>
            <span onClick={show}>개인정보 취급방침 </span>
            <Modal
                className="info-rule"
                title="개인정보 처리방침"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk="none"
            >
                <p>
                    훕스페이스는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법, 등 <br />
                    정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며,  <br />
                    관련 법령에 의거한 개인정보취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.  <br />
                    본 개인정보취급방침은 훕스페이스가 제공하는 훕스페이스 및 훕스페이스 관련 제반 서비스 이용에 적용되며 <br />
                    다음과 같은 내용을 담고 있습니다.

                </p>
                <br />
                <ul className="info-detail">
                    <li className="subtitle">
                        <p className="title">1.수집하는 개인정보의 항목 및 수집방법</p>
                       
                        
                        <li className="sub">
                            가. 수집하는 개인정보의 항목
                        </li>
                        <br />
                        <p>훕스페이스는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 최초 회원가입 당시  <br />
                        아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.</p>

                    </li>
                    <br />
                    <li className="subtitle">
                        <p className="title">
                            2.개인정보의 수집 및 이용 목적
                        </p>
                        <li className="sub">
                            가. 회원관리
                           
                        </li>
                        <br />
                            <p>회원제 서비스 제공, 개인식별, 훕스페이스 이용약관 위반 회원에 대한 이용제한 조치,
                            서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위 제재,
                            가입의사 확인, 가입 및 가입횟수 제한, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달, 회원탈퇴 의사의 확인</p>
                        <li className="sub">
                            나. 맞춤 서비스
                            
                        </li>
                        <br />
                        <p>사이트 이용 권한 부여 및 맞춤 서비스 제공, 서비스의 유효성 확인</p>

                    </li>
                    <br />
                    <li className="subtitle">
                        <p className="title">3.개인정보의 공유 및 제공</p>
                        <li>
                            훕스페이스는 이용자들의 개인정보를 "2. 개인정보의 수집목적 및 이용목적"에서 고지한 범위내에서 사용하며,
                            이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다
                        </li>
                        <li>
                            법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에는 예외로 합니다
                        </li>
                    </li>
                    <br />
                    <li className="subtitle">
                        <p className="title">4.개인정보의 취급위탁</p>
                        <p>훕스페이스는 회원 개인정보를 위탁하지 않습니다. 다만, 회원 로그인을 소셜계정으로 함으로써 ID, PASSWORD는 소셜계정에서 취급합니다.</p>
                    </li>
                    <br />
                    <li className="subtitle">
                        <p className="title">5.개인정보의 보유 및 이용기간</p>
                        <p>이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</p>
                        <li className="sub">
                            가. 훕스페이스 내부 방침에 의한 정보보유 사유
                            </li>
                            <br />
                        <p>
                            부정이용기록(부정가입, 징계기록 등의 비정상적 서비스 이용기록)
                            <li style={{listStyle:'disc'}}>보존 이유 : 부정 이용 방지</li>
                            <li style={{listStyle:'disc'}}>보존 기간 : 5년</li>
                        </p>
                        <p>
                            회원식별정보(소셜계정, 웹메일)
                            <li style={{listStyle:'disc'}}>보존 이유 : 재가입 패널티</li>
                            <li style={{listStyle:'disc'}}>보존 기간 : 5년</li>
                        </p>

                        <li className="sub">
                            나. 이용자 열람용 사유
                        </li>
                        
                        <p>
                            접속시각,IP,접속기기 (정상적 서비스 이용기록)
                            <li style={{listStyle:'disc'}}>보존 이유 : 개인 활동 내역 확인</li>
                            <li style={{listStyle:'disc'}}>보존 기간 : 90일</li>
                        </p>


                    </li >
                    <br />
                    <li className="subtitle">
                        <p className="title">
                            6.개인정보 파기절차 및 방법
                        </p>
                        <p>
                            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.
                            훕스페이스의 개인정보 파기절차 및 방법은 다음과 같습니다.
                        </p>
                        <li className="sub">
                            가.파기절차
                            </li>
                            <br />
                        <li>
                            이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져
                            내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조)일정 기간 저장된 후 파기됩니다
                                </li>
                        <li>
                            동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다
                                </li>
                                <br />


                        <li className="sub">
                            나.파기방법
                            </li>
                            <br />
                        <li>
                            전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
                            </li>
                    </li>

                    <br />
                    <li className="subtitle">
                        <p className="title">7.이용자 및 법정대리인의 권리와 그 행사방법</p>
                        <li>
                            이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 훕스페이스의 개인정보의 처리에 동의하지 않는 경우 동의를 거부하거나
                            가입해지(회원탈퇴)를 요청하실 수 있습니다. 다만, 그러한 경우 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.
                        </li>
                        <li>
                            이용자의 개인정보 조회, 수정을 위해서는 '회원정보수정'을, 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
                        </li>
                        <li>
                            훕스페이스는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "5. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                        </li>
                    </li >
                    <br />
                    <li className="subtitle">
                        <p className="title">
                            8.개인정보의 기술적/관리적 보호 대책
                            </p>
                            
                        <p>
                            훕스페이스는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.
                        </p>
                        <li className="sub">
                            가.개인정보보호전담기구의 운영
                            </li>
                            <br />
                        <p>훕스페이스 운영자는 훕스페이스 개인정보취급방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다.
                        단, 이용자 본인의 부주의나 인터넷상의 문제로 ID, 비밀번호, 웹메일 등 개인정보가 유출되어 발생한 문제에 대해 훕스페이스는 일체의 책임을 지지 않습니다.
                            </p>
                    </li>

                    <br />
                    <li className="subtitle">
                        <p className="title"> 9.개인정보관리책임자 및 담당자의 연락처</p>
                        <p>
                            귀하께서는 훕스페이스의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다.
                            훕스페이스는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다
                        </p>
                        <p style={{
                            fontWeight:'bold',
                            fontSize: '16px'
                    }}>개인정보 관리책임자 정보 및 연락처</p>
                        <li>이름 : 이태훈                </li>
                        <li>소속: 훕스페이스</li>
                        <li>전화번호 :010-5012-4905  </li>
                        <li>직위: 대표</li>
                        <li>이메일:hufs.web@gmail.com</li>
                        < br/>
                        <p>
                            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
                            </p>
                            <br />
                            <li>개인정보침해신고센터 (www.118.or.kr / 국번없이 118)</li>
                            <li>대검찰청 사이버범죄수사단 (www.spo.go.kr / 02-3480-3571)</li>
                            <li>경찰청 사이버테러대응센터 (www.ctrc.go.kr / 국번없이 182)</li>
                       


                    </li >
                    <br />
                    <li className="subtitle">
                        <p className="title">10.기타</p>
                        <p>훕스페이스에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "훕스페이스 개인정보취급방침"이 적용되지 않음을 알려 드립니다.</p>
                    </li >
                    <br />
                    <li className="subtitle">
                        <p className="title">11.고지의 의무</p>
                        <p>훕스페이스에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "훕스페이스 개인정보취급방침"이 적용되지 않음을 알려 드립니다.</p>
                        <p style={{
                            textAlign: 'center',
                            
                    }} > 공고일자 : 2021년 5월 15일</p>
                    </li >

                </ul >
            </Modal >
        </>
    )
}

export default InformationModal;