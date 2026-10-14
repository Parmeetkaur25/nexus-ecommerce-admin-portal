import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaBolt, FaBoxOpen, FaShieldAlt, FaTruck } from 'react-icons/fa'
import ProductGrid from '../../components/ProductGrid'
import ErrorState from '../../components/ErrorState'
import { getAllProducts } from '../../services/productService'
import '../../style/Home.css'

const benefits = [
  { icon: FaTruck, title: 'Fast, free delivery', detail: 'On qualifying orders' },
  { icon: FaShieldAlt, title: 'Secure checkout', detail: 'Your data stays protected' },
  { icon: FaBoxOpen, title: 'Easy returns', detail: '7-day hassle-free returns' },
]

const collections = [
  {
    name: 'Everyday tech',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
    className: 'collection-card--tech',
  },
  {
    name: 'The finishing touch',
    category: 'mens-watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
    className: 'collection-card--style',
  },
  {
    name: 'Make room to unwind',
    category: 'home-decoration',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
    className: 'collection-card--home',
  },
]

function Home() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  return (
    <main className="home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow"><FaBolt aria-hidden="true" /> The good stuff, all in one place</span>
          <h1>Good finds.<br /><span>Better living.</span></h1>
          <p>Thoughtful picks for your everyday — from the latest tech to the little things that make home feel like yours.</p>
          <div className="home-hero-actions">
            <Link to="/products" className="button button-dark">Shop the collection <FaArrowRight aria-hidden="true" /></Link>
            <span className="hero-note">New season arrivals are here</span>
          </div>
          <div className="hero-rating">
            <span className="hero-rating-icon"><FaBoxOpen aria-hidden="true" /></span>
            <p><strong>Thoughtful finds, made simple</strong><br />A little something for every day</p>
          </div>
        </div>
        <div className="home-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1500&q=90"
            alt="Carefully curated everyday technology and accessories"
          />
          <div className="hero-image-caption">
            <span className="caption-dot" />
            <span>Made for your everyday</span>
            <strong>01 / 03</strong>
          </div>
          <div className="hero-floating-card">
            <span className="floating-icon"><FaBolt aria-hidden="true" /></span>
            <span><strong>A little more lovely</strong><small>Find your next favourite</small></span>
          </div>
        </div>
      </section>

      <section className="benefit-strip" aria-label="Shopping benefits">
        {benefits.map(({ icon: Icon, title, detail }) => (
          <div className="benefit-item" key={title}>
            <span className="benefit-icon"><Icon aria-hidden="true" /></span>
            <span><strong>{title}</strong><small>{detail}</small></span>
          </div>
        ))}
      </section>

      <section className="collections-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A good place to start</span>
            <h2>Shop by mood</h2>
          </div>
          <Link to="/products" className="text-link">Explore everything <FaArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="collection-grid">
          {collections.map((collection) => (
            <Link to="/products" className={`collection-card ${collection.className}`} key={collection.name}>
              <img src={collection.image} alt="" loading="lazy" />
              <span className="collection-shade" />
              <span className="collection-label">
                <small>{collection.category.replace('-', ' ')}</small>
                <strong>{collection.name}</strong>
                <span className="collection-arrow"><FaArrowRight aria-hidden="true" /></span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Consider this your shortlist</span>
            <h2>Good things, picked for you</h2>
          </div>
          <Link to="/products" className="text-link">View all products <FaArrowRight aria-hidden="true" /></Link>
        </div>
        {isLoading && <div className="product-loading" role="status">Finding your next favourite…</div>}
        {isError && <ErrorState message={error.message} onRetry={refetch} />}
        {!isLoading && !isError && <ProductGrid products={products.slice(0, 4)} />}
      </section>

      <section className="home-note">
        <div className="home-note-mark" aria-hidden="true">N.</div>
        <div>
          <span className="eyebrow">A little less scrolling, a lot more finding</span>
          <h2>Life’s better with things you love.</h2>
          <p>We bring together the pieces worth bringing home — practical, considered, and always a little delightful.</p>
        </div>
        <Link to="/products" className="button button-light">Meet your next favourite <FaArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
  )
}

export default Home
