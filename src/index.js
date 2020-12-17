const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
const { newsArticleModel } = require('./connector');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


function isValid(value){
	return !(value===undefined || value===null || (value!=value));
}
app.get('/newFeeds', async (req,res)=>{
	
		let limit=parseInt(req.query.limit);
		let offset=parseInt(req.query.offset);
		if(isValid(limit) && limit>0){
			console.log(limit, "limit");
		}else{
			limit=10;
			console.log(limit, "limit");
		}
		if(isValid(offset) && offset>=0){
			console.log(offset, "offset");
		}else{
			offset=0;
			console.log(offset, "offset");
		}
		res.send(await newsArticleModel.find({}).skip(offset).limit(limit));

});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;