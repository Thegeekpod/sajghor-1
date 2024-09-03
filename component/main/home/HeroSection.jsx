import React from 'react'

const HeroSection = () => {
  return (
    <section id="banner-slider" className="banner-slider">
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to={0}
          className="active"
        />
        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
      </ol>
      <div className="carousel-inner" role="listbox">
        {/* Slide One - Set the background image for this slide in the line below */}
        <div
          className="carousel-item active"
          style={{ backgroundImage: 'url("/images/banner.jpg")' }}
        >
          <div className="carousel-caption first-cc">
            <h1>Saajghar</h1>
            <p>
              Suspendisse ac enim a eros auctor eleifend at phasellus eu augue
              ut turpis viverra interdum.
            </p>
            <a href="#" className="banner-btn">
              Shop Now
            </a>
          </div>
        </div>
        {/* Slide Two - Set the background image for this slide in the line below */}
        <div
          className="carousel-item"
          style={{ backgroundImage: 'url("/images/banner.jpg")' }}
        >
          <div className="carousel-caption d-none d-md-block">
            <h1>Saajghar</h1>
            <p>
              Suspendisse ac enim a eros auctor eleifend at phasellus eu augue
              ut turpis viverra interdum.
            </p>
            <a href="#" className="banner-btn">
              Shop Now
            </a>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <img src="/images/ban-left-btn.png" className="img-fluid" />
        </span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          <img src="/images/ban-right-btn.png" className="img-fluid" />
        </span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </section>
  )
}

export default HeroSection