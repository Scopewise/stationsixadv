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

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  eleventyConfig.addFilter("limit", (arr, limit) => {
    return Array.isArray(arr) ? arr.slice(0, limit) : arr;
  });

  // Labels — front matter `label` may be one label or a list of both.
  // Always returned in the order trail-notes, mile-markers.
  const LABEL_ORDER = ["trail-notes", "mile-markers"];
  const labelList = (label) => {
    const labels = Array.isArray(label) ? label : label ? [label] : [];
    return LABEL_ORDER.filter((l) => labels.includes(l));
  };
  eleventyConfig.addFilter("labelList", labelList);

  // Collections — one per label, sorted newest first
  eleventyConfig.addCollection("trailNotes", (api) =>
    api.getFilteredByTag("posts").filter((p) => labelList(p.data.label).includes("trail-notes")).reverse()
  );

  eleventyConfig.addCollection("mileMarkers", (api) =>
    api.getFilteredByTag("posts").filter((p) => labelList(p.data.label).includes("mile-markers")).reverse()
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
