const Router = require('koa-router')
const read = require('node-readability')
const fs = require('fs')
const path = require('path')
const Models = require('../models')

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

// 定义成功的返回模板
const successState = {
	msg: 'success',
	code: 200,
	data: ''
}

/**
 * 笔记 C、R、U、D
 */

router.get('/api/allNote', async (ctx, next) => {
	await Models.NoteList.find({}, (err, docs) => {
		if(err){
			ctx.throw(500)
			return
		}
		successState.data = docs
		ctx.response.body = successState
	})
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

/**
 * 标签 C、R、U、D
 */

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

router.post('/api/deleteTag', async (ctx, next) => {
	await Models.TagList.remove({_id: ctx.request.body.id}, (err, docs) => {
		if(err){
			ctx.throw(500)
			return
		}
		successState.data = docs
		ctx.response.body = successState
	})
})

router.get('/api/TagList', async (ctx, next) => {
	await Models.TagList.find({}, (err, docs) => {
		if(err){
			ctx.throw(500)
			return
		}
		successState.data = docs
		ctx.response.body = successState
	})
})

router.get('*', (ctx) => {
	const html = fs.readFileSync(resolve('../../../dist/' + 'index.html'), 'utf-8')
	ctx.body = html
})

module.exports = router