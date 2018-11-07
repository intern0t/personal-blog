---
layout: default
title: Tags
---

{% comment %}
=======================
The following part extracts all the tags from your posts and sort tags, so that you do not need to manually collect your tags to a place.
=======================
{% endcomment %}
{% assign rawtags = "" %}
{% for post in site.posts %}
	{% assign ttags = post.tags | join:'|' | append:'|' %}
	{% assign rawtags = rawtags | append:ttags | upcase %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% comment %}
=======================
The following part removes dulpicated tags and invalid tags like blank tag.
=======================
{% endcomment %}
{% assign tags = "" %}
{% for tag in rawtags %}
	{% if tag != "" %}
		{% if tags == "" %}
			{% assign tags = tag | split:'|' %}
		{% endif %}
		{% unless tags contains tag %}
			{% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
		{% endunless %}
	{% endif %}
{% endfor %}

<article>
	<h3>Tags Cloud</h3>
	<div class="post-misc">
		<div class="tags">
			{% for tag in tags %}
			<a class="tag" href="#{{ tag | slugify }}"><i class="fas fa-tag" title="{{ tag | upcase }}"></i>{{ tag | upcase }}</a>
			{% endfor %}
		</div>
	</div>

	<hr/>

    {% for tag in tags %}
		<h5 id="{{ tag | slugify }}">{{ tag | upcase }}</h5>
		<ul>
			{% for post in site.posts %}
				{% if post.tags contains tag %}
				<li>
					<h6>
						<a href="{{ post.url }}">
							{{ post.title }}
							<small>{{ post.date | date_to_string }}</small>
						</a>
					</h6>
				</li>
				{% endif %}
			{% endfor %}
		</ul>
    {% endfor %}

</article>
