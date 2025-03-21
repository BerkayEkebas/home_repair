import React from 'react';

function Footer() {
  return (
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="widget">
            <div className="footer-text text-center">
              <a href="/">
                <img
                  src="https://cdn.imweb.me/thumbnail/20241008/dc19dc0d01c83.png"
                  alt=""
                  className="img-fluid"
                />
              </a>
              
              <p>
              Duyurular.org'da yayınlanan en güncel duyurulardan haberdar olmak ister misiniz? E-posta adresinizi ve ilgilendiğiniz alanları seçerek abone olun, size özel duyuruları doğrudan e-posta yoluyla iletelim!
              </p>
              <a
                  href="https://www.linkedin.com/company/duyurular-org/"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="LinkedIn"
                >
                  <i className="fa fa-linkedin" />
                </a>
              <hr className="invis" />
              <div className="newsletter-widget text-center">
              Çok yakında abonelik sistemi sizlerle ....
                {/* <SubscriptionCard/> */}
              </div>
              {/* end newsletter */}
            </div>
            {/* end footer-text */}
          </div>
          
          {/* end widget */}
        </div>
        {/* end col */}
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <br />
          <br />
          <div className="copyright">
            © Duyurular.org : Hakkı Saklıdır 2024.
          </div>
        </div>
      </div>
    </div>
    {/* end container */}
  </footer>
  
  
  )
}

export default Footer