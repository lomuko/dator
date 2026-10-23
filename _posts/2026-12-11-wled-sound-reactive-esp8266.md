---
title: "WLED que baila con la música: una pieza impresa en 3D con un ESP8266 y un micrófono"
date: 2026-12-11
categories: [domotica]
tags: [wled, esp8266, led, impresion-3d, sound-reactive, homeassistant, diy]
excerpt: "Una lámpara impresa en 3D con tira LED que reacciona al sonido, movida por un ESP8266 antiguo con WLED SoundReactive. Cómo está montada y qué haría hoy distinto."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Este es uno de esos proyectos que no ahorran ni un vatio pero que da gusto tener: una pieza impresa en 3D con LEDs dentro que **reacciona al sonido**. Pones música y las luces laten con ella.

Por dentro no hay nada exótico: una tira de LEDs direccionables, un **ESP8266** que ya tenía por casa, un **micrófono** y el firmware **WLED** en su versión *SoundReactive*.

<!-- 📷 FOTO: la pieza terminada, encendida -->
<!-- 🎬 VÍDEO/GIF: reaccionando a la música -->

---

## 🧩 1. Las piezas

| Pieza | Qué uso |
| :--- | :--- |
| **Pieza impresa** | *(por completar: modelo y enlace)* |
| **Microcontrolador** | ESP8266 (un módulo antiguo que tenía por casa) |
| **Micrófono** | *(por completar: modelo)*, analógico, conectado al pin A0 |
| **LEDs** | *(por completar: tipo y número de LEDs)* |
| **Alimentación** | *(por completar: fuente)* |
| **Firmware** | WLED SoundReactive |

### WLED en dos líneas
[WLED](https://github.com/wled/WLED) es un firmware libre para ESP8266 y ESP32 que convierte el microcontrolador en un controlador de tiras LED con interfaz web, app móvil, más de cien efectos y paletas, y **integración nativa con Home Assistant**. No hay que programar nada: se flashea desde el navegador y se configura desde el móvil.

---

## 🎤 2. Cómo reacciona al sonido (y por qué importa que sea un ESP8266)

Aquí está la parte interesante, y la que conviene entender antes de copiar el montaje.

La capacidad de reaccionar al sonido nació como un proyecto aparte: **WLED SoundReactive**, un *fork* de WLED de la comunidad. Con los años se incorporó al WLED oficial como el módulo **AudioReactive** (desde la versión 0.14, e incluido de serie desde la 0.15). Pero con un matiz importante:

* **El WLED oficial solo escucha el micrófono en ESP32.** En un ESP8266 no hay entrada de audio: como mucho puede **recibir** el sonido analizado por otro dispositivo a través de la red.
* El fork **SoundReactive** antiguo sí admitía el ESP8266 con un **micrófono analógico en el pin A0**, aunque dejó de mantenerse para este chip hace años (quedó en una rama aparte con soporte muy limitado).

Mi lámpara usa esa versión antigua para ESP8266. Funciona, pero con limitaciones:

* **Solo efectos de volumen.** El ESP8266 no tiene potencia para analizar las frecuencias (FFT), así que los efectos que separan graves y agudos solo están disponibles en ESP32. En la lista de efectos, los de sonido llevan un `*` delante del nombre.
* **Sin actualizaciones.** Es un firmware congelado. Para una lámpara que vive en una estantería no es un problema, pero no esperes nuevos efectos.

### El micrófono
Para entradas analógicas, la documentación del proyecto SoundReactive clasifica los micrófonos más habituales:

| Micrófono | Valoración |
| :--- | :--- |
| **MAX9814** | El mejor de los analógicos (con la ganancia a 40 dB) |
| MAX9812 | Aceptable |
| **MAX4466** | Malo: muy sensible al ruido de los 3,3 V y a las caídas de tensión del WiFi |
| Sensores de palmada (KY-037, KY-038…) | Inservibles para esto |

Dos reglas de cableado: **alimentar el micrófono a 3,3 V, nunca a 5 V**, y llevar su salida al pin **A0**.

<!-- 📷 FOTO: el interior — ESP8266, micrófono y cableado -->

### Ajustes de sonido
En **Config → Sound Settings**:
* **Squelch:** el umbral de ruido de fondo. Súbelo hasta que la lámpara se quede quieta en silencio; si está demasiado alto, solo reaccionará a sonidos fuertes.
* **Gain:** amplificación de la señal. Con micrófono, valores moderados; los valores altos son para entradas de línea, que tienen una señal mucho más débil.

<!-- TODO: añadir los valores de squelch y gain que te funcionan -->

---

## ⚡ 3. Alimentación: el detalle que no hay que saltarse

Los LEDs direccionables consumen más de lo que parece. Como referencia, cada LED WS2812B puede llegar a unos **60 mA en blanco al máximo brillo**: 60 LEDs son unos 3,6 A. Consejos generales para no llevarte sustos:

* **Fuente de 5 V dimensionada** para el número de LEDs, con margen.
* **Limita el brillo máximo** en WLED (*LED Preferences → Maximum Current*). WLED ajusta el brillo para no pasarse de esa corriente: protege la fuente y el ESP.
* Un **condensador** gordo (unos 1000 µF) entre + y − al inicio de la tira y una **resistencia** de unos 330 Ω en la línea de datos ayudan a evitar parpadeos raros y a proteger el primer LED.
* Si la tira es larga, alimenta también por el otro extremo.

<!-- TODO: cómo está alimentado tu montaje -->

---

## 🏠 4. Integración con Home Assistant

WLED tiene **integración oficial** en Home Assistant y suele descubrirse sola en cuanto el dispositivo está en la red. Desde HA puedes encenderlo, cambiar el efecto, la paleta y el brillo, y meterlo en automatizaciones como cualquier luz.

<!-- TODO: si lo usas en alguna automatización (encender al anochecer, con la música, en escenas…), contarlo aquí -->
<!-- 📷 CAPTURA: la interfaz de WLED en el móvil -->

---

## 🔄 5. Si lo montara hoy

Con lo que sé ahora, cambiaría tres cosas:

1. **Un ESP32 en vez del ESP8266.** Cuestan prácticamente lo mismo y permiten usar el **WLED oficial** con AudioReactive, que se sigue actualizando y tiene efectos por frecuencias.
2. **Un micrófono digital I2S** (como el INMP441) en vez de uno analógico. La propia documentación de WLED lo recomienda: mucho menos ruido que el conversor analógico del ESP32.
3. **Aprovechar el ESP8266 igualmente**: con el WLED oficial, un ESP8266 puede funcionar como **receptor** del sonido que analiza otro dispositivo con micrófono, sincronizado por la red. Un solo micrófono en el salón puede hacer bailar varias lámparas a la vez.

---

## ✅ Conclusión

No es el proyecto más útil de la casa, pero sí de los más agradecidos. Un ESP8266 olvidado en un cajón, un micrófono de un par de euros y una buena impresión 3D bastan para tener una lámpara que baila con la música, sin nube y controlable desde Home Assistant.

Y si te animas a montar una, ve directamente a un ESP32: el resultado es el mismo, pero con un firmware vivo.

---

**Fuentes:**
- [WLED (GitHub)](https://github.com/wled/WLED)
- [WLED: Audio Reactive (documentación oficial)](https://kno.wled.ge/advanced/audio-reactive/)
- [WLED SoundReactive: opciones de entrada de audio analógico](https://mm.kno.wled.ge/WLEDSR/Analog-Audio-Input-Options/)
- [Wiki del fork SoundReactive (atuline/WLED)](https://github.com/atuline/WLED/wiki)
