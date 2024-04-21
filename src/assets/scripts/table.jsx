import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fData from "./fileRead.js";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function createData(artist, name, time) {
	return { artist, name, time };
}

let rows = [];
let artists = fData.getTrackArtists();
let names = fData.getTrackNames();

for (let i = 0; i < artists.length; i++) {
	rows.push(
		createData(artists[i], names[i], fData.getTrackTimeUnique(names[i], 1))
	);
}

export default function BasicTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [currentFilter, setCurrentFilter] = useState("");

	const filterRef = useRef();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const applyFilter = () => {
		if (filterRef.current) {
			setCurrentFilter(filterRef.current.value);
		}
	};

	const uniqueRows = rows.reduce((unique, row) => {
		if (
			!unique.some(
				(item) => item.artist === row.artist && item.name === row.name
			)
		) {
			unique.push(row);
		}
		return unique;
	}, []);

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TextField label="Filter by song or artist" inputRef={filterRef} />
			<Button onClick={applyFilter}>Apply Filter</Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Artist</TableCell>
							<TableCell align="left">Track Name</TableCell>
							<TableCell align="right">Time Listened</TableCell>
						</TableRow>
					</TableHead>
					{uniqueRows
						.filter(
							(row) =>
								(row.name
									? row.name.toLowerCase().includes(currentFilter.toLowerCase())
									: false) ||
								(row.artist
									? row.artist
											.toLowerCase()
											.includes(currentFilter.toLowerCase())
									: false)
						)
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, index) => (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.artist}
								</TableCell>
								<TableCell align="left">
									<a href={fData.getTrackUri(row.name)}>
										{row.name.length > 25
											? row.name.substring(0, 25) + "..."
											: row.name}
									</a>
								</TableCell>
								<TableCell align="right">{row.time}</TableCell>
							</TableRow>
						))}
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 50, 75, 100, 1000]}
				component="div"
				count={
					uniqueRows.filter(
						(row) =>
							(row.name
								? row.name.toLowerCase().includes(currentFilter.toLowerCase())
								: false) ||
							(row.artist
								? row.artist.toLowerCase().includes(currentFilter.toLowerCase())
								: false)
					).length
				}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
