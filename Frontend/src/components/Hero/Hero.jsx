import "./hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arro_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-hand-icon">
          <p>
            new <img src={hand_icon} alt="" /> collection for everyone
          </p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arro_icon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
