---

layout: single
title: "Solar Home-Lab (II): Hardware y decisiones técnicas"
header:
  overlay_image: /assets/images/solar/header-diseno.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-03-30
collection: porche-solar
tags: [solar, homelab, energia, fotovoltaica, autoconsumo, baterias, inversor]
excerpt: "Cómo pasé de querer un simple porche a diseñar un sistema solar completo en Cantabria."
toc: true
toc_sticky: true
slug: hardware-selection
order: 2

---

## 🔧 1 - Filosofía de hardware: abierto, modular y sin ataduras

Antes de elegir componentes, tenía clara una cosa: no quería un sistema cerrado.

No quería depender de una app ni de un fabricante para ampliar, reparar o simplemente entender cómo funciona mi instalación.

Quería algo:

* modular
* flexible
* reparable

Y, sobre todo, que pudiese entender completamente.

> Si algo falla dentro de 5 años, quiero poder arreglarlo yo.

Ese enfoque descartaba muchas soluciones comerciales desde el principio.

---

## ☀️ 2- Paneles solares: eficiencia, estética y sentido práctico

Elegí paneles de Trina Solar, un fabricante más que consolidado.

Características principales:

* ~440 W por panel
* Bifaciales
* Construcción vidrio-vidrio
* Transparencia ~5–6%
* Tamaño ~1,76 m
* Peso ~22 kg

---

### 🧠 Por qué este formato y no paneles “gigantes”

Los paneles de gran formato (~2,2 m) ofrecen más potencia, (600W), pero tienen un problema muy real:

son difíciles de manejar.

En un entorno doméstico, y a una cierta altura, eso significa:

* montaje más complicado
* más riesgo
* más exigencia estructural

En cambio, este formato:

* es manejable entre dos personas
* encaja mejor en el diseño del porche
* reduce complicaciones durante la instalación

Puede parecer un detalle menor, pero en obra marca la diferencia.

---

### 🌤️ Transparencia: una decisión clave

No quería construir un techo oscuro.

Quería un porche luminoso.

Los paneles parcialmente transparentes permiten:

* mantener luminosidad
* no oscurecer la vivienda
* mejorar la integración estética

No es lo habitual en instalaciones solares, pero en este caso era fundamental.

---

### 🔁 Bifacial: aprovechar la luz del norte

En Cantabria no hay sol constante, pero sí mucha luz difusa.

Los paneles bifaciales aprovechan:

* radiación directa
* luz reflejada

No duplican la producción, pero sí suman eficiencia en un entorno donde cada aporte cuenta.

---

## ⚡ 3 - Inversor: el equilibrio entre potencia y libertad

El inversor elegido es de Deye, modelo híbrido de 6 kW.

---

### ⚖️ Comparativa real

Antes de decidirme, valoré otras opciones:

**Victron Energy**

* calidad excelente
* muy robusto
* pero precio elevado

**Huawei**

* buen rendimiento
* ecosistema cerrado
* baterías propietarias

---

### ✅ Por qué elegí Deye

Porque encajaba con mi filosofía:

* híbrido (on-grid + off-grid)
* admite baterías DIY
* configurable
* buena relación calidad/precio

Y, sobre todo:

> es una herramienta, no un sistema cerrado.

---

### ⚡ Configuración del sistema

* 2 strings de 6 paneles
* ~2600 W por string
* Total: ~5200 W

El inversor de 6 kW permite cubrir picos de consumo y deja margen para el futuro (por ejemplo, un coche eléctrico).

---

## 🔋 4 - Baterías: almacenamiento y autonomía real

Opté por baterías basadas en LiFePO4.

---

### 🧠 Por qué LiFePO₄

No buscaba la máxima densidad energética, sino:

* seguridad
* estabilidad
* durabilidad

Este tipo de baterías:

* no presentan riesgo térmico como otras químicas
* soportan miles de ciclos
* tienen un coste por kWh muy competitivo

---

### 🔧 Configuración

* 16 celdas en serie (16S)
* 48V
* ~300 Ah

Una configuración estándar en sistemas off-grid.

---

### 🔄 Vida útil en condiciones reales

Sobre el papel:

* 6000 ciclos → ~16 años

En la práctica:

* descargas parciales (~20–25%)
* menor estrés en la batería

Esto se traduce en:

* más ciclos útiles
* mayor vida útil

Probablemente antes de que falle, ya existirán alternativas mejores y más baratas.

---

## 🔌 5 - BMS: el sistema que mantiene todo en orden

Para la gestión de batería utilizo un JK BMS.

---

### 🧠 Función del BMS

* monitorizar cada celda
* evitar sobrecargas
* evitar descargas profundas
* equilibrar el sistema

Porque una batería es tan fuerte como su celda más débil.

---

### ⚡ Balanceo activo

Este BMS utiliza balanceo activo (~2A):

* más rápido
* más eficiente
* menor pérdida de energía

No es imprescindible, pero sí muy recomendable en configuraciones como esta.

---

## ⚡ 6 - Uso real: consumir con criterio

El consumo medio de la vivienda es de unos ~7 kWh diarios.

La clave no es reducir consumo, sino gestionarlo:

* días soleados → electrodomésticos
* días nublados → consumo más conservador

> No se trata de usar menos energía, sino de usarla en el momento adecuado.

---

## 💸 7 - Coste real del proyecto

Una de las cosas que más eché en falta al investigar fue el coste real.

Aquí están los números:

### Sistema solar

* Paneles: 857 €
* Batería: 1047 €
* Inversor: 1263 €

### Estructura + eléctrico

* Estructura: ~784 €
* Sistema eléctrico: ~252 €
* Otros materiales: ~56 €

---

## 💰 8 - Total aproximado

👉 ~4300 – 4500 €

---

## 🧠 9 - Conclusión

Con esta inversión he conseguido:

* Un porche funcional
* Generación solar (~5 kW)
* Sistema con batería
* Independencia parcial

Pero lo más importante no es eso.

> Es tener un sistema que entiendo y puedo modificar.

---

## 🔜 Siguiente paso

En el siguiente capítulo entraré en la parte más práctica:

👉 construcción, montaje y problemas reales.
