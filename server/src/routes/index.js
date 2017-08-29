import {ObjectUnsubscribedError} from 'rxjs';
const Router = require('koa-router')
const read = require('node-readability')
const fs = require('fs')
const path = require('path')
const Models = require('../models')
const phantom = require('phantom')
const users = require('../users').items

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

// 定义成功的返回模板
const successState = {
	msg: 'success',
	code: 200,
	data: ''
}

const errorState = {
	msg: 'error',
	code: '',
	data: ''
}

const findUser = function(name, password){
	return users.find(function(item){
			return item.name === name && item.password === password;
	});
};

router.post('/api/login', async (ctx, next) => {
	let user = findUser(ctx.request.body.name, ctx.request.body.pwd);
	if(user){
		let session = ctx.session
		session.isLogin = true
		session.userName = ctx.request.body.name
		successState.msg = '登录成功！'
		ctx.body = successState
	}else{
		errorState.msg = '账号或密码错误！'
		errorState.code = 400
		ctx.body = errorState
	}
})

/**
 * 笔记 C、R、U、D
 */

router.get('/api/allNote', async (ctx, next) => {
	if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
		await Models.NoteList.find({}, (err, docs) => {
			if(err){
				ctx.throw(500)
				return
			}
			let successState = Object.assign({}, successState, {
				data: docs.reverse()
			})
			ctx.response.body = successState
		})
	} else {
		let errorState = Object.assign({}, successState, {
			code: 401,
			msg: 'Unauthorized'
		})
		ctx.body = errorState
	}
})

router.post('/api/generateNote', async (ctx, next) => {
	if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
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
	}else{
		let errorState = Object.assign({}, successState, {
			code: 401,
			msg: 'Unauthorized'
		})
		ctx.body = errorState
	}
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
	if ( ctx.session && ctx.session.isLogin && ctx.session.userName ) {
		await Models.TagList.find({}, (err, docs) => {
			if(err){
				ctx.throw(500)
				return
			}			
			let successState = Object.assign({}, successState, {
				data: docs.reverse()
			})
			ctx.response.body = successState
		})
	} else {
		let errorState = Object.assign({}, errorState, {
			code: 401,
			msg: 'Unauthorized'
		})
		ctx.body = errorState
	}
})

router.get('*', (ctx, next) => {
	const html = fs.readFileSync(resolve('../../../dist/' + 'index.html'), 'utf-8')
	ctx.body = html
})

module.exports = router