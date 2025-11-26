import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentBranch from './pages/StudentBranch';
import Events from './pages/Events';
import Admin from './pages/Admin';
import Members from './pages/Members';
import Blogs from './pages/Blogs';
import AdminLogin from './pages/AdminLogin';
import SetupAdmin from './pages/SetupAdmin';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="student-branch" element={<StudentBranch />} />
        <Route path="events" element={<Events />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="setup-admin" element={<SetupAdmin />} />
        <Route path="admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="members" element={<Members />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="gallery" element={<div className="container" style={{padding: '50px'}}><h2>Gallery Page (Coming Soon)</h2></div>} />
        <Route path="contact" element={<div className="container" style={{padding: '50px'}}><h2>Contact Page (Coming Soon)</h2></div>} />
      </Route>
    </Routes>
  );
}

export default App;
