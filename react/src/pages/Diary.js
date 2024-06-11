import { useNavigate, useParams } from "react-router-dom";

import { getFormattedDate } from "../util";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import Viewer from "../component/Viewer";

const Diary = () => {
    const { id } = useParams();
    const data = useDiary(id);
  
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    };
  
    const goEdit = () => {
      navigate(`/edit/${id}`);
    };
    
    //초기에는 useDiary로 값을 가져올 때 빈값을 가져오기 때문에 data에 아무것도 없을 수 있음
    //이 상태에서 data에 접근하면 에러가 발행하므로 if를 이용.
    if (!data) {
      return <div>일기를 불러오고 있습니다...</div>;
    } else {
      const { date, emotionId, content } = data;
      const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
      console.log("날짜" + date);
      console.log("감정" + emotionId);
      return (
        <div>
          <Header
            title={title}
            leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
            rightChild={<Button text={"수정하기"} onClick={goEdit} />}
          />
          <Viewer content={content} emotionId={emotionId} />
        </div>
      );
    }
  };

export default Diary;
