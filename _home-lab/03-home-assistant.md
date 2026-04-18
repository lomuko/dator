---
layout: single
title: "Solar Home-Lab III: El cerebro del sistema (Home Assistant)"
header:
  overlay_image: /assets/images/solar/solar3.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-04-07
collection: porche-solar
tags: [homeassistant, domotica, solar, energia, iot]
excerpt: "Lo que no se ve: Cómo Home Assistant orquesta el inversor y las baterías para que la casa sea realmente inteligente."
toc: true
toc_sticky: true
slug: home-assistant
order: 3
---

## 🧠 Lo que no se ve: el cerebro del sistema

Cuando alguien mira la instalación, ve paneles, madera y metal.
Pero lo realmente importante no está a la vista.

Está en un servidor. Un ordenador central que actúa como cerebro de todo. 
Porque una instalación solar sin datos es solo un montón de hardware; con **Home Assistant**, es infraestructura programable.

---

## 💻 Home Assistant: el centro de control

El sistema corre sobre un servidor Linux en casa. Es el núcleo donde converge todo. 
Desde mi móvil o cualquier navegador, tengo el panel de control total:

* Producción solar y consumo en tiempo real.
* Estado del inversor y salud de la batería.
* Importación y exportación a la red eléctrica.

No es "un sistema técnico" para expertos; es el mando a distancia de mi hogar.

### 💻 El Hardware: De la Raspberry Pi al Mini-PC

No siempre fue así de fluido. Empecé este proyecto con una **Raspberry Pi 3 B**, pero a los 6 meses el sistema mostró sus límites. Cada actualización de Home Assistant era un suplicio: el sistema se ralentizaba y era casi imposible actualizar los plugins por falta de recursos.

En diciembre decidí profesionalizar el nodo central y adquirí un **HP T630 (Thin Client)**. La diferencia es abismal:
* **Procesador:** Un ordenador dedicado que gestiona las actualizaciones sin inmutarse.
* **Memoria:** 8 GB de RAM (frente a la escasa RAM de la Pi 3).
* **Almacenamiento:** Disco **SSD de 32 GB**, eliminando el cuello de botella y el riesgo de corrupción de las tarjetas SD.

Para la migración, utilicé una **copia de seguridad de Home Assistant**. Fue un proceso de "restaurar y listo": en pocos minutos tenía todo el histórico de datos funcionando en el HP T630 con una fluidez total.

---

## 🔌Adiós al WiFi y al Bluetooth

Si algo he aprendido en este Home-Lab es que **si puedes cablearlo, hazlo**. 

Al principio, mi infraestructura dependía del dongle WiFi del inversor Deye y del Bluetooth nativo del BMS JK. Esto generaba dos problemas críticos:
1. **Inestabilidad:** El Bluetooth se desconectaba aleatoriamente, dejando "huecos" en mis gráficas.
2. **El "coñazo" de los pitidos:** Cada vez que la conexión fallaba, el inversor emitía un pitido de aviso. Tener ese sonido dentro de casa cada dos por tres no es una opción de vida.

### La solución: Bus industrial RS485
Para eliminar las ondas y la latencia, decidí cablear los datos. He instalado el **HP T630 físicamente cerca del inversor y la batería**. Todo el sistema está ahora interconectado mediante **adaptadores USB a RS485** y cable de red estándar (usando el puerto físico RJ45 de los equipos).



### 1. Hablando con el inversor (Deye)
El inversor Deye no regala sus datos fácilmente; de fábrica es una "caja negra" pensada para su propia nube. Para saltarme esa limitación, utilizo el protocolo **Modbus RS485** y el excelente repositorio de **Kellerza**:
👉 [kellerza/sunsynk](https://github.com/kellerza/sunsynk)

Esto me permite extraer en tiempo real cada vatio producido, la temperatura de los transistores y la eficiencia de cada string sin depender de servidores externos. Si el internet se cae, mi gestión energética sigue intacta.

### 2. Monitorizando las tripas de la batería (JK BMS)
La batería es el componente más crítico del sistema. Para saber qué pasa realmente dentro de cada una de las 16 celdas LiFePO4, conecto el BMS mediante este addon:
👉 [jean-luc1203/jkbms-rs485-addon](https://github.com/jean-luc1203/jkbms-rs485-addon)

Ahora tengo visibilidad total: sé exactamente cuándo el **balanceo activo** está trabajando para nivelar las celdas y, lo más importante, tengo un **SOC (estado de carga)** real basado en el conteo de culombios del BMS, y no en las estimaciones genéricas de voltaje del inversor.

---

## 🤖 Automatización: donde el sistema cobra sentido

Aquí es donde Home Assistant deja de ser un monitor… y empieza a ser inteligente.
La energía en casa ya no es algo estático, es **dinámica**. La casa se adapta a la energía disponible.

**Si hay exceso de energía solar:**
* Se activa el termo de agua caliente automáticamente.
* Se enciende la depuradora de la piscina.
* Se inician cargas programadas como el coche eléctrico.

**Si el día está gris en Cantabria:**
* Reducimos consumos no esenciales.
* El sistema tira de red en horario barato para proteger la batería.
* Se posponen las cargas pesadas.

---

## 📊 Visualización y Dashboard

He creado un **Dashboard personalizado** para tener bajo control cada métrica del sistema. Aunque el panel de energía nativo es potente, un diseño propio permite ver de un vistazo el balance neto, la temperatura de las celdas y la eficiencia de los strings.

*Nota: La parte de diseño de interfaces es tan extensa que daría para una colección de posts aparte.*

---


## 📊 Un año de datos: Realidad vs. Marketing

Tras un año, los datos matan al relato. 
Viviendo 4 personas en una casa unifamiliar, estos son los cambios reales:

* **Antes:** ~600 € / año de luz.
* **Ahora:** ~80 € / año.

### ⚖️ La reflexión honesta
No te creas que esto se amortiza en 3 años. Eso es marketing.
En mi caso, con una inversión de unos **5.000 €**, el cálculo realista de amortización está **entre 7 y 8 años**.

Diciembre y enero en el norte son duros. La producción baja y hay que tirar de red. No pasa nada, es parte del diseño.

---

## 🔥 Conclusión

El valor real de esta instalación no es solo el ahorro económico.
**Es el control.**

Es entender qué pasa en tu casa en cada momento. Es dejar de ser un consumidor pasivo para convertirte en el administrador de tu propia energía. 

Invertir en este Home-Lab ha sido, sobre todo, invertir en conocimiento y libertad.

👉 **Siguiente paso: Con las manos en la masa**

Ahora que el sistema está diseñado y sabemos cómo lo vamos a monitorizar, toca mancharse las manos. En el próximo capítulo entramos en la fase de construcción real.
