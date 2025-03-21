import React from 'react'

const MainTop = () => {
  return (  <>
    <div className="header-section">
    <div className="container" style={{marginTop:-40}}>
      <div className="row justify-content-center">
        <div className="col-12 text-center">
        <div className="logo" style={{
padding: "10px", // Logo etrafında boşluk oluşturur
backgroundColor: "#fff", // Çerçeve arkaplan rengi
borderRadius: "10px", // Köşeleri yuvarlar
boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Gölgelendirme efekti
display: "inline-block" // Logo boyutuna göre çerçeve genişliği
}}>
<a href="https://cdn.imweb.me/thumbnail/20240923/efac60a53f9f7.png">
    <img
        src="https://cdn.imweb.me/thumbnail/20240923/efac60a53f9f7.png"
        alt="Logo"
        className="img-fluid"
        style={{
            width: "70%",
            height: "auto",
        }}
    />
</a>
</div>

        </div>
      </div>
    </div>

    <style>
      {`
  @media (max-width: 767px) {  /* Mobil cihazlar için */
    .logo img {
      width: 100% !important;  /* Mobilde logo genişliğini %100 yap */
    }
  }
  @media (max-width: 767px) {  /* Mobil cihazlar için */
 .logo-container {
   margin-left: -10px !important;
   margin-right: 10px !important;
   padding: 20px 20px !important; /* Mobilde logo genişliğini %100 yap */
 }
 }
    @media (max-width: 767px) {  /* Mobil cihazlar için */
    .logo-container img {
      width: 100% !important;  /* Mobilde logo genişliğini %100 yap */
    }
  }
@media (max-width: 768px) {  /* Ekran genişliği 768px ve üzeri için */
.search-container {
margin-right: 20px !important;  /* Arama ikonu için marginRight'i 420px yap */
}
}
@media (max-width: 768px) {  /* Ekran genişliği 768px ve üzeri için */
.deneme {
margin-right: 40px !important;
margin-left: 10px !important;  /* Arama ikonu için marginRight'i 420px yap */
}
}
    
`}
    </style>
  </div>
    <section className="section first-section">
  <div className="container-fluid">
    <div className="masonry-blog clearfix">
      <div className="left-side">
        <div className="masonry-box post-media">
          <img src="https://cdn.imweb.me/thumbnail/20241114/974b51e91d3aa.png" alt="" className="img-fluid" />
          <div className="shadoweffect">
            <div className="shadow-desc">
              <div className="blog-meta">
                <span className="bg-aqua">
                  <a href="blog-category-01.html" title="">
                    Gardening
                  </a>
                </span>
                <h4>
                  <a href="garden-single.html" title="">
                    How to choose high quality soil for your gardens
                  </a>
                </h4>
                <small>
                  <a href="garden-single.html" title="">
                    21 July, 2017
                  </a>
                </small>
                <small>
                  <a href="#" title="">
                    by Amanda
                  </a>
                </small>
              </div>
              {/* end meta */}
            </div>
            {/* end shadow-desc */}
          </div>
          {/* end shadow */}
        </div>
        {/* end post-media */}
      </div>
      {/* end left-side */}
      <div className="center-side">
        <div className="masonry-box post-media">
          <img src="https://cdn.imweb.me/thumbnail/20240923/efac60a53f9f7.png" alt="" className="img-fluid" />
          <div className="shadoweffect">
            <div className="shadow-desc">
              <div className="blog-meta">
                <span className="bg-aqua">
                  <a href="blog-category-01.html" title="">
                    Outdoor
                  </a>
                </span>
                <h4>
                  <a href="garden-single.html" title="">
                    You can create a garden with furniture in your home
                  </a>
                </h4>
                <small>
                  <a href="garden-single.html" title="">
                    19 July, 2017
                  </a>
                </small>
                <small>
                  <a href="#" title="">
                    by Amanda
                  </a>
                </small>
              </div>
              {/* end meta */}
            </div>
            {/* end shadow-desc */}
          </div>
          {/* end shadow */}
        </div>
        {/* end post-media */}
      </div>
      {/* end left-side */}
      <div className="right-side hidden-md-down">
        <div className="masonry-box post-media">
          <img src="upload/garden_cat_03.jpg" alt="" className="img-fluid" />
          <div className="shadoweffect">
            <div className="shadow-desc">
              <div className="blog-meta">
                <span className="bg-aqua">
                  <a href="blog-category-01.html" title="">
                    Indoor
                  </a>
                </span>
                <h4>
                  <a href="garden-single.html" title="">
                    The success of the 10 companies in the vegetable sector
                  </a>
                </h4>
                <small>
                  <a href="garden-single.html" title="">
                    03 July, 2017
                  </a>
                </small>
                <small>
                  <a href="#" title="">
                    by Jessica
                  </a>
                </small>
              </div>
              {/* end meta */}
            </div>
            {/* end shadow-desc */}
          </div>
          {/* end shadow */}
        </div>
        {/* end post-media */}
      </div>
      {/* end right-side */}
    </div>
    {/* end masonry */}
  </div>
</section></>     


  )
}

export default MainTop