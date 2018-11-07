<<<<<<< HEAD
# Prashant Shrestha (Blog)

The theme used in this blog is for personal use only for [https://prashant.me](https://prashant.me). Is it not shared nor developed for commercial use.

>[Demo](https://prashant.me)

## Deployment

Launching Jekyll blog with the current setting requires two different commands to be executed respectively.

    sudo JEKYLL_ENV=production bundle exec jekyll build

    sudo JEKYLL_ENV=production bundle exec jekyll serve --watch

### Layouts

This whole theme is built around Skeleton, a CSS Framework.

  - `default.html` &mdash; The base layout that lays the foundation for subsequent layouts. The derived layouts inject their contents into this file at the line that says ` {{ content }} ` and are linked to this file via [FrontMatter](https://jekyllrb.com/docs/frontmatter/) declaration `layout: default`.
  - `home.html` &mdash; The layout for your landing-page / home-page / index-page.
  - `page.html` &mdash; The layout for your documents that contain FrontMatter, but are not posts.
  - `post.html` &mdash; The layout for your posts.

### Includes

Refers to snippets of code within the `_includes` directory that can be inserted in multiple layouts (and another include-file as well) within the same theme-gem.

  - `disqus_comments.html` &mdash; Code to markup disqus comment box.
  - `footer.html` &mdash; Defines the site's footer section.
  - `google-analytics.html` &mdash; Inserts Google Analytics module (active only in production environment).
  - `head.html` &mdash; Code-block that defines the `<head></head>` in *default* layout.
  - `header.html` &mdash; Defines the site's main header section.
  - `icon-* files` &mdash; Inserts github and twitter ids with respective icons.

### Assets

Refers to various asset files within the `assets` directory.
Contains the `main.scss` that imports sass files from within the `_sass` directory. This `main.scss` is what gets processed into the theme's main stylesheet `main.css` called by `_layouts/default.html` via `_includes/head.html`.

### Functions

Added [Sitemap Generator](http://davidensinger.com/2013/11/building-a-better-sitemap-xml-with-jekyll/), worked both locally and [remotely](https://www.prashant.me/sitemap.xml).

This directory can include sub-directories to manage assets of similar type, and will be copied over as is, to the final transformed site directory.
=======
# personal-blog
My personal Jekyll powered blog.
>>>>>>> 9a8715e354ca0f03c3c424f3a8e400a38f8d1525
