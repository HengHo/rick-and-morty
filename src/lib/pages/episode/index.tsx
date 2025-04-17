"use client";

import SearchBar from "@/lib/components/searchbar";
import CharacterTable from "@/lib/components/table";
import EpisodeTable from "@/lib/components/tableEp";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Episode = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number, name?: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/episode?page=${page}${name ? `&name=${name}` : ""}`
      );
      const json = await res.json();

      if (json.data) {
        setData(json.data);
        setHasMore(json.info?.next !== null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
  const handleLastPage = () => setPage(100); // ตั้งหน้าสุดท้ายตามจำนวนข้อมูลทั้งหมด

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          gap: 2,
          mb: 2,
          mt:2 
        }}
      >
        <Typography variant="h2" textAlign={{ xs: "center", md: "left" }}>
          Episode
        </Typography>
        <SearchBar
          onSearch={(term) => setSearchTerm(term)}
          enableFilter={false}
        />
      </Box>
      <Container maxWidth="xl">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <EpisodeTable data={data} />
        )}
      </Container>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button onClick={handleFirstPage} disabled={loading}>
          First
        </Button>
        <Button onClick={handlePreviousPage} disabled={loading || page === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={loading || !hasMore}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Episode;
