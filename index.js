/**
 * wiki-infobox
 * Node module to extract information from wikipedia infobox-vcard
 * License - MIT
 */

const jsdom = require('jsdom').JSDOM
const jQuery = require('jquery')
const got = require('got')

module.exports = async function (config) {
  const promise = new Promise(function (resolve, reject) {
    let url = null
    if (config.data.includes('wikipedia.org')) {
      // Provided url
      url = config.data
    } else {
      // Provided keyword
      url = `${config.lang || 'en'}.wikipedia.org/wiki/${config.data}`
    }
    (async () => {
      try {
        const response = await got(url);
        const body = response.body
        if (body) {
          const domWindow = new jsdom(`${body}`).window
          const $ = jQuery(domWindow)
          console.log($('.infobox.vcard').children('tbody').children('tr'))
          resolve({
            ok: 'ok'
          })
        }
      } catch (error) {
        console.log(error.response.body);
        resolve({
          ok: 'ok'
        })
        //=> 'Internal server error ...'
      }
    })();
  })
  await promise
  return promise
}
