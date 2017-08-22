const Router = require('koa-router')
const read = require('node-readability')
const fs = require('fs')
const path = require('path')
const Models = require('../models')
const phantom = require('phantom')

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
	const instance = await phantom.create()
	const page = await instance.createPage()
	const status = await page.open(ctx.request.body.link)
	const content = await page.property('content')
	await instance.exit()
	await new Promise((resolve, reject) => {
		read(content, (err, article, meta) => {
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
	})
})

router.post('/api/modify', async (ctx, next) => {
	await new Promise((resolve, reject) => {
		Models.NoteList.update({_id: ctx.request.body._id}, ctx.request.body, (err, docs) => {
			if(err){
				reject(err)
			}else{
				resolve(docs)
			}
		})
	}).then((success) => {
		successState.data = ctx.request.body
		ctx.response.body = successState
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


router.post('/api/deleteNote', async (ctx, next	) => {
	await Models.NoteList.remove({_id: ctx.request.body.id}, (err, docs) => {
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

router.get('*', (ctx, next) => {
	const html = fs.readFileSync(resolve('../../../dist/' + 'index.html'), 'utf-8')
	ctx.body = html
})

module.exports = router