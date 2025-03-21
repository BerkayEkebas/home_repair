import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // MUI simgesi

function AnnouncementCard({ record }) {
  const [viewers, setViewers] = useState(record?.viewers || 0);
  const [isMinute, setIsMinute] = useState(false);
  const [isHour, setIsHour] = useState(false);
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    if (record) {
      setViewers(record.viewers || 0);
  
      // Duyuru tarihini string olarak al
      const duyuruDate = record.duyuru_date;
  
      // Şu anki tarihi al
      const now = dayjs();
  
      if (duyuruDate) {
        const createdAt = dayjs(record.createdAt);
        // Duyuru tarihini parse et
        const [day, month, year] = duyuruDate.split(".").map(Number);
        const parsedDate = dayjs(`${year}-${month}-${day}`); // YYYY-MM-DD formatına çevirip parse ediyoruz
  
        if (parsedDate.isValid()) {
          // Gün karşılaştırması
          const isSameDay = now.date() === day; // Şu anki gün ile duyuru günü eşit mi?
  
          setIsDay(isSameDay); // Aynı günse true, değilse false
          setIsMinute(createdAt.isAfter(now.subtract(15, "minute")));
          setIsHour(createdAt.isAfter(now.subtract(2, "hour")));
        } else {
          console.error("Geçersiz tarih formatı:", duyuruDate);
          setIsMinute(false);
          setIsHour(false);
          setIsDay(false);
        }
      } else {
        console.error("Duyuru tarihi mevcut değil:", duyuruDate);
        setIsDay(false);
        setIsMinute(false);
        setIsHour(false);
        setIsDay(false);
      }
    }
  }, [record]);
  
  


  if (!record) return null;

  const slug = record.duyuru_link
    ?.split("/")
    .filter(Boolean)
    .pop()
    .replace("?", "");

  const cleanTitle = (title) => {
    return title?.replace(/^[^\w\sİıĞğÜüŞşÇçÖö'"]+/g, "").trim() || "";
  };

  const truncateText = (text, maxLength) => {
    return (text?.length > maxLength ? text.slice(0, maxLength) + "..." : text) || "";
  };

  const handleClick = async () => {
    let updatedViewers;
    if (viewers === null || viewers === undefined) {
      updatedViewers = 1;
    } else {
      updatedViewers = parseInt(viewers, 10) + 1;
    }

    try {
      const response = await axios.post("http://localhost:8800/api/duyuru/viewers", {
        id: record.id,
        viewers: updatedViewers,
      });

      if (response.data.viewers) {
        setViewers(response.data.viewers);
      }
    } catch (err) {
      console.error("Error updating viewers:", err);
    }
  };

  function CardAnimation(){
    if(isMinute){
     return (              <p
        style={{
          position: "absolute",
          top: "-38px",
          right: "-12px",
          display: "flex",
          alignItems: "center",
          borderRadius:'3px',
          fontSize: "0.4rem",
          fontWeight: "bold",
          backgroundColor: "red", // Arka plan rengi kırmızı
          color: "red",
          cursor: "default",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
        title="Yeni Duyuru"
      >
        <NotificationsActiveIcon
          sx={{
            fontSize: "1rem",
            marginLeft:1,
            animation: "blink 2s infinite",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.3 },
              "100%": { opacity: 1 },
            },
          }}
          style={{
            color: "black", // İkon rengi siyah olarak ayarlandı
          }}
        />
        <span
          style={{
            animation: "blink 2s infinite",
            fontSize: "0.7rem",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.3 },
              "100%": { opacity: 1 },
            },
            backgroundColor: "transparent", // Arka plan rengi kaldırıldı
          }}
        >
          Son Dakika
        </span>
      </p>)
    }
    else if(isHour){
      return(              <p
        style={{
          position: "absolute",
          top: "-38px",
          right: "-12px",
          display: "flex",
          alignItems: "center",
          borderRadius:'3px',
          fontSize: "0.4rem",
          fontWeight: "bold",
          backgroundColor: "#ff8100", 
          color: "red",
          cursor: "default",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
        title="Yeni Duyuru"
      >
        <NotificationsActiveIcon
          sx={{
            fontSize: "1rem",
            marginLeft:1,
            animation: "blink 2s infinite",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.3 },
              "100%": { opacity: 1 },
            },
          }}
          style={{
            color: "black", // İkon rengi siyah olarak ayarlandı
          }}
        />
        <span
          style={{
            animation: "blink 2s infinite",
            fontSize: "0.7rem",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.3 },
              "100%": { opacity: 1 },
            },
            backgroundColor: "transparent", // Arka plan rengi kaldırıldı
          }}
        >
          Yeni
        </span>
      </p>)
    }
    else if(isDay){
      return(              <p
        style={{
          position: "absolute",
          top: "-38px",
          right: "-12px",
          display: "flex",
          alignItems: "center",
          borderRadius:'3px',
          fontSize: "0.4rem",
          fontWeight: "bold",
          backgroundColor: "#1bc73e", 
          color: "red",
          cursor: "default",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
        title="Bugün"
      >
        <NotificationsActiveIcon
          sx={{
            fontSize: "1rem",
            marginLeft:1,
            animation: "blink 2s infinite",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.3 },
              "100%": { opacity: 1 },
            },
          }}
          style={{
            color: "black", // İkon rengi siyah olarak ayarlandı
          }}
        />
        <span
          style={{
            animation: "blink 2s infinite",
            fontSize: "0.7rem",
            "@keyframes blink": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.3 },
              "100%": { opacity: 1 },
            },
            backgroundColor: "transparent", // Arka plan rengi kaldırıldı
          }}
        >
          Bugün
        </span>
      </p>)
    }
  }

  return (
    <>
      <hr className="invis" />
      <div className="blog-box row">
        <div className="col-md-3">
          <div className="post-media" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Link
              to={record.duyuru_content !== "" ? `/duyuru/${slug}-${record.id}` : record.duyuru_link}
              state={{ id: record.id }}
              onClick={handleClick}
              className="img-link"
            >
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease, object-position 0.3s ease",
                }}
                src={record.image}
                alt=""
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
        <div className="blog-meta big-meta col-md-8">
          <h3 style={{ position: "relative" }}>
            <Link
              to={record.duyuru_content !== "" ? `/duyuru/${slug}-${record.id}` : record.duyuru_link}
              title=""
              onClick={handleClick}
            >
              {truncateText(cleanTitle(record.duyuru_title), 150)}
            </Link>
              <CardAnimation/>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: truncateText(record.duyuru_content, 150) }} />
          <div style={{ marginBottom: "10px" }}>
            <Link
              to={record.duyuru_content !== "" ? `/duyuru/${slug}-${record.id}` : record.duyuru_link}
              state={{ id: record.id }}
              onClick={handleClick}
            >
              Devamını okuyun...
            </Link>
          </div>
          <div style={{ marginTop: "10px" }}>
            <small>
              <i className="fa fa-eye" /> {viewers || 0}
            </small>
            <small>{record.duyuru_date || "Tarih yok"}</small>
            <small>
              <a href={`/${record.website_id}`}>{record.name || "Yazar yok"}</a>
            </small>
            {record.duyuru_unit ? <small>{record.duyuru_unit || ""}</small> : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncementCard;
