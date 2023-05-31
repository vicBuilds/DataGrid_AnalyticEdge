import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Users} />
        <Route path="/users" Component={Users} />
        <Route path="/posts" Component={Posts} />
        <Route path="/comments" Component={Comments} />
      </Routes>
    </>
  );
}

export default App;
