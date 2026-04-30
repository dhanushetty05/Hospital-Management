import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

// Simple placeholder pages

const AppointmentsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Appointments</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-600">No appointments yet. Book your first appointment!</p>
      </div>
    </div>
  </div>
);

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
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 font-semibold">
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
