---
title: "Posts por etiqueta"
permalink: /tags/
layout: single
author_profile: true
---

{% assign docs = site.posts | concat: site.home-lab | where_exp: "d", "d.url != '/home-lab/'" %}
{% assign all_tags = docs | map: "tags" | join: "|" | split: "|" | uniq | sort_natural %}

<ul class="taxonomy__index">
  {% for tag in all_tags %}
    {% assign tagged = docs | where_exp: "d", "d.tags contains tag" %}
    <li>
      <a href="#{{ tag | slugify }}">
        <strong>{{ tag }}</strong> <span class="taxonomy__count">{{ tagged.size }}</span>
      </a>
    </li>
  {% endfor %}
</ul>

{% for tag in all_tags %}
  {% assign tagged = docs | where_exp: "d", "d.tags contains tag" | sort: "date" | reverse %}
  <section id="{{ tag | slugify }}" class="taxonomy__section">
    <h2 class="archive__subtitle">{{ tag }}</h2>
    <div class="entries-list">
      {% for post in tagged %}
        {% include archive-single.html type="list" %}
      {% endfor %}
    </div>
    <a href="#page-title" class="back-to-top">Volver arriba &uarr;</a>
  </section>
{% endfor %}
