---
layout: single
title: "Solar Home-Lab II: Hardware y Decisiones Técnicas"
header:
  overlay_image: /assets/images/solar/solar2.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-03-30
collection: porche-solar
tags: [solar, homelab, energia, fotovoltaica, autoconsumo, baterias, inversor]
excerpt: "Filosofía Open-Hardware: Elegir componentes modulares para no depender de nadie."
toc: true
toc_sticky: true
slug: hardware-selection
order: 2
---

## 🔧 1. Filosofía de hardware: Abierto y Modular

Antes de comprar el primer tornillo, definí mi "stack" tecnológico bajo una premisa de ingeniería: **Soberanía Tecnológica**. No quería un sistema cerrado donde una actualización de términos de servicio o el cierre de una empresa dejaran mi casa a oscuras.

Buscaba un sistema:
* **Modular:** Capaz de escalar en capacidad de batería o paneles de forma independiente.
* **Reparable:** Si un componente falla en 5 años, quiero poder sustituirlo yo mismo sin pasar por un servicio técnico propietario.
* **Transparente:** Acceso total a los datos mediante protocolos estándar (Modbus, MQTT).

---

## ☀️ 2. Paneles Solares: Eficiencia y Habitabilidad

Elegí paneles de **Trina Solar (Vertex S+)** por su equilibrio entre rendimiento industrial y manejo doméstico.

| Especificación | Detalle |
| :--- | :--- |
| **Potencia** | ~440 Wp por panel |
| **Tecnología** | Bifacial / Vidrio-Vidrio |
| **Transparencia** | ~5–6% (luz tamizada) |
| **Peso/Tamaño** | 22 kg / 1.76 m |

### 🧠 El factor "Manejabilidad"
Aunque existen paneles de 600W+, su tamaño (~2.2m) los hace peligrosos para una instalación DIY a cierta altura. Optar por paneles de 1.76m permitió un montaje ágil entre dos personas y una menor carga estructural frente al viento.

### 🌤️ Ventaja Bifacial en el Norte
En Cantabria, la luz difusa es la norma. Los paneles bifaciales no solo son estéticamente superiores al carecer de lámina trasera plástica (backsheet), sino que capturan el **albedo** (reflejo del suelo), sumando eficiencia en condiciones de baja radiación.

---

## ⚡ 3. El Inversor: Deye 6kW Híbrido

El inversor es el kernel de nuestro sistema operativo energético. Tras analizar el mercado, la comparativa fue clara:

* **Victron:** El "Gold Standard", robusto pero con un precio que duplicaba el presupuesto.
* **Huawei:** Excelente rendimiento, pero un jardín vallado (baterías propietarias obligatorias).
* **Deye:** El equilibrio perfecto. Permite baterías DIY, tiene funciones *on-grid* y *off-grid* simultáneas y una comunidad enorme.

**Configuración de entrada:** 2 strings de 6 paneles (~2600W cada uno), totalizando **5.28 kWp**.

---

## 🔋 4. Almacenamiento: Baterías LiFePO₄ (DIY)

Para las baterías, huí de las soluciones comerciales "todo en uno" y opté por celdas **LiFePO₄**.

* **Química Segura:** A diferencia del Ion-Litio (NMC), las LiFePO₄ tienen una estabilidad térmica brutal (no arden espontáneamente).
* **Configuración 16S:** 16 celdas en serie para un sistema nominal de **48V / 300Ah**.
* **Ciclo de Vida:** Estimamos ~6000 ciclos. Con descargas superficiales del 20-25%, la vida útil proyectada supera los 15 años.

### 🛡️ El Guardián: JK BMS con Balanceo Activo
Para gestionar el banco de baterías utilizo un **JK BMS**. En sistemas de gran capacidad, el **balanceo activo (2A)** es fundamental: no disipa la energía sobrante como calor, sino que la redistribuye entre las celdas, manteniendo la salud del pack a largo plazo.

---

## 💰 5. El "Bill of Materials" (BoM)

Uno de los mayores secretos en las instalaciones solares es el desglose real de costes. Aquí están mis números:

### Core Fotovoltaico
* **Paneles (12 u.):** 857 €
* **Banco Baterías (15kWh aprox):** 1.047 €
* **Inversor Híbrido 6kW:** 1.263 €

### Estructura e Infraestructura
* **Estructura (Acero/Madera):** ~784 €
* **Cuadro Eléctrico y Protecciones:** ~252 €
* **Varios (Cableado, conectores):** ~56 €

**TOTAL PROYECTO: ~4.300 € – 4.500 €**

---

## 🧠 Conclusión

Por el precio de un coche de segunda mano, he conseguido un porche funcional y una planta de generación que cubre el consumo de mi vivienda (~7 kWh/día) casi por completo. 

Pero como ingeniero, el mayor valor no es el ahorro, sino la **comprensión total del sistema**. No es una "caja negra" instalada por terceros; es una herramienta que puedo monitorizar, tunear y mejorar.

👉 **Siguiente paso: Del Hardware al Software**

Ya tenemos los paneles, el inversor y las celdas. Pero ahora mismo no son más que metal y silicio "mudo". Para que este sistema sea realmente eficiente, necesitamos un cerebro que lo gestione. Te cuento cómo conecté todo este ecosistema a Home Assistant utilizando protocolos industriales (Modbus RS485) y cómo logré que la casa tome sus propias decisiones según el sol que haga en Cantabria.

