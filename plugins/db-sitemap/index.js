module.exports = {
  onPostBuild: async ({ constants, utils }) => {
    // onPreBuild: async ({ utils }) => {
    console.log('Building complete -> Updating DB with new sitemap')

    try {
      await utils.run.command(`curl -X POST -d "api_key=${process.env.API_KEY}" ${process.env.UTILS_SITE}/BWS/_utils/_sitemap.php'`)
      console.log('DB updated with new sitemap')
    } catch (error) {
      console.log('Error updating DB')
    }
  },
}
