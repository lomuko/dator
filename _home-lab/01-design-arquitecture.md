---
layout: single
title: "Solar Home-Lab I: Arquitectura y Diseño de un Porche Fotovoltaico"
header:
  overlay_image: /assets/images/solar/solar1.jpg
  overlay_color: "#000"
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-03-15
collection: porche-solar
tags: [solar, homelab, energia, fotovoltaica, autoconsumo]
excerpt: "De la necesidad de sombra al reto de la autosuficiencia: cómo diseñé mi infraestructura solar desde cero en el Norte."
toc: true
toc_sticky: true
slug: design-arquitecture
order: 1
---

## 🌧️ El origen: El clima como requerimiento técnico

Vivir en **Cantabria** condiciona cualquier proyecto de infraestructura. Aquí, el diseño no es solo estética; es una batalla contra la humedad, la lluvia constante y las rachas de viento de las galernas. 

Necesitábamos un porche por una cuestión de habitabilidad, pero al presupuestar la opción tradicional (teja y madera), surgió la pregunta de ingeniero: 
> **¿Y si convertimos un tejado 'pasivo' en una unidad de generación de energía 'activa'?**

Al comparar costes, la diferencia entre un porche convencional y uno solar era lo suficientemente estrecha como para que el ROI (retorno de inversión) energético hiciera que la decisión se tomara sola.

---

## 🚫 El rechazo a los "Kits" y la caja negra

Como profesional del software, huyo de las soluciones cerradas que no permiten auditoría ni aprendizaje. Los kits solares prefabricados del mercado tenían tres fallos críticos:
1. **Vendor Lock-in:** Materiales cerrados y sin posibilidad de elegir componentes específicos (como paneles bifaciales de alta eficiencia).
2. **Sobreprecio:** Pagas un margen alto por una logística simplificada.
3. **Curva de aprendizaje nula:** Montar un "Lego" no te enseña a optimizar el sistema cuando algo falla.

---

## 🏗️ La Estructura Híbrida: Acero y Madera

El reto era integrar 12 paneles en la fachada principal sin que pareciera una nave industrial. 

| Componente | Material | Razón Técnica |
| :--- | :--- | :--- |
| **Pilares** | Acero (Tubo 120mm) | Resistencia a la torsión y estabilidad frente a galernas. |
| **Vigas** | Madera Laminada | Estética, calidez y facilidad para absorber micro-vibraciones. |
| **Cubierta** | Paneles Vidrio-Vidrio | Transparencia y durabilidad en ambientes húmedos. |

---

## ☀️ Paneles Bifaciales y Transparencia

Para no "oscurecer" la casa (un pecado mortal en el Norte), elegí paneles con una **transparencia del 5-6%**. El espacio entre celdas es vidrio, lo que genera una luz tamizada muy agradable.

Además, la tecnología **bifacial** es clave aquí:
* **Luz difusa:** En días nublados, capturan el rebote de luz en el suelo (albedo).
* **Estética:** Al ser vidrio-vidrio, no tienen el antiestético plástico trasero (backsheet), lo que los hace ideales para verlos desde abajo.

---

## 📊 Dimensionamiento del Sistema

Mi consumo base es de unos **180 kWh mensuales**. Tras modelar los datos en **PVGIS**, definí el siguiente "stack" energético:

### El balance de potencia
* **Campo Solar:** 12 paneles de 440W → **5.28 kWp** (Potencia Pico).
* **Inversor:** **6 kW**. 
* **Estrategia:** El inversor de 6 kW me permite cubrir mis picos de 4 kW y deja margen para una futura carga de Vehículo Eléctrico (EV), todo sin subir el término de potencia contratada de la red.

> **Cálculo estimado:** Autosuficiencia total de febrero a noviembre; apoyo mínimo de red en el trimestre de invierno.

---

## 🧠 Conclusión: El diseño es el 80% del éxito

Este proyecto no empezó apretando tornillos, sino analizando datos de consumo y variables climáticas. En el siguiente capítulo, entraremos en el **Hardware**: por qué elegí modelos específicos de inversor y cómo preparé el cuadro de protecciones.

👉 **Siguiente post: Selección de Hardware y Electrónica.**

¿Qué componentes comprar para no depender de ecosistemas cerrados?