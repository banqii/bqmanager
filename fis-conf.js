/*********************************************
*为了前期调试方便，所以先不进行压缩加戳等操作*
**********************************************/


// // 加 md5
// fis.match('*.{js,scss,css,png,ico}', {
//   useHash: true
// });
// // 加戳过滤
// fis.match('need.js', {
//   useHash: false
// });

// // 启用 fis-spriter-csssprites 插件
// fis.match('::package', {
//   spriter: fis.plugin('csssprites')
// });

// // 对 CSS 进行图片合并
// fis.match('*.css', {
//   // 给匹配到的文件分配属性 `useSprite`
//   useSprite: true
// });

// fis.match('*.js', {
//   // fis-optimizer-uglify-js 插件进行压缩，已内置
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   // fis-optimizer-clean-css 插件进行压缩，已内置
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   // fis-optimizer-png-compressor 插件进行压缩，已内置
//   optimizer: fis.plugin('png-compressor')
// });

// //sass预处理
// fis.match('*.scss', {
//   rExt: '.css',
//   parser: fis.plugin('node-sass', {
//     // options...
//   })
// })