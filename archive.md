---
layout: page
title: Archive
permalink: /archive/
---

#### <span class="icon-drawer"></span>  Archive ({{ site.posts | size }})

{% assign date_format = site.minima.date_format | default: "%b %d %Y" %}
{% for category in site.categories %}
##### {{ category | first | capitalize }}
<ul>
    {% for posts in category %}
        {% for post in posts %}
            {% if post.title %}
                <li><a title="{{ post.title }}" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a><span> - {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %}{{ post.date | date: date_format }}</span></li>
            {% endif %}
        {% endfor %}
    {% endfor %}
</ul>
{% endfor %}