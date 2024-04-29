import React, { useState } from "react";
import fileInfo from "./assets/scripts/fileRead.js";

function JsonUpload({ onUpload }) {
	const handleUpload = (event) => {
		const file = event.target.files[0];
		onUpload(file);
	};

	return <input type="file" onChange={handleUpload} />;
}

export default JsonUpload;
