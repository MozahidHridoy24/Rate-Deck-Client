import { Link } from "react-router";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const Banner = () => {
  return (
    <div className=" carousel w-full h-[70vh]">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div
          className="w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: `url(${banner1})`,
          }}
        >
          <div className=" bg-opacity-50 w-full h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className=" text-4xl md:text-6xl font-bold mb-4">
                Discover Trusted Services
              </h1>
              <p className="mb-5 text-lg md:text-xl">
                Find professionals rated by real users like you.
              </p>
              <Link to="/services" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div
          className="w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: `url(${banner2})`,
          }}
        >
          <div className=" bg-opacity-50 w-full h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className=" text-4xl md:text-6xl font-bold mb-4">
                Rate & Review Easily
              </h1>
              <p className="mb-5 text-lg md:text-xl">
                Share your service experiences with the world.
              </p>
              <Link to="/login" className="btn btn-secondary">
                Join Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div
          className="w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: `url(${banner3})`,
          }}
        >
          <div className=" bg-opacity-50 w-full h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className=" text-4xl md:text-6xl font-bold mb-4">
                Empower Quality Choices
              </h1>
              <p className="mb-5 text-lg md:text-xl">
                Your feedback helps others make informed decisions.
              </p>
              <Link to="/register" className="btn btn-accent">
                Register Free
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
