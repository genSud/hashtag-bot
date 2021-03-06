import dude from 'debug-dude'
const { /*debug,*/ log, info /*, warn, error*/ } = dude('bot')

import { version } from '../package.json'
info(`hashtag-bot v${version} initialising...`)

import config from '../config.json'

import { connect, message } from 'coffea'
export const htmlMessage = (msg) => {
	return {
		type: 'message',
		text: msg,
		options: {
			parse_mode: 'HTML'
		}
	}
}

const networks = connect(config)

import fs from 'fs'
import path from 'path'
import http from 'http'

networks.on('command', (evt, reply) => {
	log('Received command event: %o', evt)
	
	switch (evt.cmd) {
	case 'maxi':
	let maxi = Math.floor((Math.random() * 20) + 1)
	reply({
		type: 'action',
		action: 'upload_photo'
	})
	reply({
		type: 'photo',
		data: fs.createReadStream(path.join(__dirname, `/../pic/maxi/${maxi}.jpg`)),
		options: {
			caption: 'Meow! 😻'
		}
	})
	break
	case 'snowball':
	let snowball = Math.floor((Math.random() * 10) + 1)
	reply({
		type: 'action',
		action: 'upload_photo' })
	reply({
		type: 'photo',
		data: fs.createReadStream(path.join(__dirname, `/../pic/snowball/${snowball}.jpg`)),
		options: {
			caption: 'Meow! 😻'
		}
	})
	break
	case 'about':
    reply(htmlMessage('<a href="https://github.com/6697/hashtag-bot>hashtag-bot v1.0.1<'))
    case 'issues':
    reply(htmlMessage('<b>Please report issues</b> <a href="https://github.com/6697/hashtag-bot/issues">here</a>.'))
    break
    case 'nogf':
    reply(htmlMessage('<b>tfwnogf ¯\_(ツ)_/¯</b>'))
    break
	case 'gf':
	reply(htmlMessage('<b>soon™ :^)</b>'))
	break
	}
})


networks.on('message', (evt, reply) => {
  log('Received message event: %o', evt)

  let hashtags = evt.text.match(/#([a-zA-Z]+)/)

  if (hashtags && hashtags.length > 1) {
    let voicePath = path.join(__dirname, `/../voice/${hashtags[1]}.mp3`)

    if (fs.existsSync(voicePath)) {
     reply({ type: 'action', action: 'record_audio' })
      reply({
        type: 'voice',
        data: fs.createReadStream(voicePath)
      })
    }
  }
})

networks.on('message', (evt, reply) => {
  let video = evt.text.match(/#([a-zA-Z]+)/)

  if (video && video.length > 1) {
    let videoPath = path.join(__dirname, `/../video/${video[1]}.mp4`)

    if (fs.existsSync(videoPath)) {
     reply({ type: 'action', action: 'record_video' })
      reply({
        type: 'video',
        data: fs.createReadStream(videoPath)
      })
    }
  }
})

networks.on('message', (evt, reply) => {
  let pic = evt.text.match(/#([a-zA-Z]+)/)

  if (pic && pic.length > 1) {
    let photoPath = path.join(__dirname, `/../pic/etc/${pic[1]}.jpg`)

    if (fs.existsSync(photoPath)) {
     reply({ type: 'action', action: 'upload_photo' })
      reply({
        type: 'photo',
        data: fs.createReadStream(photoPath)
      })
    }
  }
})

networks.on('message', (evt, reply) => {
  let sticker = evt.text.match(/#([a-zA-Z]+)/)

  if (sticker && sticker.length > 1) {
    let stickerPath = path.join(__dirname, `/../sticker/${sticker[1]}.webp`)

    if (fs.existsSync(stickerPath)) {
      reply({
        type: 'sticker',
        data: fs.createReadStream(stickerPath)
      })
    }
  }
})
