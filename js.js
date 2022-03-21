const app = document.getElementById("app");
let columns = 14;
let rows = 14;
const cells = [];
let bombArr = []

const createBoard = (rowNumber, columnNumber) => {
	const table = document.createElement("table");
	table.id = "board";
	const tbody = document.createElement("tbody");

	table.addEventListener('click', clickButton)

	let indexCell = 0;

	for (let i = 0; i < rowNumber; i++) {
		const row = tbody.insertRow(i);

		for (let ii = 0; ii < columnNumber; ii++) {
			const cellule = row.insertCell(ii);
		
			const divWrapper = document.createElement('div')
			divWrapper.className = "divWrapper"
			divWrapper.dataset.index = indexCell;

			cellule.append(divWrapper)

			const button = document.createElement('button')
			button.dataset.indexButton = indexCell;
			cellule.append(button)



			cells.push({
				x: ii,
				y: i,
				visible: false,
				bomb: false,
				number: null,
			});

			indexCell++;
		}
	}

	table.append(tbody);
	app.append(table);

	bombGeneration(rowNumber * columnNumber);
	numberGeneration(rowNumber, columnNumber)
	
};

const bombGeneration = (cellNb) => {
	const bombsIndex = []
	const bombNb = Math.floor(cellNb * 0.1);

	for(let i = 0; i < bombNb; i++){
		let indexRandom = Math.floor(Math.random() * cellNb)

		if(bombsIndex.indexOf(indexRandom) === -1){

			bombsIndex.push(indexRandom)
			cells[indexRandom].bomb = true
			document.querySelector('[data-index="'+ indexRandom +'"]').innerHTML = '💣'

		} else {
			i--
		}
	}

	bombArr = [...bombsIndex]
};

const numberGeneration = (rowNumber, columnNumber) => {
	bombArr.forEach(bombId => {
		for(let i = 0; i < 8; i++){
			let caseIndex
			
			if(i === 0){caseIndex = bombId - rowNumber} //Case haute
			else if(i === 1 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId - rowNumber + 1} // Case haute droite
			else if(i === 2 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId + 1} // Case droite
			else if(i === 3 && cells[bombId].x !== rowNumber - 1){caseIndex = bombId + rowNumber + 1} // Case bas droite
			else if(i === 4){caseIndex = bombId + rowNumber} //Bas
			else if(i === 5 && cells[bombId].x !== 0){caseIndex = bombId + rowNumber - 1} //Bas gauche
			else if(i === 6 && cells[bombId].x !== 0){caseIndex = bombId - 1} //Gauche
			else if(i === 7 && cells[bombId].x !== 0){caseIndex = bombId - rowNumber - 1} //Haut gauche

			if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1 && !cells[caseIndex].bomb){
				cells[caseIndex].number++
				document.querySelector('[data-index="'+ (caseIndex) +'"]').innerHTML = cells[caseIndex].number
			}

		}
	})
}


const clickButton = (e) => {
	let btnIndex = e.target.dataset.indexButton

	if(btnIndex){

		e.target.remove()
		cells[btnIndex].visible = true

		if(cells[btnIndex].bomb){
			console.log('Perdu !');
		} else if(cells[btnIndex].number !== null) {
			console.log(cells[btnIndex].number)
		} else {
			console.log('vide');

			clickButtonEmpty(+btnIndex)
		}
	}
}


const clickButtonEmpty = (btnIndex) => {

	for(let i = 0; i < 8; i++){
		let caseIndex
		
		if(i === 0){caseIndex = btnIndex - rows} //Case haute
		else if(i === 1 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex - rows + 1} // Case haute droite
		else if(i === 2 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex + 1;} // Case droite
		else if(i === 3 && cells[btnIndex].x !== rows - 1){caseIndex = btnIndex + rows + 1} // Case bas droite
		else if(i === 4){caseIndex = btnIndex + rows} //Bas
		else if(i === 5 && cells[btnIndex].x !== 0){caseIndex = btnIndex + rows - 1} //Bas gauche
		else if(i === 6 && cells[btnIndex].x !== 0){caseIndex = btnIndex - 1} //Gauche
		else if(i === 7 && cells[btnIndex].x !== 0){caseIndex = btnIndex - rows - 1} //Haut gauche

		if(caseIndex && caseIndex >= 0 && caseIndex <= cells.length - 1){
			const buttonDelete = document.querySelector('[data-index-button="'+ (caseIndex) +'"]')
			if(buttonDelete) buttonDelete.remove()		
		}

	}

}

createBoard(rows, columns);
