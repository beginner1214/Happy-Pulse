import { useNavigate } from "react-router-dom";
import {
  Play,
  Calendar,
  Shield,
  Activity,
  Star,
  Users,
  Award,
  Clock,
  Phone,
  MapPin,
} from "lucide-react";
import ReactPlayer from "react-player";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/prevention");
  };

  const handleBookNow = () => {
    navigate("/appointments");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#dfffe2] h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive healthcare solutions at your fingertips
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#09B480] text-white px-8 py-3 rounded-md hover:bg-opacity-90 shadow-lg mt-7" 
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-[#09B480] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Disease Prevention</h3>
              <p className="text-gray-600">
                Learn how to protect yourself and stay healthy
              </p>
            </div>
            <div className="text-center p-6">
              <Activity className="h-12 w-12 text-[#09B480] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Symptom Detection</h3>
              <p className="text-gray-600">
                Early detection for better treatment outcomes
              </p>
            </div>
            <div className="text-center p-6">
              <Calendar className="h-12 w-12 text-[#09B480] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments with top healthcare providers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#09B480] mb-2">10k+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#09B480] mb-2">100+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#09B480] mb-2">50+</div>
              <div className="text-gray-600">Medical Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#09B480] mb-2">24/7</div>
              <div className="text-gray-600">Available Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Expert Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Jha",
                specialty: "Cardiologist",
                image:
                  "https://t4.ftcdn.net/jpg/06/47/16/29/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
              },
              {
                name: "Dr. Sachin Maurya",
                specialty: "Neurologist",
                image:
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
              },
              {
                name: "Dr. Priya Verma  ",
                specialty: "Pediatrician",
                image:
                  "https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc=",
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                  <p className="text-[#09B480] mb-4">{doctor.specialty}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">4.9</span>
                    </div>
                    <button className="text-[#09B480] hover:underline">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Education Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Health Education
          </h2>
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {[1, 2, 3].map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden w-80"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <ReactPlayer
                    url={
                      index === 0
                        ? "https://www.youtube.com/watch?v=0xo5e9pEjVI"
                        : index === 1
                        ? "https://www.youtube.com/watch?v=zJnZXInr83k"
                        : "https://www.youtube.com/watch?v=BNGmp2n-Djo"
                    }
                    width="100%"
                    height="100%"
                    light={true}
                    playIcon={<Play className="h-16 w-16 text-white" />}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    Understanding COVID-19 Prevention
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Learn about the latest prevention methods
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose HappyPulse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6">
              <Users className="h-12 w-12 text-[#09B480] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-center text-gray-600">
                Highly qualified healthcare professionals dedicated to your care
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Award className="h-12 w-12 text-[#09B480] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Care</h3>
              <p className="text-center text-gray-600">
                State-of-the-art facilities and personalized treatment plans
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Clock className="h-12 w-12 text-[#09B480] mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-center text-gray-600">
                Round-the-clock medical assistance and emergency care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions? Our team is here to help you 24/7
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#09B480] mr-3" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#09B480] mr-3" />
                  <span className="text-gray-600">
                    123 Healthcare Ave, Medical City, MC 12345
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09B480]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09B480]"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09B480]"
                ></textarea>
                <button className="w-full bg-[#09B480] text-white py-3 rounded-md hover:bg-opacity-90">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="py-16 bg-gradient-to-b from-[#dfffe2] to-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Schedule an Appointment</h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with our healthcare professionals today
          </p>
          <button
            onClick={handleBookNow}
            className="bg-[#09B480] text-white px-8 py-3 rounded-md hover:bg-opacity-90 shadow-lg"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;


