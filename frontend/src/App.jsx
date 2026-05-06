import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetail from './pages/DoctorDetail/DoctorDetail';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 pt-20">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg font-semibold">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
