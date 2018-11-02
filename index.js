/**
 * wiki-infobox
 * Node module to extract information from wikipedia infobox-vcard
 * License - MIT
 */

const JSDOM = require('jsdom').JSDOM
const $ = jQuery = require('jquery');
const curl = require('curl')
const fs = require('fs')

module.exports = async function (config) {
  const promise = new Promise(function (resolve, reject) {
    let url = null
    if (config.data.includes('wikipedia.org')) {
      // Provided url
      url = config.data
    } else {
      // Provided keyword
      url = `https://${config.lang || 'en'}.wikipedia.org/wiki/${config.data}`
    }
    curl.get(
      url,
      null,
      function (err, response, body) {
        if (err) {
          reject(err)
        }
        if (response.statusCode === 200) {
          extractData(body)
          resolve({
            ok: 'ok'
          })
        }
      }
    )
  })
  await promise
  return promise
}

function extractData (html) {
  const $ = jQuery(new JSDOM(html).window)
  console.log($('.infobox').find('th'))
}
