---
layout: page
title: Blog
permalink: /blog/
---

<div class="container-blog-header">
    <h1><i class="fas fa-archive"></i>
    <span>Blog Posts ({{ site.posts | size }})</span>
    </h1>
</div>

<div class="container-post">
<div class="post-content">

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
	<h4><i class="far fa-calendar-alt"></i>&nbsp; {{ year.name }}</h4>
	<ol>
    {% for post in year.items %}
		<li><a href="{{ post.url }}" title="{{ post.title | escape }}">{{ post.title }}</a> <span>{{ post.date | date: "%B %-d" }}</span></li>
    {% endfor %}
	</ol>
{% endfor %}
</div>
</div>

{% include menu.html %}
