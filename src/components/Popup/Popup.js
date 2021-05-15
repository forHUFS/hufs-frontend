import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import note from '../../image/note.png'


function Popup() {
    const [yes, setYes] = useState(false);
    const Show = localStorage.getItem("time")


    useEffect(() => {
        const handleShowModal = () => {
            if (Show && Show > new Date())
                return;

            else {
                setYes(true)
                let fin = new Date();
                fin = fin.setHours(fin.getHours() + 24)
                localStorage.setItem("time", fin)
            }
        }

    }, [Show])
    const handleButton = () => {
        setYes(false)

    }

    return (
        <div>

            <Modal
                className="temp"
                style={{
                    width: '550px',
                    height: '750px'
                }}
                title="공지"
                visible={yes}
                onCancel={handleButton}
                maskClosable="true"
            >
                <img style={{
                    width: '500px',
                    height: '700px'
                }}
                    src={note} />



            </Modal>

        </div>
    )

}


export default Popup;