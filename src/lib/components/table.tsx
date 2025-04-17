import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Link from "next/link";

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

type LocationCardProps = {
  data: Location[];
};

const LocationTable: React.FC<LocationCardProps> = ({ data }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // กำหนด columns ให้ต่างกันตามขนาดหน้าจอ
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      align: "center" as const,
      headerAlign: "center" as const,
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Link
          href={`/location/${params.row.id}`}
          style={{ color: "#64b5f6", textDecoration: "none", fontWeight: 500 }}
        >
          {params.value}
        </Link>
      ),
    },
    // ซ่อน type และ dimension ถ้าเป็น mobile
    ...(isMobile
      ? []
      : [
        {
          field: "type",
          headerName: "TYPE",
          flex: 0.8,
          align: "center" as const,
          headerAlign: "center" as const,
        },
        {
          field: "dimension",
          headerName: "DIMENSION",
          flex: 1,
          align: "center" as const,
          headerAlign: "center" as const,
        },
      ]),
  ];

  return (
    <Box sx={{ height: isMobile ? 400 : 600, width: "100%", padding: isMobile ? 0 : 2 }}>
      <DataGrid
        rows={data}
        columns={columns}
        rowCount={data.length}
        pageSizeOptions={[20]}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          backgroundColor: "#121212",
          color: "#fff",
          border: "none",
          fontSize: isMobile ? 12 : 14,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00C853 !important",
            color: "#151515",
            fontWeight: "bold",
            fontSize: isMobile ? 12 : 14,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #333",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
            backgroundColor: "#121212",
            color: "#aaa",
          },
          "& .MuiTablePagination-root": {
            color: "#aaa",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#121212",
          },
        }}
      />
    </Box>
  );
};

export default LocationTable;
