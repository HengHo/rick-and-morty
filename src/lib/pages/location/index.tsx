'use client';

import SearchBar from '@/lib/components/searchbar';
import LocationTable from '@/lib/components/table';
import { Container, Typography, Button, CircularProgress, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Location = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, name?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/location?page=${page}${name ? `&name=${name}` : ''}`);
      const json = await res.json();

      if (json.data) {
        setData(json.data);
        setHasMore(json.info?.next !== null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, searchTerm);
  }, [page, searchTerm]);

  const handleFirstPage = () => setPage(1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handleLastPage = () => setPage(100); // คุณสามารถกำหนดหมายเลขหน้าสุดท้ายตามจำนวนข้อมูลทั้งหมด

  return (
    <div>
     <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 2,
    mb: 2,
    mt:2
  }}
>
  <Typography variant="h2" textAlign={{ xs: 'center', md: 'left' }}>
    Location
  </Typography>
  <SearchBar onSearch={(term) => setSearchTerm(term)} enableFilter={false} />
</Box>

      <Container maxWidth="xl">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <LocationTable data={data} />
          
        )}
      </Container>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button onClick={handleFirstPage} disabled={loading}>First</Button>
        <Button onClick={handlePreviousPage} disabled={loading || page === 1}>Previous</Button>
        <Button onClick={handleNextPage} disabled={loading || !hasMore}>Next</Button>
        
      </div>
    </div>
  );
};

export default Location;
