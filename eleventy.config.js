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
  eleventyConfig.addCollection("trailNotes", (api) =>
    api.getFilteredByTag("posts").filter((p) => p.data.label === "trail-notes").reverse()
  );

  eleventyConfig.addCollection("mileMarkers", (api) =>
    api.getFilteredByTag("posts").filter((p) => p.data.label === "mile-markers").reverse()
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
