const fetch = require('node-fetch')
const _ = require('lodash')

const jsonLog = x => console.log(JSON.stringify(x, null, '\t'))

const promiseAllWithDelay = (delay = 500) => (promiseFns = [], results = []) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        promiseAllWithDelay(delay)(promiseFns.slice(1), results);
        (promiseFns[0] || Promise.resolve)()
          .then(results.push)
          .then(() => {
            if (!promiseFns.length) {
              resolve(results)
            }
          })
      },
      delay
    )
  })
}

const userId = '221320394'

const cookie = 'rur=FTW; ds_user_id=221320394; sessionid=IGSC2edc763d5597931ff387e8878c2dc20fbc6f4ec2d093ec1ef9c3278defb327d5%3ApjgUkqSKKWzXydFZpS1WAmmBRsU5KELG%3A%7B%22_auth_user_id%22%3A221320394%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_auth_user_hash%22%3A%22%22%2C%22_platform%22%3A4%2C%22_token_ver%22%3A2%2C%22_token%22%3A%22221320394%3ASbuq2jfHV5eEFPyzqsVkOiSkhBmo7k03%3A755b1b27946f4cb31af4f139d846afb9c2a1ba1ca3ba00efa3f172736f2185c2%22%2C%22last_refreshed%22%3A1533941348.9192073345%7D; shbid=9902; csrftoken=RQwhY2W56PgKMg0tXmzi3LZnIgRvVbDq; mid=W24WZAAEAAFYSicrOOEYcMiY_06x; mcd=3; fbm_124024574287414=base_domain=.instagram.com; ig_cb=1; shbts=1533941802.8837569; urlgen="{\"time\": 1533941349\054 \"82.3.246.151\": 5089}:1foGKt:6K82yBvMLkBpkCLzcttr3kbYKyI"; fbsr_124024574287414=1PsyfetwjxV5t7QT_4T37lhggOyhEYus1N4rED68G18.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUFOU2JzdU5jYmtjUDluTDFPdndrVzAxZDZVdHhSbFBLaHA3VDlpWk95YmV6TkJqRVRhZlNnby0yR0o5X2Y2OFNGSkVoVUVocE5aS2hXVmpEQ1ZPeEV6RW9WeTBabFo4X1QyNVZrQXF5cUJYZVpTM01mTTN6ZWhlUnhZTWpFTkx1Tl8teGxRWWJGRVg0Szk1UVp4c2dnMTVFU3dqbVdNbVZyNzhsUm9HZ2lGYTRRSFE4LTBRRmtaTjUzMmtwc1d6TjVwVzg2a0Q2YThmNGVxaTNxSXpGb1NQN2FQOUxlbkx3NXlCZnFUSF9hOThaekhSSHdjNTJqdTdaUFd3NE82VEZnMGNmVHROa3Z4OGhtOGRjdU01MHRaTE8xSjdLUzFpendTYTRWVnlXVXNQalYxbEZDcGRuNHhVUzhlNzA2VVg3UWwyRnFyVFdfQWVxOEhxOTJ5NUlxZyIsImlzc3VlZF9hdCI6MTUzMzk0MjEwMiwidXNlcl9pZCI6IjExMTAwMDI1MTYifQ'
const followersHash = '7dd9a7e2160524fd85f50317462cff9f'
const followingHash = 'c56ee0ae1f89cdbd1c89e2bc6b8f3d18'

const fetchFollowers = ({ userId, endCursor, followers = [] } = {}) => {
  console.log(`fetching a page of followers...`)
  const vars = { id: userId, include_reel: false, first: 50 }
  if (endCursor) vars.after = endCursor
  const encodedVars = encodeURI(JSON.stringify(vars))
  const url = `https://instagram.com/graphql/query/?query_hash=${followersHash}&variables=${encodedVars}`
  return fetch(url, {
    method: 'GET',
    headers: {
      cookie
    }
  })
  .then(x => x.json())
  .then(result => {
    const nodes = _.get(result, 'data.user.edge_followed_by.edges')
    const endCursor = _.get(result, 'data.user.edge_followed_by.page_info.end_cursor')
    const hasNext = _.get(result, 'data.user.edge_followed_by.page_info.has_next_page')
    followers.push(...nodes)
    if (hasNext) {
      return fetchFollowers({ userId, endCursor, followers })
    } else {
      return followers.map(x => _.get(x, 'node.username'))
    }
  })
}

const fetchFollowing = ({ userId, endCursor, following = [] } = {}) => {
  console.log(`fetching a page of following...`)
  const vars = { id: userId, include_reel: false, first: 50 }
  if (endCursor) vars.after = endCursor
  const encodedVars = encodeURI(JSON.stringify(vars))
  const url = `https://instagram.com/graphql/query/?query_hash=${followingHash}&variables=${encodedVars}`
  return fetch(url, {
    method: 'GET',
    headers: {
      cookie
    }
  })
  .then(x => x.json())
  .then(result => {
    const nodes = _.get(result, 'data.user.edge_follow.edges')
    const endCursor = _.get(result, 'data.user.edge_follow.page_info.end_cursor')
    const hasNext = _.get(result, 'data.user.edge_follow.page_info.has_next_page')
    following.push(...nodes)
    if (hasNext) {
      return fetchFollowing({ userId, endCursor, following })
    } else {
      return following.map(x => _.get(x, 'node.username'))
    }
  })
}

const getFollowersNumber = (followersStr = '') => {
  followersStr = followersStr.replace(/,/g, '').toLowerCase()
  if (followersStr.includes('k')) {
    return Number(followersStr.replace('k', '')) * 1000
  }
  if (followersStr.includes('m')) {
    return Number(followersStr.replace('m', '')) * 1000000
  }
  return Number(followersStr)
}
const fetchSomeonesFollowerCount = (username) => {
  console.log(`getting ${username}'s follower count...`)
  return fetch(`https://instagram.com/${username}/`)
    .then(x => x.text())
    .then(html => {
      const followersStr = _.get(html.match(/content="([0-9\.,km]+) Followers/), 1)
      const followers = getFollowersNumber(followersStr)
      return followers
    })
}

const run = ({ args }) => {
  const username = args[0]
  // fetchFollowers({ userId }).then(console.log)
  Promise.all([
    fetchFollowers({ userId }),
    fetchFollowing({ userId })
  ])
  .then(([followers, following]) => {
    return following.filter(u => !followers.includes(u))
  })
  .then(rekt => {
    console.log(`rekt by ${rekt.length} people:`)
    // rekt.forEach(x => console.log(`https://instagram.com/${x}`))
    return Promise.all(
      rekt.map(username => {
        return fetchSomeonesFollowerCount(username)
          .then(followers => ({ username, followers }))
      })
    )
    .then(arr => {
      console.log()
      console.log('FeelsBadMan...')
      arr
      .filter(({ followers }) => followers < 10000)
      .forEach(({ username, followers }) => {
        console.log()
        console.log(username)
        console.log(`${followers} followers`)
        console.log(`https://instagram.com/${username}`)
      })
    })
  })
}

module.exports = {
  choice: 'check insta',
  shortcut: ['ig', 'insta'],
  run
}
