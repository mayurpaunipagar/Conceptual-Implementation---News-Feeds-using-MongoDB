const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
const { newsArticleModel } = require('./connector');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newFeeds', async (req,res)=>{
	
		let limit=null;
		let offset=null;
		if(req.query.limit && parseInt(req.query.limit)>=0){
			limit=parseInt(req.query.limit);
			console.log(limit, "limit");
		}else{
			limit=10;
			console.log(limit, "limit");
		}
		if(req.query.offset && parseInt(req.query.offset)>=0){
			offset=parseInt(req.query.offset);
			console.log(offset, "offset");
		}else{
			offset=0;
			console.log(offset, "offset");
		}
		res.send(await newsArticleModel.find({}).limit(limit).skip(offset));

});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;