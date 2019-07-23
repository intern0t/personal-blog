---
layout: page
title: Projects
permalink: /projects/
---

<div class="container-blog-header">
    <h1><i class="fas fa-flask"></i> <span>Projects (UC - <i class="fas fa-hard-hat"></i>)</span></h1>
</div>

<div class="projects">
    {% for project in site.data.projects %}
    <div class="projects-entry">
        <h4><span><i class="fas fa-save"></i> <span>{{ project.title }}</span></span> <strong class="date">{{ project.date }}</strong></h4>
        <div class="projects-entry-tags">
            {% for toolsUsed in project.used %}
                <span>{{ toolsUsed }}</span>
            {% endfor %}
        </div>
        <p>{{ project.description }}</p>
        <div class="projects-entry-previews">
            <!-- Image Previews -->
            {% if project.demo.images.size > 0 %}
            <div class="projects-entry-previews-entry">
                <strong>Image Preview(s)</strong>
                {% for img_previews in project.demo.images %}
                    <a href="{{ img_previews }}" data-rel="{{ project.title | prepend: 'lightcase:'}}"><i class="far fa-image"></i></a>
                {% endfor %}
            </div>
            {% endif %}
            <!-- GIF/Demo Previews -->
            {% if project.demo.previews.size > 0 %}
            <div class="projects-entry-previews-entry">
                <strong>Other Preview(s)</strong>
                {% for img_previews in project.demo.previews %}
                    <a href="{{ img_previews }}" data-rel="{{ project.title | prepend: 'lightcase:'}}"><i class="fas fa-photo-video"></i></a>
                {% endfor %}
            </div>
            {% endif %}
            <!-- Live/Deployed -->
            {% if project.demo.live != "" %}
            <div class="projects-entry-previews-entry">
                <strong>Live Demo</strong>
                <a href="{{ project.demo.live }}"><i class="fas fa-globe"></i></a>
            </div>
            {% endif %}
        </div>
    </div>
    {% endfor %}
</div>
