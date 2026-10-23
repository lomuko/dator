---
title: "Blog"
permalink: /blog/
layout: single
author_profile: true
excerpt: "Domótica, programación e inteligencia artificial: lo que voy aprendiendo fuera de la serie Solar Home."
---

Notas sobre lo que voy aprendiendo y construyendo: **domótica** con Home Assistant, **programación** e **inteligencia artificial**. La instalación solar tiene su propia serie: [Solar Home](/home-lab/).

{% assign secciones = "domotica|Domótica,programacion|Programación,ia|Inteligencia artificial" | split: "," %}
{% for s in secciones %}
  {% assign par = s | split: "|" %}
  {% assign cat = par[0] %}
  {% assign entradas = site.posts | where_exp: "p", "p.categories contains cat" %}
  {% if entradas.size > 0 %}
  <h2 id="{{ cat }}" class="archive__subtitle">{{ par[1] }}</h2>
  <div class="entries-list">
    {% for post in entradas %}
      {% include archive-single.html type="list" %}
    {% endfor %}
  </div>
  {% endif %}
{% endfor %}
