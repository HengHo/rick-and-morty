import React from 'react';
import { Box, useMediaQuery, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

type EpisodeCardProps = {
  data: Episode[];
};

const EpisodeTable: React.FC<EpisodeCardProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // ถ้าเป็นมือถือ ให้แสดงแค่บางคอลัมน์
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<Episode>) => (
        <Link
          href={`/episode/${params.row.id}`}
          style={{
            color: '#64b5f6',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: isMobile ? 12 : 14,
          }}
        >
          {params.value}
        </Link>
      ),
    },
    !isMobile && {
      field: 'air_date',
      headerName: 'AIR DATE',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    !isMobile && {
      field: 'episode',
      headerName: 'EPISODE',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
  ].filter(Boolean) as GridColDef[]; // filter null ออกจาก array

  return (
    <Box
      sx={{
        height: isMobile ? 400 : 600,
        width: '100%',
        padding: isMobile ? 0 : 2,
        margin: 0,
        overflowX: 'hidden',
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableColumnMenu
        sx={{
          backgroundColor: '#121212',
          color: '#fff',
          border: 'none',
          fontSize: isMobile ? 12 : 14,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#00C853 !important',
            color: '#151515',
            fontWeight: 'bold',
            fontSize: isMobile ? 12 : 14,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #333',
          },
          '& .MuiDataGrid-footerContainer': {
            display: "none",
            backgroundColor: '#121212',
            color: '#aaa',
          },
          '& .MuiTablePagination-root': {
            color: '#aaa',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: '#121212',
          },
        }}
      />
    </Box>
  );
};

export default EpisodeTable;
