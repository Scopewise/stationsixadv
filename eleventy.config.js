module.exports = function (eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("limit", (arr, limit) => {
    return Array.isArray(arr) ? arr.slice(0, limit) : arr;
  });

  // Collections — one per label, sorted newest first
  eleventyConfig.addCollection("fieldNotes", (api) =>
    api.getFilteredByTag("posts").filter((p) => p.data.label === "field-notes").reverse()
  );

  eleventyConfig.addCollection("judgmentCalls", (api) =>
    api.getFilteredByTag("posts").filter((p) => p.data.label === "judgment-calls").reverse()
  );

  eleventyConfig.addCollection("afterAction", (api) =>
    api.getFilteredByTag("posts").filter((p) => p.data.label === "after-action").reverse()
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
