import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";

type Character = {
  id: number;
  name: string;
  species: string;
  origin: {
    name: string;
  };
  image: string;
};

type CharacterCardProps = {
  data: Character[];
};

const CharacterCard: React.FC<CharacterCardProps> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: 2,
      }}
    >
      {data.map((character) => (
  <Link
    key={character.id}
    href={`/character/${character.id}`}
    passHref
    style={{ textDecoration: "none" }}
  >
    <Card
      sx={{
        flexBasis: {
          xs: "calc(100% - 16px)",
          md: "calc(20% - 16px)",
        },
        maxWidth: 300,
        bgcolor: "#1e1e1e",
        color: "white",
        border: "1px solid #333",
        borderRadius: 2,
        cursor: "pointer", // ให้รู้ว่าคลิกได้
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          padding: 2,
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <CardContent>
        <Typography variant="body1" color="white">
          {character.name}
        </Typography>
        <Typography variant="body2" color="white" fontWeight="bold">
          {character.species}
        </Typography>
        <Typography variant="body2" color="#aaa">
          {character.origin.name}
        </Typography>
      </CardContent>
    </Card>
  </Link>
))}

    </Box>
  );
};

export default CharacterCard;
