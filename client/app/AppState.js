import { dev } from './env.js'
import { Comment } from "./Models/Comment.js"
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

class AppState extends EventEmitter {
  user = {}
  account = {}
  /** @type {import('./Models/Value').Value[]} */
  values = []
  socketData = []
  /** @type {import('./Models/Post').Post[]} */
  posts = []
  activePost = {}
  /** @type {import('./Models/Comment').Comment[]} */
  comments = [new Comment({
    id: "something",
    title: "Oh Boy",
    body: "I can't stand this anymore",
    accountId: "accountId;",
    postId: "postId",
    votes: "votes"
  })]
  activeComment = {}
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.ProxyState = ProxyState
}
