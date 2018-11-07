---
layout: page
title: Archive
permalink: /archive/
---

<article class="page">
<h3><i class="fas fa-archive"></i>  Archive ({{ site.posts | size }})</h3>

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
	<h3>{{ year.name }}</h3>
	<ul>
    {% for post in year.items %}
		<li><a href="{{ post.url }}" title="{{ post.title | escape }}">{{ post.title }}</a> <span>{{ post.date | date_to_string: "ordinal", "US" }}</span></li>
    {% endfor %}
	</ul>
{% endfor %}
</article>