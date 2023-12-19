let scoresBtn = document.querySelector("#view-high-scores"); 

// Rank previous scores in order by 
// Retrieving scores from localStorage 

function printHighscores() { 
	let highscores = 
		JSON.parse(window.localStorage.getItem("highscores")) || []; 
	highscores.sort(function (a, b) { 
		return b.score - a.score; 
	}); 
	highscores.forEach(function ( 
		score 
	) { 
		let liTag = 
			document.createElement( 
				"li"
			); 
		liTag.textContent = 
			score.name + 
			" - " + 
			score.score; 
		let olEl = 
			document.getElementById( 
				"highscores"
			); 
		olEl.appendChild(liTag); 
	}); 
} 

printHighscores();

