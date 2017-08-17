const Router = require('koa-router')
const read = require('node-readability')
const fs = require('fs')
const path = require('path')
const Models = require('../models')

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

const successState = {
	msg: 'success',
	code: 200,
	data: ''
}

router.get('*', (ctx) => {
	const html = fs.readFileSync(resolve('../../../dist/' + 'index.html'), 'utf-8')
	ctx.body = html
})

router.post('/api/generateNote', async (ctx, next) => {
	await new Promise((resolve, reject) => {
		read(ctx.request.body.link, (err, article, meta) => {
			if (err) {
				reject(err)
			} else {
				resolve(article)
			}
		})
	}).then((success) => {
		ctx.body = {
			title: success.title,
			content: success.content
		}
	}).then((err) => {
		// console.log('bbb', err)
	})
})

router.post('/api/addNote', async (ctx, next) => {
	await new Models.NoteList(ctx.request.body).save((err, docs) => {
		if(err){
			ctx.throw(500)
			return
		}
		successState.data = docs
		ctx.response.body = successState
	})
})

router.post('/api/addTag', async (ctx, next) => {
	await new Models.TagList(ctx.request.body).save((err, docs) => {
		if(err){
			ctx.throw(500)
			return
		}
		successState.data = docs
		ctx.response.body = successState
	})
})

// router.get('/test', (ctx) => {
//   ctx.body = 'testwwww!';
// })

module.exports = router