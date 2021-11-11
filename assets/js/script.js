fetch("https://real-estate12.p.rapidapi.com/listings/sale?state=CA&city=Los%20Angeles&page=1&sort=relevant&type=single-family%2Cmulti-family", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "real-estate12.p.rapidapi.com",
		"x-rapidapi-key": "47098b9725msh4a6c2ffb6424c90p193301jsnd9a8382167e8"
	}
})
.then(response => {
	console.log(response.body);
})
.catch(err => {
	console.error(err);
});