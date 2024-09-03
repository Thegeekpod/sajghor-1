import React from 'react'

const Footer = () => {
  return (
    <footer id="main_footer">
      <div id="top-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 fst-footer">
              <h4>About Company</h4>
              <p>
                Quisque nunc elit, viverra non molestie auctor, pretium ut massa.
                Ut aliquam neque vitae iaculis commodo gravida lobortis lacus, eu
                fringilla quam commodo sit amet.{" "}
              </p>
            </div>
            <div className="col-lg-4">
              <h4>Useful Links</h4>
              <ul className="footer-menu">
                <li>
                  <a href="">Blog</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
                <li>
                  <a href="">Privacy Policy</a>
                </li>
                <li>
                  <a href="">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h4>Get in Touch</h4>
              <p>Street Address Here,</p>
              <p>City, State, Zip Code</p>
              <br />
              <p className="footer-contact">+91 9876543210</p>
              <p className="footer-contact">Info@companyname.com</p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer-copyright">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <p>
                © 2022 All Rights Reserved. Saajghar. | Design and Developed By{" "}
                <a href="https://www.webredas.com/">Webredas</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer