import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Popover,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  useMediaQuery,
  
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const statusOptions = ["alive", "dead", "unknown"];
const genderOptions = ["female", "male", "genderless", "unknown"];

const SearchBar = ({
  onSearch,
  enableFilter = true,
}: {
  onSearch: (searchTerm: string, filters: any) => void;
  enableFilter?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "", gender: "" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true เมื่อหน้าจอเล็กกว่า 600px

  const handleSearch = () => {
    const appliedFilters = enableFilter ? filters : {};
    onSearch(searchTerm, appliedFilters);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? enableFilter?"column":"row": "row"}
      alignItems={isMobile ? "stretch" : "center"}
      gap={2}
      p={2}
      color="white"
    >
      {/* Row 1 */}
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ input: { color: "white" }, label: { color: "#aaa" }, flex: 1 }}
        />

        {enableFilter && (
          <>
            <IconButton onClick={handleFilterClick}>
              <FilterList sx={{ color: "#aaa" }} />
            </IconButton>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleFilterClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Box p={2} width={250}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    {statusOptions.map((status) => (
                      <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio />}
                        label={status}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    value={filters.gender}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  >
                    {genderOptions.map((gender) => (
                      <FormControlLabel
                        key={gender}
                        value={gender}
                        control={<Radio />}
                        label={gender}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Popover>
          </>
        )}
      </Box>

      {/* Row 2 */}
      <Box display="flex" gap={1} justifyContent={isMobile ? "flex-start" : "flex-end"}>
        {enableFilter ? (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setFilters({ status: "", gender: "" });
                setSearchTerm("");
              }}
            >
              Clear
            </Button>
            <Button variant="contained" size="small" onClick={handleSearch}>
              Apply
            </Button>
          </>
        ) : (
          <Button variant="contained" size="small" onClick={handleSearch}>
            Search
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
