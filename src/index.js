const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
const { newsArticleModel } = require('./connector');
const paginate = require('express-paginate');
app.use(paginate.middleware(onePageArticleCount));

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
function isValid(value){
	return (value===null || value===undefined)?false:true;
}
app.get('/newFeeds', async (req,res)=>{
	console.log(req.query.limit);
	const offset=parseInt(req.query.offset);
	if(isValid(offset) && isValid(req.query.limit)){
		const data = await newsArticleModel
			.find({})
			.limit(req.query.limit)
			.skip(offset);
		res.send(data);
	}else{
		const limit=10;
		req.skip=0;
		const data = await newsArticleModel
			.find({})
			.limit(limit)
			.skip(req.skip);
		res.send(data);
		console.log("req.skip",req.skip,"");
	}
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;