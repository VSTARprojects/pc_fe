import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  TablePagination,
  TextField,
  TableFooter
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { visuallyHidden } from "@mui/utils";
import SampleListData from './SampleListData';
import { Container, Link } from "@material-ui/core";
import SampleService from "../services/SampleService";

export default function SampleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date_of_collection");
  const header = ["id", "patientName", "age", "origin", "date_of_collection", "predictedLabel", "humanLabel"];
  
  const [samples, setSamples] = useState([])

  useEffect(() => {
        const fetchData = async () => {
            try {
                const samples = await SampleService.get_user_samples()
                setSamples(samples)
            } catch(e) {
                console.log(e)
                setSamples(SampleListData)
            }
        }
        fetchData()
    }, [])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - samples.length) : 0;

  const handleChangePage = (sample, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = sample => {
    setRowsPerPage(parseInt(sample.target.value, 10));
    setPage(0);
  };

  const createSortHandler = property => sample => {
    setOrderBy(property);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const getSortedSamples = (samples) => {
    return samples.sort((x, y) => {
      const a = x[orderBy];
      const b = y[orderBy];
      if (orderBy === "date_of_collection") {
        const ad = new Date(a);
        const bd = new Date(b);
        if (ad > bd) return order === "asc" ? -1 : 1;
        else if (ad < bd) return order === "asc" ? 1 : -1;
        return 0;
      }
      console.log(a, b)
      if (a > b) return order === "asc" ? -1 : 1;
      else if (a < b) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  

  return (
    <Container>
    <Box sx={{ my: 4 }}>
      <Box
        display={{ sm: "flex" }}
        sx={{ pb: 2 }}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" color="primary">
          Directory of samples
        </Typography>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          onChange={e => setSearch(e.target.value.toLowerCase())}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="sample table">
          <TableHead>
            <TableRow>
              {header.map((val, i) => (
                <TableCell
                  key={i}
                  align={
                    "left"
                  }
                  onClick={createSortHandler(val)}
                  sortDirection={orderBy === val ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === val}
                    direction={orderBy === val ? order : "asc"}
                  >
                    {val}
                    {orderBy === val ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="left">See More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? getSortedSamples(samples).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : getSortedSamples(samples)
            ).map(
              sample =>
                sample.patientName.toLowerCase().includes(search) && (
                  <TableRow
                    key={sample.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 }
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {sample.id}
                    </TableCell>
                    <TableCell align="left">{sample.patientName}</TableCell>
                    <TableCell align="left">{sample.age}</TableCell>
                    <TableCell align="left">
                         {sample.origin}
                    </TableCell>
                    <TableCell align="left">
                         {sample.date_of_collection}
                    </TableCell>
                    <TableCell align="left">
                         {sample.predictedLabel}
                    </TableCell>
                    <TableCell align="left">
                         {sample.humanLabel}
                    </TableCell>
                    <TableCell align="left">
                        <Link>View Details</Link>
                    </TableCell>
                  </TableRow>
                )
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                colSpan={4}
                count={samples.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
    </Container>
  );
}