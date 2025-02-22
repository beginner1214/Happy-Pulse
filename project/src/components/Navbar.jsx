import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Stethoscope, Calendar, Video, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Navbar - Current user:', user);
    console.log('Navbar - Current location:', location.pathname);
  }, [user, location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDashboardClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const dashboardPath = user.userType === 'patient' ? '/patientpage' : '/doctorpage';
    console.log('Navigating to:', dashboardPath);
    navigate(dashboardPath);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-[#09B480]" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                HappyPulse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Dashboard Button - Show only when logged in */}
            {user && (
              <button
                onClick={handleDashboardClick}
                className="flex items-center text-gray-600 hover:text-[#09B480]"
              >
                {user.userType === 'patient' ? 'Patient Dashboard' : 'Doctor Dashboard'}
              </button>
            )}
            
            {/* Navigation Links */}
            <Link
              to="/prevention"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <Heart className="h-5 w-5 mr-1" />
              <span>Prevention</span>
            </Link>
            <Link
              to="/symptoms"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <span>Symptoms</span>
            </Link>
            <Link
              to="/treatment"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <span>Treatment Plans</span>
            </Link>
            <Link
              to="/education"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <Video className="h-5 w-5 mr-1" />
              <span>Education</span>
            </Link>
            <Link
              to="/appointments"
              className="flex items-center text-gray-600 hover:text-[#09B480]"
            >
              <Calendar className="h-5 w-5 mr-1" />
              <span>Appointments</span>
            </Link>

            {/* Authentication Buttons */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-[#09B480]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#09B480] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {user.username} ({user.userType})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[#09B480]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Dashboard Button in Mobile Menu */}
              {user && (
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-[#09B480]"
                >
                  {user.userType === 'patient' ? 'Patient Dashboard' : 'Doctor Dashboard'}
                </button>
              )}
              
              {/* Mobile Navigation Links */}
              <Link
                to="/prevention"
                className="block px-3 py-2 text-gray-600 hover:text-[#09B480]"
                onClick={() => setIsMenuOpen(false)}
              >
                Prevention
              </Link>
              <Link
                to="/symptoms"
                className="block px-3 py-2 text-gray-600 hover:text-[#09B480]"
                onClick={() => setIsMenuOpen(false)}
              >
                Symptoms
              </Link>
              <Link
                to="/treatment"
                className="block px-3 py-2 text-gray-600 hover:text-[#09B480]"
                onClick={() => setIsMenuOpen(false)}
              >
                Treatment Plans
              </Link>
              <Link
                to="/education"
                className="block px-3 py-2 text-gray-600 hover:text-[#09B480]"
                onClick={() => setIsMenuOpen(false)}
              >
                Education
              </Link>
              <Link
                to="/appointments"
                className="block px-3 py-2 text-gray-600 hover:text-[#09B480]"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointments
              </Link>

              {/* Mobile Authentication Buttons */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-600 hover:text-[#09B480]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-[#09B480] text-white rounded-md hover:bg-opacity-90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="px-3 py-2">
                  <div className="text-gray-600 mb-2">
                    {user.username} ({user.userType})
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;