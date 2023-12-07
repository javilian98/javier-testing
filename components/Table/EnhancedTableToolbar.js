import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useDataStore } from "../../stores/useDataStore";

/* Custom Components */
import { Search, SearchIconWrapper, SearchInputBase } from "../Search/Search";

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  const setData = useDataStore((state) => state.setData);
  const originalData = useDataStore((state) => state.originalData);
  const nameSearch = useDataStore((state) => state.nameSearch);
  const setNameSearch = useDataStore((state) => state.setNameSearch);
  const selectedFilterValue = useDataStore(
    (state) => state.selectedFilterValue
  );
  const setSelectedFilterValue = useDataStore(
    (state) => state.setSelectedFilterValue
  );
  const filters = useDataStore((state) => state.filters);

  const handleNameSearch = (event) => {
    const searchValue = event.target.value;
    setNameSearch(searchValue);

    const searchedData = originalData.filter((row) => {
      return row.app.toLowerCase().includes(searchValue.toLowerCase());
    });

    setData(searchedData);
  };

  const handleFilterValue = (event) => {
    setNameSearch("");

    const filterValue = event.target.value;
    setSelectedFilterValue(filterValue);

    if (filterValue === "All") {
      setData(originalData);
      return;
    }

    let filteredData = originalData.filter(
      (row) => row.genres.toLowerCase() === filterValue.toLowerCase()
    );

    if (nameSearch !== "") {
      filteredData = filteredData.filter(
        (row) => row.app.toLowerCase() === nameSearch.toLowerCase()
      );
    }

    setData(filteredData);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Google Playstore Data
        </Typography>
      )}
      Genres:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedFilterValue}
        label="Filter"
        onChange={handleFilterValue}
      >
        {Array.from(filters)?.map((filter, index) => {
          return (
            <MenuItem key={index} value={filter}>
              {filter}
            </MenuItem>
          );
        })}
      </Select>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={nameSearch}
          onChange={handleNameSearch}
        />
      </Search>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
