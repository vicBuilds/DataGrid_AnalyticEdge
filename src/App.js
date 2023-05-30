import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/users" Component={Users} />
        <Route path="/posts" Component={Posts} />
        <Route path="/comments" Component={Comments} />
      </Routes>
    </>
  );
}

export default App;
