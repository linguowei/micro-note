const Router = require('koa-router')
const read = require('node-readability')
const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const router = new Router()

router.get('*', (ctx) => {
	const html = fs.readFileSync(resolve('../../../dist/' + 'index.html'), 'utf-8')
	ctx.body = html
})

router.post('/api/generateNote', async (ctx, next) => {
	await new Promise((resolve, reject) => {
		read(ctx.request.body.link, {
			cleanRulers: [
				(obj, tag) => {
					console.log(tag)
					if(tag === 'object') {
						if(obj.getAttribute('class') === 'BrightcoveExperience') {
							return true;
						}
					}
				}
			]}, (err, article, meta) => {
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

router.get('/test', (ctx) => {
  ctx.body = 'testwwww!';
})

module.exports = router