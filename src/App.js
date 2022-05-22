import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id:1,
    author: "Jordan",
    content: "Hi",
    emotion: 1,
    created_date: new Date().getTime() // 시간을 밀리초로 변환
  },
  {
    id:2,
    author: "James",
    content: "Hello",
    emotion: 2,
    created_date: new Date().getTime() // 시간을 밀리초로 변환
  },
  {
    id:3,
    author: "Stewart",
    content: "See you",
    emotion: 3,
    created_date: new Date().getTime() // 시간을 밀리초로 변환
  },
  {
    id:4,
    author: "Lee",
    content: "Goodbye",
    emotion: 4,
    created_date: new Date().getTime() // 시간을 밀리초로 변환
  }
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
