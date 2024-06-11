import React, { useReducer, useRef, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

import axios from "axios";
const SERVER_URL = "http://localhost:5000";

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      if(!action.data)
        return [];
      else
        return action.data;
    }


    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }

    case "UPDATE": {
      const newState = state.map((it) =>
          String(it.id) === String(action.data.id) ? { ...action.data } : it
        );

      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }

    case "DELETE": {
      const newState = state.filter(
          (it) => String(it.id) !== String(action.targetId)
        );

      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }

    default: {
      return state;
    }
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  // useRef를 사용하면 리렌더링 시에도 값이 유지됨. 일반 변수를 사용하면 렌더링될 때마다 값이 초기화되기 때문에 이런식으로함.
  const idRef = useRef(0);
  console.log("idRef출력 : ", idRef.current)
  // 의존성 배열이 비어있으면 컴포넌트가 렌더링 될 때 처음만 실행됨.
  useEffect(() => {
    let initData
    let maxId
    axios.get(SERVER_URL + "/getDiaryList")
      .then((res) => {
        let responseData = res.data.dairyList
        res.data.dairyList.map((it, idx)=>(responseData[idx].date = new Date(it.date).getTime()))
        initData = responseData;
        maxId = Number(res.data.maxId[0])
        console.log("initData 출력");
        console.log(initData);
        console.log(maxId);
        console.log("initData 출력");
      })
      .catch((err)=> {
        console.log("getDiaryList 에러", err)
        
      })
      .finally(()=>{
        dispatch({type: "INIT", data: initData});
        idRef.current = maxId + 1;
        setIsDataLoaded(true);
      })
    // const rawData = localStorage.getItem("diary");
    // if(!rawData){
    //   setIsDataLoaded(true);
    //   return;
    // }
    // const localData = JSON.parse(rawData);
    // if(localData.length === 0){
    //   setIsDataLoaded(true);
    //   return;
    // }

    // localData.sort((a,b) => Number(b.id) - Number(a.id));
    // idRef.current = localData[0].id + 1;

    // dispatch({type: "INIT", data: localData });
  }, []);

  const onCreate = async (date, content, emotionId) => {
    console.log(idRef.current)
    const newDiary = {
      id: idRef.current,
      date: new Date(date).getTime(),
      content,
      emotionId,
    }
    try{
      await axios.post(SERVER_URL+"/new/postNewDiary", newDiary)
      dispatch({type: "CREATE", data: newDiary,});
    }
    catch(e){
      console.log("API 에러(/new/postNewDiary)")
    }

    idRef.current += 1;
  };

  const onUpdate = async (targetId, date, content, emotionId) => {
    const editedDiary = {
      id: targetId,
      date: new Date(date).getTime(),
      content,
      emotionId,
    }
    try{
      await axios.post(SERVER_URL+"/edit/postEditedDiary", editedDiary)
      dispatch({type: "UPDATE", data: editedDiary,});
    }
    catch(e){
      console.log("API 에러(/edit/postEditedDiary)")
    }
  };

  const onDelete = async (targetId) => {
    try{
      await axios.delete(SERVER_URL+"/delete/deleteDiary/"+ targetId)
      dispatch({type: "DELETE",targetId,})
    }
    catch(e){
      console.log("API 에러(/delete/deleteDiary/)")
    }
  };

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>;
  } else {
    return (
     
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
export default App;