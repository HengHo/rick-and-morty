"use client"
import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import CharacterCard from "@/lib/components/card";
import SearchBar from "@/lib/components/searchbar";

const Character = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState({ status: "", gender: "" });

  const fetchData = async (page: number, searchTerm: string, filters: any) => {
    let query = `/api/character?page=${page}`;

    if (searchTerm) {
      query += `&name=${encodeURIComponent(searchTerm)}`;
    }

    if (filters.status) {
      query += `&status=${encodeURIComponent(filters.status)}`;
    }

    if (filters.gender) {
      query += `&gender=${encodeURIComponent(filters.gender)}`;
    }
    console.log("query", query);
    const res = await fetch(query);
    const json = await res.json();

    if (json?.data) {
      if (page === 1) {
        setData(json.data);
      } else {
        setData((prev: any) => [...prev, ...json.data]);
      }
      setHasMore(json.info?.next !== null);
    }
  };

  useEffect(() => {
    fetchData(page, searchTerm, filters);
  }, [page, searchTerm, filters]); // ตรวจสอบการเปลี่ยนแปลงของ page, searchTerm, filters

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300;

      if (nearBottom && hasMore && !isFetching) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isFetching]);

  return (
    <div>
      <Container maxWidth="xl" >
        <Grid container spacing={2}   sx={{mt:2,ml:{md:20} ,justifyContent: "space-around" ,alignItems:"center"}} >
          <Grid size={{xs:12 , md:6 }} sx={{mt:1}} >
            <Typography variant="h2" >Character</Typography>
          </Grid>
          <Grid size={{xs:12 , md:6}}>
            <SearchBar
              onSearch={(term, filters) => {
                setSearchTerm(term);
                setFilters(filters); // อัพเดต filters
                setPage(1); // รีเซ็ตหน้ากลับไปหน้าแรก
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        {data ? (
          <>
            <CharacterCard data={data} />
            {isFetching && (
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <CircularProgress />
              </Grid>
            )}
          </>
        ) : (
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <CircularProgress />
          </Grid>
        )}
      </Container>

      {
    !hasMore && (
      <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 2 }}>
        ไม่มีข้อมูลเพิ่มเติมแล้ว
      </Typography>
    )
  }
    </div >
  );
};

export default Character;
