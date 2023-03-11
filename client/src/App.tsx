import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import History from "./component/Pages/History";
import Council from "./component/Pages/Council";
import Home from "./component/Pages/Home";
import Project from "./component/Pages/project/Project";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Pages/Footer";
import News from "./component/Pages/News/News";
import NewsDetail from "./component/Pages/News/NewsDetail";
import ProjectDetail from "./component/Pages/project/ProjectDetail";
import Event from "./component/Pages/Event/Event";
import EventDetail from "./component/Pages/Event/EventDetail";

function App () {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/council" element={<Council/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/project" element={<Project/>}/>
        <Route path="/event" element={<Event/>}/>
        <Route path="/news/:id" element={<NewsDetail />}/>
        <Route path="/project/:id" element={<ProjectDetail />}/>
        <Route path="/event/:id" element={<EventDetail />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
