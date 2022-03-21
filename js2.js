const app = document.getElementById("app");
let columns = 200;
let rows = 2000;

const createBoard = (rowNumber, columnNumber) => {
	const table = document.createElement("table");
	table.id = "board";
	const tbody = document.createElement("tbody");

	for (let i = 0; i < rowNumber; i++) {
		const row = tbody.insertRow(0);

		for (let ii = 0; ii < columnNumber; ii++) {
			const cellule = row.insertCell(0);
			const divWrapper = document.createElement("div")
			divWrapper.className = "celluleWrapper"

			cellule.append(divWrapper)
			// row.append(cellule);
		}

		// tbody.append(row);
	}

	table.append(tbody);
	app.append(table);
};




createBoard(rows, columns);
    


