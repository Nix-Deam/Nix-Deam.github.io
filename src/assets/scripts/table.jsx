import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fData from "./fileRead.js";
import TablePagination from "@mui/material/TablePagination";

function createData(artist, name, time) {
	return { artist, name, time };
}

let rows = [];
let keys = [];
let artists = fData.getTrackArtists();
let names = fData.getTrackNames();

for (let i = 0; i < artists.length; i++) {
	rows.push(
		createData(artists[i], names[i], fData.getTrackTimeUnique(names[i], 1))
	);
}

// function descendingComparator(a, b, orderBy) {
// 	if (b[orderBy] < a[orderBy]) {
// 		return -1;
// 	}
// 	if (b[orderBy] > a[orderBy]) {
// 		return 1;
// 	}
// 	return 0;
// }

// function getComparator(order, orderBy) {
// 	return order === "desc"
// 		? (a, b) => descendingComparator(a, b, orderBy)
// 		: (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
// 	const stabilizedThis = array.map((el, index) => [el, index]);
// 	stabilizedThis.sort((a, b) => {
// 		const order = comparator(a[0], b[0]);
// 		if (order !== 0) {
// 			return order;
// 		}
// 		return a[1] - b[1];
// 	});
// 	return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
// 	{
// 		id: "Artist",
// 		numeric: false,
// 		disablePadding: true,
// 		label: "Artist",
// 	},
// 	{
// 		id: "Track",
// 		numeric: true,
// 		disablePadding: false,
// 		label: "Track",
// 	},
// 	{
// 		id: "Time",
// 		numeric: true,
// 		disablePadding: false,
// 		label: "Time",
// 	},
// ];

export default function BasicTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
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
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={uniqueRows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
