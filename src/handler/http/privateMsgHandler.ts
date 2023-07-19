import { getUserByEmail, getUserByUsernameAndTag } from '@/service/friend/friendService'
import { selectAllPrivateMsgInfoByUid, createPrivateMsgInfo, getPrivateMsgInfoById, fetchPrivateMsgsByOffset } from '@/service/msg/msgService'
import * as Boom from '@hapi/boom'

// get private msg list
export async function privateMsgInfoListGet(req, res, next) {
  try {
    const user = req.windImUser
    const wrappedData = wrapPrivateMsg(user.id, await selectAllPrivateMsgInfoByUid(user.id))
    res.json({ data: wrappedData })
  } catch (e) {
    next(e)
  }
}

// create private msg
export async function privateMsgInfoPost(req, res, next) {
  try {
    const user = req.windImUser
    const fromUid = user.id
    const toUsernameAndTag = req.body.usernameAndTag
    const username = toUsernameAndTag.split('#')[0]
    const tag = toUsernameAndTag.split('#')[1]
    const remoteUser = await getUserByUsernameAndTag(username, tag)
    if (!remoteUser?.id) {
      throw Boom.badRequest('No such user.')
    }
    const toUid = remoteUser.id

    res.json({ data: await createPrivateMsgInfo(fromUid, toUid) })
  } catch (e) {
    next(e)
  }
}

// get private msg by Id
export async function privateMsgInfoGet(req, res, next) {
  try {
    const user = req.windImUser
    const msgId = parseInt(req.query?.id)
    const msgInfo: any = await getPrivateMsgInfoById(msgId)
    if (!msgInfo) {
      throw Boom.badRequest('No such msg.')
    }
    // just ignore this stupid warning
    if (msgInfo.fromUid == user.id) {
      msgInfo.msgTitle = msgInfo.toUidRel.username + '#' + msgInfo.toUidRel.tag
    } else {
      msgInfo.msgTitle = msgInfo.fromUidRel.username + '#' + msgInfo.fromUidRel.tag
    }
    res.json({ data: msgInfo })
  } catch (e) {
    next(e)
  }
}

function wrapPrivateMsg(uid, allPrivateMsg) {
  return allPrivateMsg.map(m => {
    if (m.fromUid == uid) {
      m.msgTitle = m.toUidRel.username + '#' + m.toUidRel.tag
    } else {
      m.msgTitle = m.fromUidRel.username + '#' + m.fromUidRel.tag
    }
    return m
  })
}

export async function getPrivateMsgByOffset(req, res, next) {
  try {
    // init offset is integer.Max
    const msgId = parseInt(req.query?.id)
    const offset = parseInt(req.query?.offset)
    if (msgId == null || offset == null) {
      throw Boom.badRequest("misId or offset == null")
    }
    const privateMsg = await fetchPrivateMsgsByOffset(msgId, offset)
    console.log("#privateMsgByOffset msg:", JSON.stringify(privateMsg))
    res.json({ data: privateMsg })
  } catch (e) {
    next(e)
  }
}
