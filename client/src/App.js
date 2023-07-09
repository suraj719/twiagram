import Home from "./components/Home";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Allposts from "./components/Allposts";

// import { AuthProvider } from "./components/auth";
import Navbar from "./components/Navbar";
import { RequireAuth } from 'react-auth-kit'
// import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
function App() {
  return (
   <div>
    <Navbar/>
    {/* <AuthProvider> */}
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/posts" element={
              <RequireAuth loginPath="/login">
                <Allposts/>
              </RequireAuth>
          }
          ></Route>
          <Route path="/posts/:id" element={<Post />}></Route>
          {/* <Route path="/createpost" element={<CreatePost />}></Route> */}
      </Routes>
    {/* </AuthProvider> */}
   </div>
  );
  
}

export default App;
