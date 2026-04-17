---

layout: single
title: "Solar Home-Lab (III): El cerebro del sistema (Home Assistant)"
header:
  overlay_image: /assets/images/solar/header-diseno.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-04-07
collection: porche-solar
tags: [homeassistant, domotica, solar, energia, iot]
excerpt: "Por qué decidí construir mi propio porche solar a medida en lugar de comprar un kit."
toc: true
toc_sticky: true
slug: home-assistant

---

## 🧠 Lo que no se ve: el cerebro del sistema

Cuando alguien mira la instalación, ve paneles, madera y metal.

Pero lo realmente importante no está a la vista.

Está en un servidor.

Un ordenador central que actúa como cerebro de todo el sistema.

---

## 💻 Home Assistant: el centro de control

El sistema que utilizo es Home Assistant.

Corre sobre un servidor Linux en casa y es el núcleo de toda la instalación domótica y energética.

Desde ahí controlo y monitorizo:

* Producción solar
* Consumo eléctrico
* Estado del inversor
* Estado de la batería y el BMS
* Importación y exportación a red

---

## 📱 Control total desde el móvil

La parte interesante es que no necesitas estar delante del servidor.

Todo se accede desde:

* móvil (Android / iOS)
* navegador web
* incluso asistentes de voz

Esto convierte la instalación en algo realmente accesible.

No es “un sistema técnico”.
Es un panel de control del hogar.

---

## ⚡ Monitorización en tiempo real

Lo que más cambia la forma de usar energía es ver los datos.

En tiempo real puedo saber:

* cuánta energía estoy produciendo ahora mismo
* cuánta energía ha producido el día
* cuánta ha consumido la casa
* estado de carga de la batería
* energía importada o exportada

---

### 📊 Ejemplo real de un día

Un día normal:

* Producción estimada: ~23 kWh
* Consumo casa: ~7–10 kWh
* Batería: prácticamente llena por la mañana

Esto cambia completamente la forma de usar la energía.

---

## 🔋 Batería y flujo energético

También monitorizo el sistema de baterías basado en LiFePO4.

Puedo ver:

* nivel de carga
* ciclos de carga/descarga
* temperatura
* balanceo de celdas

Esto es clave para asegurar que el sistema funciona de forma estable a largo plazo.

---

## 🤖 Automatización: donde el sistema cobra sentido

Aquí es donde Home Assistant deja de ser un monitor… y empieza a ser inteligente.

---

### ⚙️ Ejemplos reales

Si hay exceso de energía solar:

* activar termo de agua caliente
* encender piscina
* iniciar cargas programadas (ej. coche eléctrico)

---

Si no hay suficiente energía:

* reducir consumos no esenciales
* tirar de red en horario barato
* posponer cargas

---

## 💡 Energía como sistema dinámico

Esto es lo más importante del sistema:

No es consumo fijo.

Es un sistema dinámico.

La casa se adapta a la energía disponible.

---

## 🌡️ Control de condiciones

También puedo automatizar:

* ventilación de baterías
* climatización
* control de temperatura en verano

Porque la energía no es solo electricidad, también es gestión térmica.

---

## 🔌 Integración total del hogar

Home Assistant permite integrar casi cualquier cosa:

* sensores
* contadores eléctricos
* inversores
* cámaras
* iluminación
* climatización

Con integraciones como:

* MQTT
* Modbus
* APIs locales

---

## 📡 Más que domótica: infraestructura

Esto no es una “casa inteligente” típica.

Es una infraestructura programable.

Puedo:

* apagar toda la casa si me voy de viaje
* dejar solo sistemas esenciales activos
* programar consumos según tarifas eléctricas
* monitorizar todo desde cualquier parte del mundo

---

## 📊 Un año de datos reales

Tras un año de funcionamiento, los datos empiezan a tener sentido.

Instalación:

* 12 paneles Trina Solar de ~400–440 W
* pico ~5,2 kW
* inversión ~5000 €

---

## 🏡 Impacto real en la vivienda

Casa unifamiliar, 4 personas.

Cambios reales de hábitos:

* lavadoras en horas solares
* uso de electrodomésticos optimizado
* reducción de consumos innecesarios

---

## 💸 Resultado económico

Antes:

* ~600 € / año

Ahora:

* ~80 € / año

---

## ⚖️ Reflexión realista

No es una inversión que se amortice en 3 años.

Eso es marketing.

En mi caso, el cálculo es más realista:

> entre 7 y 8 años para amortizarla.

---

## 🌧️ Limitaciones reales

No todo es perfecto.

En invierno:

* diciembre y enero son críticos
* algunos días es necesario tirar de red
* la producción baja significativamente

---

## 🔥 Conclusión

El valor real de esta instalación no es solo energético.

Es control.

Es entender lo que pasa en tu casa en cada momento.

Y poder decidir en consecuencia.

---

## 🔜 Siguiente capítulo

Ahora que el sistema está construido y conectado…

👉 toca hablar de la instalación real: montaje, errores y decisiones en obra.
