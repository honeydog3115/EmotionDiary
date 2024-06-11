import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

import "./Editor.css";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    // setState은 객체를 새로 만드는 것이기 때문에 기존의 값을 복사하고 그 후에 값을 변경함
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    // state을 가져오고 emotionId에 해당하는 변수를 emotionId로 교체함. 이게 뭔말인지 싶을 수 있는데 이게 맞다.
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);

    // const handleChangeEmotion = (emotionId) => {
    //     setState((state) => ({
    //         ...state,
    //         emotionId,
    //     }));
    // };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleOnGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="Editor">
            <h4>오늘의 날짜</h4>
            <div className="input_wrapper">
                <input type="date" value={state.date} onChange={handleChangeDate} />
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>

            <div className="editor_section bottom_section">
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;