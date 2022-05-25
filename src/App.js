import {useState, useRef, useEffect, useMemo} from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author: "Jordan",
//     content: "Hi",
//     emotion: 1,
//     created_date: new Date().getTime() // 시간을 밀리초로 변환
//   },
//   {
//     id:2,
//     author: "James",
//     content: "Hello",
//     emotion: 2,
//     created_date: new Date().getTime() // 시간을 밀리초로 변환
//   },
//   {
//     id:3,
//     author: "Stewart",
//     content: "See you",
//     emotion: 3,
//     created_date: new Date().getTime() // 시간을 밀리초로 변환
//   },
//   {
//     id:4,
//     author: "Lee",
//     content: "Goodbye",
//     emotion: 4,
//     created_date: new Date().getTime() // 시간을 밀리초로 변환
//   }
// ];

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);
  const getData = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments')
    .then((response)=>response.json());
    const initData = response.slice(0,20).map((it)=>{
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      }
    });
    setData(initData);
  };
  useEffect(()=>{
    getData();
  },[])
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => { return it.id !== targetId });
    setData(newDiaryList);
  };
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content:newContent} : it)
    )
  };
  const getDiaryAnalysis = useMemo(() => {
    console.log('일기 분석 시작');
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length-goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio}; 
  },[data.length]);
  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
