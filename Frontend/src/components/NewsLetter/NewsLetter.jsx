import "./NewsLetter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h2>Get Exclusive Offers On Your Email</h2>
      <p>Subscribe to our newlwtter and stay updates</p>
      <div>
        <input type="email" placeholder="Your email id" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
