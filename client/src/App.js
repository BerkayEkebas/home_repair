import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import SingleAnnouncement from "./Components/Body/SingleAnnouncement";
import Login from "./Components/Auth/Login";
import DashBoard from "./Pages/Admin/DashBoard";
import UpdateAnnouncementPage from "./Pages/Admin/Announcements/UpdateAnnouncementsPage";
import AnnouncementsPage from "./Pages/Admin/Announcements/AnnouncementsPage";
import CreateNewAnnouncement from "./Pages/Admin/Announcements/CreateNewAnnouncement";
import SearchPage from "./Components/Body/SearchPage";
import { Contact } from "./Components/Body/Contact";
import UpdateWebsites from "./Pages/Admin/Websites/UpdateWebsites";
import UpdateWebsitesDetails from "./Pages/Admin/Websites/UpdateWebsitesDetails";
import '../src/Css/bootstrap.css'; 
import '../src/Css/style.css'; 
import '../src/Css/responsive.css'; 
import '../src/Css/colors.css'; 
import '../src/Css/garden.css'; 
import ManageImages from "./Pages/Admin/Websites/ManageImages";
import ManageAds from "./Pages/Admin/AdsManagement/ManageAds";
import LoadingDuyurular from "./Components/Body/LoadingDuyurular";
import Register from "./Components/Auth/Register";


function App() {
  return (
    <Routes>
      <Route path="/admin/*">
      <Route index element={<DashBoard/>} />
      <Route path="duyuru" element={<AnnouncementsPage />} />
      <Route path="duyuru/update/:id" element={<UpdateAnnouncementPage />} />
      <Route path="duyuru/create" element={<CreateNewAnnouncement />} />
      <Route path="websites" element={<UpdateWebsites />} />
      <Route path="websites/update/:id" element={<UpdateWebsitesDetails />} />
      <Route path="allimages" element={<ManageImages />} />
      <Route path="manage/ads" element={<ManageAds />} />
      </Route>
      <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/panel" element={<HomePage />} />
      <Route path="/anasayfa" element={<HomePage />} />
      <Route path="/kurumlar" element={<HomePage />} />
      <Route path="/bakanliklar" element={<HomePage />} />
      <Route path="/cumhurbaskanligi" element={<HomePage />} />
      <Route path="/resmi-gazete" element={<HomePage />} />
      <Route path="/:siteId" element={<HomePage />} />
      <Route path="/duyuru/:slugAndId" element={<SingleAnnouncement />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/iletisim" element={<Contact />} />
      <Route path="/loading" element={<LoadingDuyurular />} />
      <Route path="/search/:searchTerm" element={<SearchPage />} />
      <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
