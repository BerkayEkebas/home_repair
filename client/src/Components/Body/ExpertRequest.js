import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, CircularProgress } from '@mui/material';
import ExpertRequestCard from './ExpertRequestCard';  // ExpertRequestCard component'ini import et

const ExpertRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/expert/get-requests'); // Tüm talepler için API isteği
        setRequests(response.data);
      } catch (err) {
        setError('요청을 가져오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Teklif Ver butonuna tıklanınca yapılacak işlem
  const handleOfferClick = (requestId) => {
    console.log('Teklif Ver butonuna tıklandı, talep ID:', requestId);
    // Burada teklif verme sürecini başlatabilirsiniz, örneğin bir modal açmak veya yeni bir sayfaya yönlendirmek gibi.
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Container maxWidth="md">
        <h2>모든 요청 보기</h2>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
            {requests.map((request) => (
              <ExpertRequestCard 
                key={request.id} 
                request={request} 
                onOfferClick={handleOfferClick} // Teklif Ver butonuna işlev ekliyoruz
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ExpertRequests;
