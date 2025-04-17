"use client";

import { Count } from "@/lib/components/count";
import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RickAndMortyInfo = () => (
  <>
    <Image
      src="/images/Rick_and_Morty_Logo.webp"
      alt="Rick and Morty"
      width={500}
      height={300}
    />
    <Typography variant="subtitle1" gutterBottom>
      The series follows the misadventures of alcoholic scientist Rick and his
      overly nervous grandson Morty, who split their time between domestic
      family life and intergalactic travel. Often finding themselves in a heap
      of trouble that more often than not created through their own actions,
      these two will get themselves out of trouble in the most entertaining way!
      This extremely clever show will blow your mind as well as all other
      parallel realities of your mind!
    </Typography>
  </>
);

export const Home = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* <Count updateItem={data} /> */}
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          gap: 2,
          minHeight: "100vh",
          backgroundImage: {
            xs: "linear-gradient(to top, rgba(0, 0, 0, 1)50%, rgba(0, 0, 0, 0)80%)",
            md: "linear-gradient(to left, rgba(0, 0, 0, 1)70%, rgba(0, 0, 0, 0)100%)",
          },
          pl: { xs: 2, md: 40 },
          pr: { xs: 2, md: 10 },
          ml: { md: "auto" },
          mr: { md: 0 },
        }}
      >
        <RickAndMortyInfo />
      </Container>
    </div>
  );
};
