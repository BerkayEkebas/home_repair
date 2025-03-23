import { db } from "../connect.js"


export const getRequests = (req, res) => {
    const userId = req.body.user_id;  // user_id'yi body'den alıyoruz
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });  // Eğer user_id yoksa hata dönüyoruz
    }
  
    const q = "SELECT * FROM requests WHERE user_id = ?";
    
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };
  

export const createRequests = (req, res) => {
    const { user_id, service_id, description, status } = req.body;

    // Gelen verilerin doğruluğunu kontrol et
    if (!user_id || !service_id || !description || !status) {
        return res.status(400).json({ message: 'Tüm alanlar zorunludur!' });
    }

    // Veritabanına veri ekleme sorgusu
    const q = `
        INSERT INTO requests (user_id, service_id, description, status, created_at) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [user_id, service_id, description, status, new Date()];

    db.query(q, values, (err, result) => {
        if (err) {
            console.error('Veritabanı hatası:', err);
            return res.status(500).json({ message: 'Sunucu hatası' });
        }

        // Başarılı yanıt
        res.status(201).json({
            message: 'Talep başarıyla oluşturuldu',
            requestId: result.insertId, // Oluşturulan talebin ID'si
        });
    });
};