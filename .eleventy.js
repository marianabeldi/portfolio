const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  })

    // Add a filter called "excerpt" to create a shortened version of a text
    eleventyConfig.addFilter('excerpt', function(text, length = 100) {
      if (text.length > length) {
        return text.substring(0, length) + '...';
      }
      return text;
    });

    // syntax highlight
    const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

    module.exports = function (eleventyConfig) {
      eleventyConfig.addPlugin(syntaxHighlight);
    };

    

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
}