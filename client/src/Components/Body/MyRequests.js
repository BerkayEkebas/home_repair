import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, CircularProgress, Grid } from '@mui/material';
import RequestCard from './RequestCard';  // RequestCard component'ini import et

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const userId = localStorage.getItem('user_id');  // localStorage'den user_id'yi alıyoruz

      if (!userId) {
        setError('사용자 ID를 찾을 수 없습니다. 로그인 후 다시 시도하세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:8800/api/customer/get-requests', {
          user_id: userId  // user_id'yi body olarak gönderiyoruz
        });
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


  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" marginTop={-20}>
      <Container maxWidth="lg">
        <h2>요청 목록</h2>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Grid container spacing={2}>
            {requests.map((request) => (
              <Grid item xs={12} sm={6} md={3} key={request.id}>
                <RequestCard request={request} sx={{ height: 300 }} /> {/* Sabit boyut */}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MyRequests;
