# wiki-infobox-table
Fetch wikipedia infobox table as JSON object.

## Installation
```
  npm install wiki-infobox-table
```

## Usage
```
  const wiki = require('wiki-infobox-table')

  wiki({ url: 'https://en.wikipedia.org/wiki/Node.js' })
    .then(function (data) {
      // Result as JSON object
      console.log(data)
    })
    .catch(function (error) {
      console.error(error)
    })
```
Following is the resultant JSON object for the above example:

```
  {
    '0': {
      key: 'Original author(s)',
      value: 'Ryan Dahl' },
    '1': {
      key: 'Developer(s)',
      value: 'Joyent'
    },
    '2': {
      key: 'Initial release',
      value: [ 'May 27', ' 2009; 9 years ago (2009-05-27)[1]' ]
    },
    '3': {
      key: 'Stable release',
      value: [
        '11.1.0',
        '   / November 2',
        ' 2018; 14 days ago (2018-11-02)[2]'
      ]
    },
    '4': {
      key: 'Repository',
      value: [
        'github.com/nodejs/node',
        ' '
      ]
    },
    '5': {
      key: 'Written in',
      value: [
        'C',
        ' C++',
        ' JavaScript'
      ]
    },
    '6': {
      key: 'Operating system',
      value: [
        'Linux',
        ' macOS',
        ' Microsoft Windows',
        ' SmartOS',
        ' FreeBSD',
        ' IBM AIX[3]'
      ]
    },
    '7': {
      key: 'Type',
      value: 'Run-time environment'
    },
    '8': {
      key: 'License',
      value: 'MIT license[4][5]'
    },
    '9': {
      key: 'Website',
      value: 'nodejs.org'
    }
  }
```