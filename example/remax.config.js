const { RemaxIconfontPlugin } = require("remax-iconfont-plugin");

module.exports = {
  one: true,
  output: "dist/" + process.env.REMAX_PLATFORM,
  plugins: [
    RemaxIconfontPlugin({
      cssURL: "http://at.alicdn.com/t/font_8d5l8fzk5b87iudi.css",
    }),
  ],
};
