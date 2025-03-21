import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useNavContext } from '../../Context/navContext';
import AnnouncementCard from "./AnnouncementCard";
import LoadingDuyurular from "./LoadingDuyurular";
import { Box, Skeleton, Typography } from "@mui/material";

function MainDuyuru() {
  const { navInfo } = useNavContext();
  const [records, setRecords] = useState([]);
  const [latestAnnouncements, setLatestAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const location = useLocation();
  const { siteId } = useParams(); // siteId parametresini URL'den alıyoruz
  const clearPathMenu = location.pathname.replace(/^\/+/, '');
  const [loading, setLoading] = useState(true); // Loading durumu için state
  // Verileri çekme fonksiyonu
  const fetchAllRecords = useCallback(async () => {
    try {
      if (location.pathname === "/anasayfa" || location.pathname === "/") {
        setLoading(true); // Sadece belirli URL'lerde loading durumunu true yap
      }
      const res = await axios.get("http://localhost:8800/api/duyuru/firstnew");

      // Aktif olmayan (pasif) ve null/boş olan kayıtları filtrele
      const filteredRecords = res.data.filter(record => record.active !== 'pasif');
      const parseDate = (dateString) => {
        if (!dateString) return null;
        const separator = dateString.includes('.') ? '.' : '/';
        const [day, month, year] = dateString.split(separator).map(Number);
        return new Date(year, month - 1, day);
      };

      const sortedRecords = filteredRecords.sort((a, b) => {
        const duyuruDateA = parseDate(a.duyuru_date);
        const duyuruDateB = parseDate(b.duyuru_date);

        if (duyuruDateA && duyuruDateB) {
          if (duyuruDateB - duyuruDateA !== 0) {
            return duyuruDateB - duyuruDateA;
          }
          return b.id - a.id;
        }
        if (duyuruDateA) return -1;
        if (duyuruDateB) return 1;
        return 0;
      });

      setRecords(sortedRecords);
      setLatestAnnouncements(sortedRecords.slice(0, 3));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [location.pathname]); // `location.pathname` bağımlılık olarak eklendi


  useEffect(() => {
    fetchAllRecords();
  }, [fetchAllRecords]); // Bileşen ilk yüklendiğinde veriyi çeker

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    slowScrollToTop();
  }, []); // Fonksiyon sabit kalacaksa bağımlılıkları boş bırakabilirsiniz
  // navInfo değiştiğinde verileri yeniden çek
  useEffect(() => {
    handlePageChange(1);
    setRecords([]); // Önce tüm kayıtları sıfırla
    fetchAllRecords(); // Ardından verileri yeniden çek

  }, [navInfo, handlePageChange, fetchAllRecords]); // navInfo değiştiğinde verileri yeniden çek

  // siteId varsa ona göre filtrele
  const filteredRecords = records.filter(record => {
    if (siteId) {
      return record.website_id === parseInt(siteId); // siteId parametresine göre filtreleme
    }

    return navInfo | clearPathMenu === 'kurumlar' ? record.tag === 'Kurumlar' :
      navInfo | clearPathMenu === 'cumhurbaskanligi' ? record.tag === 'Cumhurbaskanliği' :
        navInfo | clearPathMenu === 'bakanliklar' ? record.tag === 'Bakanliklar' :
          navInfo | clearPathMenu === 'resmi-gazete' ? record.tag === 'Resmi-Gazete' :
            true; // Diğer durumlarda tüm kayıtları al
  }
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const slowScrollToTop = () => {
    const scrollHeight = window.scrollY;
    const scrollStep = scrollHeight / 100;
    const delay = 4;

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollTo(0, window.scrollY - scrollStep);
        setTimeout(scrollAnimation, delay);
      }
    };
    scrollAnimation();
  };

  //surekli yenileme--------------------------------------------------------------
  const compareAllRecords = useCallback(async () => {
    try {
      const latest = await axios.get("http://localhost:8800/api/duyuru/latest");
      if (records[0]?.id !== latest.data?.id) {
        fetchAllRecords();
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }, [records, fetchAllRecords]); // `fetchAllRecords` eklendi



  useEffect(() => {
    const intervalId = setInterval(() => {
      compareAllRecords();
    }, 60000); // 5 dakika

    // Temizlik işlemi
    return () => clearInterval(intervalId);
  }, [compareAllRecords]); // Artık bağımlılık listesi tamamlandı
  //surekli yenileme--------------------------------------------------------------


  return (<>
    {loading ? <LoadingDuyurular /> : <section className="section wb">
      <div className="container">
        <div className="row" style={{ marginTop: '-40px' }}>
          <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="page-wrapper">
              {siteId ? <Typography variant="h4">{currentRecords[0]?.name} duyuruları</Typography> : ''}

              {currentRecords.length === 0 ? (
                // currentRecords boşken Skeleton göster
                Array.from({ length: 3 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginBottom: 2,
                      padding: 2,
                      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)', // Hafif gölge
                      borderRadius: '8px',
                      backgroundColor: 'white', // Placeholder arka plan rengi
                    }}
                  >
                    <Skeleton variant="text" width="60%" height={30} sx={{ marginBottom: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={150} />
                  </Box>
                ))
              ) : (
                // currentRecords doluyken gerçek veriyi göster
                currentRecords.map((record, index) => (
                  <div key={index} className="blog-list clearfix">
                    <AnnouncementCard record={record} />
                  </div>
                ))
              )}
            </div>
            <hr className="invis" />
            <div className="row">
              <div className="col-md-12">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-start">
                    {currentPage > 3 && (
                      <li className={`page-item ${indexOfLastRecord >= filteredRecords.length ? "disabled" : ""}`}>
                        <Link className="page-link" onClick={() => handlePageChange(currentPage - 1)} to="#">
                          <span style={{ color: 'white' }}>Geri</span>
                        </Link>
                      </li>
                    )}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <Link className="page-link" onClick={() => handlePageChange(1)} to="#">
                        1
                      </Link>
                    </li>
                    <li className={`page-item ${currentPage === 2 ? "disabled" : ""}`}>
                      <Link className="page-link" onClick={() => handlePageChange(2)} to="#">
                        2
                      </Link>
                    </li>
                    <li className={`page-item ${currentPage === 3 ? "disabled" : ""}`}>
                      <Link className="page-link" onClick={() => handlePageChange(3)} to="#">
                        3
                      </Link>
                    </li>
                    {currentPage > 3 && (
                      <>
                        <li className="page-item">
                          <span className="page-link">...</span>
                        </li>
                        <li className={`page-item ${currentPage > 3 ? "disabled" : ""}`}>
                          <Link className="page-link" onClick={() => handlePageChange(currentPage)} to="#">
                            <span style={{ color: 'black' }}>{currentPage}</span>
                          </Link>
                        </li>
                      </>
                    )}
                    {currentPage >= 3 && (
                      <li className={`page-item ${indexOfLastRecord >= filteredRecords.length ? "disabled" : ""}`}>
                        <Link className="page-link" onClick={() => handlePageChange(currentPage + 1)} to="#">
                          <span style={{ color: 'white' }}>İleri</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <Sidebar latestAnnouncements={latestAnnouncements} />
        </div>
      </div>
    </section>}

  </>

  );
}

export default MainDuyuru;
