const pages = [
  {
    path: 'index',
    view: `src/views/home/index.html`,
    // use the path to data file to allow data changes without restarting Webpack
    data: 'src/data/pages-data/home.js'
  },
  {
    path: 'about/index',
    view: `src/views/about/index.html`,
    // use the path to data file to allow data changes without restarting Webpack
    data: 'src/data/pages-data/about.js'
  }
]

module.exports =  pages