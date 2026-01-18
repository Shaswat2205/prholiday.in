import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Packages from './pages/Packages';
import Destinations from './pages/Destinations';
import PackageDetail from './pages/PackageDetail';
import DestinationDetail from './pages/DestinationDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import About from './pages/About';

import Login from './pages/admin/Login';
import DashboardLayout from './components/admin/DashboardLayout';
import Dashboard from './pages/admin/Dashboard';
import PackageList from './pages/admin/PackageList';
import PackageForm from './pages/admin/PackageForm';
import DestinationList from './pages/admin/DestinationList';
import DestinationForm from './pages/admin/DestinationForm';
import GalleryList from './pages/admin/GalleryList';
import GalleryForm from './pages/admin/GalleryForm';
import TestimonialList from './pages/admin/TestimonialList';
import TestimonialForm from './pages/admin/TestimonialForm';
import BookingList from './pages/admin/BookingList';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary-start via-primary-mid to-primary-end">
                        <Navbar />
                        <main className="flex-grow">
                            <Outlet />
                        </main>
                        <Footer />
                    </div>
                }>
                    <Route index element={<Home />} />
                    <Route path="packages" element={<Packages />} />
                    <Route path="packages/:id" element={<PackageDetail />} />
                    <Route path="destinations" element={<Destinations />} />
                    <Route path="destinations/:id" element={<DestinationDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="packages" element={<PackageList />} />
                    <Route path="packages/new" element={<PackageForm />} />
                    <Route path="packages/edit/:id" element={<PackageForm />} />
                    <Route path="destinations" element={<DestinationList />} />
                    <Route path="destinations/new" element={<DestinationForm />} />
                    <Route path="destinations/edit/:id" element={<DestinationForm />} />
                    <Route path="gallery" element={<GalleryList />} />
                    <Route path="gallery/new" element={<GalleryForm />} />
                    <Route path="testimonials" element={<TestimonialList />} />
                    <Route path="testimonials/new" element={<TestimonialForm />} />
                    <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
                    <Route path="bookings" element={<BookingList />} />
                    {/* Add more admin routes here */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
