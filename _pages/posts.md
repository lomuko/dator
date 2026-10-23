---
title: "Todos los posts"
permalink: /posts/
layout: single
author_profile: true
---

{% assign docs = site.posts | concat: site.home-lab | where_exp: "d", "d.url != '/home-lab/'" | sort: "date" | reverse %}
{% assign docs_by_year = docs | group_by_exp: "d", "d.date | date: '%Y'" %}

{% for year in docs_by_year %}
  <h2 id="{{ year.name | slugify }}" class="archive__subtitle">{{ year.name }}</h2>
  <div class="entries-list">
    {% for post in year.items %}
      {% include archive-single.html type="list" %}
    {% endfor %}
  </div>
{% endfor %}
