/* eslint-disable */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Council from "./components/Pages/Council";
import History from "./components/Pages/History";
import Login from "./components/Pages/Login";
import Missing from "./components/Pages/Missing";
import News from "./components/Pages/News";
import Project from "./components/Pages/Project";
import Sidebar from "./components/Sidebar/Sidebar";
import PersistentLogin from "./routes/PersistentLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import useAuth from "./components/hooks/useAuth";
import EditChief from "./components/Pages/EditChief";
import EditNews from "./components/Pages/EditNews";
import EditProject from "./components/Pages/EditProject";
import Users from "./components/Pages/Users";
import EditUser from "./components/Pages/EditUser";
import Event from "./components/Pages/Event";
import EditEvent from "./components/Pages/EditEvent";
import NewUser from "./components/Pages/NewUser";

function App () {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<NewUser />} />

        <Route element={<PersistentLogin/>} >
          <Route element={<ProtectedRoute/>}>
            <Route path="/council" element={<Sidebar />}>
              <Route path="/council" element={<Council />}/>
            </Route>
            <Route path="/history" element={<Sidebar />}>
              <Route path="/history" element={<History />}/>
            </Route>
            <Route path="/news" element={<Sidebar />}>
              <Route path="/news" element={<News />}/>
            </Route>
            <Route path="/event" element={<Sidebar />}>
              <Route path="/event" element={<Event />}/>
            </Route>
            <Route path="/project" element={<Sidebar />}>
              <Route path="/project" element={<Project />}/>
            </Route>
            <Route path="/users" element={<Sidebar />}>
              <Route path="/users" element={<Users />}/>
            </Route>
            <Route path="/chief/:id" element={<Sidebar />}>
              <Route path="/chief/:id" element={<EditChief />}/>
            </Route>
            <Route path="/news/:id" element={<Sidebar />}>
              <Route path="/news/:id" element={<EditNews />}/>
            </Route>
            <Route path="/project/:id" element={<Sidebar />}>
              <Route path="/project/:id" element={<EditProject />}/>
            </Route>
            <Route path="/user/:id" element={<Sidebar />}>
              <Route path="/user/:id" element={<EditUser />}/>
            </Route>
            <Route path="/event/:id" element={<Sidebar />}>
              <Route path="/event/:id" element={<EditEvent />}/>
            </Route>
          </Route>
        </Route>

        <Route>
          <Route path="*" element={<Missing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
