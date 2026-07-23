import { Link } from 'react-router-dom';
import '../../style/Home.css'

function Home() {
  return (
    <main className="home">

  
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Future of Online Shopping</h1>

          <p>
            Shop the latest electronics, fashion, home essentials,
            and much more with unbeatable prices and fast delivery.
          </p>

          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="features">

        <div className="feature-card">
          🚚
          <h3>Free Shipping</h3>
          <p>Free delivery on orders above ₹999.</p>
        </div>

        <div className="feature-card">
          🔒
          <h3>Secure Payments</h3>
          <p>100% secure payment gateway.</p>
        </div>

        <div className="feature-card">
          ⭐
          <h3>Top Quality</h3>
          <p>Premium products from trusted brands.</p>
        </div>

        <div className="feature-card">
          ↩️
          <h3>Easy Returns</h3>
          <p>7-day hassle-free returns.</p>
        </div>

      </section>

  

    

      <section className="why-us">

        <h2>Why Choose Nexus?</h2>

        <p>
          Nexus is built with customer satisfaction in mind. We provide
          premium products, secure checkout, lightning-fast delivery,
          and world-class customer support.
        </p>

      </section>

    

      <section className="reviews">

        <h2>What Our Customers Say</h2>

        <div className="review-grid">

          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>
              Amazing shopping experience and super fast delivery.
            </p>
            <h4>- Rahul</h4>
          </div>

          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>
              Great quality products at affordable prices.
            </p>
            <h4>- Priya</h4>
          </div>

          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>
              One of the best online shopping websites I've used.
            </p>
            <h4>- Aman</h4>
          </div>

        </div>

      </section>

 

      <section className="newsletter">

        <h2>Subscribe to our Newsletter</h2>

        <p>
          Stay updated with exclusive offers and new arrivals.
        </p>

        <div className="newsletter-box">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>Subscribe</button>

        </div>

      </section>

    </main>
  );
}

export default Home;