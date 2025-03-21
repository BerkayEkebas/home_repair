import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

function SingleAnnouncement() {
  const { slugAndId } = useParams(); // :slug-:id parametresi

  // ID'yi ayrıştırmak
  const id = slugAndId.split('-').pop(); // Slug ve ID'yi ayırıp ID'yi alıyoruz

  const [records, setRecords] = useState([]);
  const [relatedAnnouncements, setRelatedAnnouncements] = useState([]);

  const cleanTitle = (title) => title?.replace(/^[^\w\sİıĞğÜüŞşÇçÖö'"]+/g, "").trim() || "";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllRecords = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/duyuru/detay/${id}`);
        setRecords(res.data);
        axios
          .post("http://localhost:8800/api/duyuru/mostcommon", {
            tag: res.data.tag, // Burada doğrudan API yanıtını kullanıyoruz
            website_id: res.data.website_id,
            excludeId: res.data.id
          })
          .then((response) => setRelatedAnnouncements(response.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllRecords();
  }, [id]);

  const handleSlug = (record) => {
    const slug = record
      ?.split('/')
      .filter(Boolean)
      .pop()
      .replace('?', '');
    return slug;
  };

  const slowScrollToTop = (id, viewers) => {
    const scrollHeight = window.scrollY;
    const scrollStep = scrollHeight / 100;
    const delay = 7;

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY - scrollStep);
        setTimeout(scrollAnimation, delay);
      }
    };
    handleClick(id, viewers)
    scrollAnimation(); // TODO 0 0 atiyoruz daha sonra degistirilecek
  };
  const handleClick = (id, viewers) => {
    let updatedViewers;
      // Eğer viewers değeri null veya undefined ise 1 olarak ayarla
      if (viewers === null || viewers === undefined) {
        updatedViewers = 1;
      } else {
        // Eğer viewers değeri varsa 1 arttır
        updatedViewers = parseInt(viewers, 10) + 1;
      }
    // API'ye güncellenmiş viewers bilgisini gönder ve response'u kontrol et
    try {
      axios.post('http://localhost:8800/api/duyuru/viewers', {
        id: id,
        viewers: updatedViewers,
      });
    } catch (err) {
      console.error("Error updating viewers:", err);
    }
  };

  return (
    <section className="section wb">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <div className="page-wrapper">
              <div className="blog-title-area">
                <span className="color-green">
                  <Link to={`/${records.website_id}`} state={{ siteName: records.name }}>
                    {records.name || "Yazar yok"} {/* Varsayılan yazar metni */}
                  </Link>
                </span>
                <h3>{cleanTitle(records.duyuru_title)}</h3>
                <div className="blog-meta big-meta">
                  <small>
                    {records.duyuru_date}
                  </small>
                  <small>
                    <Link to={`/${records.website_id}`} state={{ siteName: records.name }}>
                      {records.name || "Yazar yok"} {/* Varsayılan yazar metni */}
                    </Link>
                  </small>
                  <small>
                    <i className="fa fa-eye" /> {(records.viewers === null || records.viewers === '') ? 0 : records.viewers}
                  </small>
                </div>
              </div>
              <div className="single-post-media">
                <img src={records.annimage} alt="" className="img-fluid" style={{ width: '700px', height: '450px' }} />
              </div>
              <div className="blog-content">
                <div className="pp">
                  <h3 style={{ marginLeft: '-30px' }}>
                    <strong>{records.duyuru_unit}</strong>
                  </h3>
                  <div style={{ marginBottom: '10px', marginLeft: '-30px' }} dangerouslySetInnerHTML={{ __html: records.duyuru_content }} />
                  <a
                    href={records.duyuru_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{ marginLeft: '-30px' }}>
                      Daha fazlasını öğrenmek için duyurunun sayfasını ziyaret edin
                    </span>
                  </a>
                </div>
              </div>
              <div style={{ marginTop: '20px', marginLeft: '8px' }} className="blog-title-area">
                <div className="tag-cloud-single">
                  <span>Tags</span>
                  <small>{records.tag}</small>
                </div>
              </div>
              <hr className="invis1" />
              <div className="custombox clearfix">
                <h4 className="small-title">İlginizi çekebilecek duyurular</h4>
                <div style={{ marginLeft: '-20px' }} className="row">
                  {relatedAnnouncements.map((announcement) => (
                    <div className="col-lg-6" key={announcement.id} >
                      <div className="blog-box">
                        <div className="post-media">
                          <Link to={announcement.duyuru_content !== '' ? `/duyuru/${handleSlug(announcement.duyuru_link)}-${announcement.id}` : announcement.duyuru_link} onClick={() => slowScrollToTop(announcement.id, announcement.viewers)} title="">
                            <img src={announcement.annimage} alt="" className="img-fluid" />
                            <div className="hovereffect">
                              <span className="" />
                            </div>
                          </Link>
                        </div>
                        <div className="blog-meta">
                          <h4>
                            <Link to={announcement.duyuru_content !== '' ? `/duyuru/${handleSlug(announcement.duyuru_link)}-${announcement.id}` : announcement.duyuru_link} onClick={() => slowScrollToTop(announcement.id, announcement.viewers)} title="">
                              {announcement.duyuru_title}
                            </Link>
                          </h4>
                          <small>
                              {announcement.tag}
                          </small>
                          <small>
                              {new Date(announcement.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  );
}

export default SingleAnnouncement;
