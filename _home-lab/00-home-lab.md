---
layout: single
title: "Solar Home-Lab"
header:
  overlay_image: /assets/images/solar/porche.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-03-14
tags: [solar, homelab, energia, fotovoltaica, autoconsumo]
excerpt: "Instalacion de porche solar en casa y baterias DIY"
toc: true
permalink: /home-lab/
---

## El Sistema
Instalación de 5.4 kW con baterías DIY. Automatización integral mediante **Home Assistant**.

## Stack Tecnológico
* **Control:** Home Assistant OS en Raspberry Pi / NUC.
* **Protocolos:** MQTT, Zigbee, Modbus (para el inversor y baterias).
* **Dashboards:** InfluxDB + Grafana para métricas de eficiencia energética.


<h1>La Saga del Porche Solar</h1>

<ul>
  {% for post in site.home-lab %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>