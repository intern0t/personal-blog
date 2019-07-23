---
layout: page
title: Search
permalink: /search/
---

<div class="container-blog-header">
    <h1><i class="fab fa-searchengin"></i> Search</h1>
    <h1>
        <a href="#" class="menu-toggle" title="Toggle Menu">
            <i class="fas fa-ellipsis-v"></i>
        </a>
    </h1>
</div>

<div class="container-search">
    <form>
        <div>
            <input type="text" class="search-input" placeholder="Enter search keyword(s) and press Enter." autofocus />
            <button type="submit" class="button search-button"><i class="fas fa-search"></i>&nbsp;Search</button>
        </div>
    </form>

    <h1 class="search-result"></h1>

    <div class="container-search-result-wrapper">
    </div>

</div>

<!-- Menu -->

{% include menu.html %}
