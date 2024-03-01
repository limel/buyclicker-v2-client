// /* eslint-disable @typescript-eslint/no-var-requires */
// const bannersData = require('./banners.json')
// console.log(bannersData)
// module.exports = {
//   async up(db) {
//     const { default: slugify } = await import('@sindresorhus/slugify')
//     await db.collection('heros').insertMany(
//       bannersData.map((banner) => ({
//         title: banner.title,
//         slug: slugify(banner.title),
//         image: {
//           src: banner.image.src,
//           alt: banner.image.alt,
//         },
//         translation: {
//           en: {
//             title: banner.translation.en.title,
//             slug: slugify(banner.translation.en.title),
//           },
//         },
//       }))
//     )
//   },

//   async down(db) {
//     await db.collection('heros').updateMany([])
//   },
// }
