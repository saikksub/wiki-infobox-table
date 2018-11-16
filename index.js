/**
 * wiki-infobox
 * Node module to extract information from wikipedia infobox-vcard
 * License - MIT
 */

const JSDOM = require('jsdom').JSDOM
const jQuery = require('jquery');
const curl = require('curl')
const fs = require('fs')

module.exports = async function (config) {
  const promise = new Promise(function (resolve, reject) {
    if (
      config.constructor === {}.constructor && 'url' in config &&
      typeof config.url === 'string' && config.url
    ) {
      let url = config.url
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
    } else {
      reject(new Error('Invalid url'))
    }
  })
  await promise
  return promise
}

function extractData (html) {
  const resultObj = {}
  const $ = jQuery(new JSDOM(html).window)
  const items = $('.infobox').find('tr')
  if (items.length > 0) {
    for (let index = 0; index < items.length; index++) {
      console.log($(items[index]))
    }
  }
}
