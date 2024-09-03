
import { lazy } from 'react';

const BestSellingProduct = lazy(() => import('@/component/main/home/BestSellingProducts'));
const NewCollectionProducts = lazy(() => import('@/component/main/home/NewCollectionProducts'));
const HeroSection = lazy(() => import('@/component/main/home/HeroSection'));
const PopulerCategories = lazy(() => import('@/component/main/home/PopulerCategories'));
const About = lazy(() => import( '@/component/main/home/About'));



export default function Home() {
  return (
    <>
   
<HeroSection/>
  <PopulerCategories/>
 <BestSellingProduct/>
 <NewCollectionProducts/>
   <About/>
    <section id="collection-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="mv-ctn-box-left">
              <h2>See Our Collection</h2>
              <p>
                Lorem ipsum dolor sit amet, conssectetur adipidfscing elit.
                Aliquam ipsum tellus, varr iohus, auctor pntdfdfesque libero.
                Vestibulum ultricies, neque inasd dfsae elementum ultricies, ex
                feugiat lacus, sagittis faucibus mi gthddui at purus. Atote nissim
                lorem et dis gnissim feugiat. Suspendisse sit amet est euismod
                libero eleifend feugiat. Maecenas sollicitudin elit ipsum. Aliquam
                egestas nibh nec erat interdum, nec facilisis felis tincidunt.
                Proin linia mattis magna in semper. Aliquam eu velit molestie,
                aliquam libero ac, ornare leo.
              </p>
              <p>
                Suspendisse nec ligula nunc. Ut scelerisque eros vitae libero
                interdum, a sollicitudin metus ullamcorper. Sed a viverra lectus.
                Fusce sit amet ligula semper, euismod ligula in, mollis elit.
                Praesent condimentum dui sed est semper ante id elit tincidunt
                scelerisque ut quis odio.{" "}
              </p>
              <a href="#" className="rm-btn mt-3">
                Shop Now
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mv-ctn-box-right hover15">
              <div>
                <div>
                  <img src="/images/mav-pic.jpg" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="top-footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Get in touch via our website or call us at +91 9876543210</h1>
          </div>
        </div>
      </div>
    </section>
    <section id="banner-bottom-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="banner-btm-Box">
              <ul>
                <li>
                  <img
                    src="/images/bb-icon1.png"
                    className="img-fluid"
                    alt="..."
                  />
                </li>
                <li>
                  <h5>Return In 4 Days</h5>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="banner-btm-Box">
              <div className="media">
                <img src="/images/bb-icon2.png" className="img-fluid" alt="..." />
                <div className="media-body">
                  <h5>Cash On Delivery Across India</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="banner-btm-Box">
              <div className="media">
                <img src="/images/bb-icon3.png" className="img-fluid" alt="..." />
                <div className="media-body">
                  <h5>Support 24/7 Active Support</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
  </>
  
  );
}
