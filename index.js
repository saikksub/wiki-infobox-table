/**
 * wiki-infobox
 * Node module to extract information from wikipedia infobox-vcard
 * License - MIT
 */

const JSDOM = require('jsdom').JSDOM
const jQuery = require('jquery');
const curl = require('curl')
const isUrl = require('is-url')

module.exports = async function (config) {
  const promise = new Promise(function (resolve, reject) {
    if (
      config.constructor === {}.constructor && 'url' in config &&
      typeof config.url === 'string' && config.url && isUrl(config.url)
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
      let keyText = $(items[index]).children('th').text()
      let valueText = $(items[index]).children('td').text()
      if (keyText && valueText) {
        valueText = valueText.replace(/(\r\n|\n|\r)/gm, ',')
        if (valueText.split(',').length > 1) {
          const values = []
          valueText.split(',').forEach((item) => {
            if (item) {
              values.push(item)
            }
          })
          resultObj[Object.keys(resultObj).length] = {
            key: `${keyText}`,
            value: values
          }
        } else {
          resultObj[Object.keys(resultObj).length] = {
            key: `${keyText}`,
            value: `${valueText}`
          }
        }
      }
    }
  }
  console.log(resultObj)
}
