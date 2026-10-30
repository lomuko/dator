---
title: "Cómo dimensionar una instalación solar con batería (y lo que me dicen mis datos)"
date: 2026-12-18
categories: [energia-solar]
tags: [solar, dimensionado, bateria, paneles, inversor, autoconsumo, datos]
excerpt: "Paneles, inversor y batería a partir de tu consumo, con las reglas que se repiten en el grupo Solar Diy y siete meses de datos reales de mi instalación en Cantabria."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

*"Tengo X euros y este tejado, ¿qué monto?"* Es la pregunta que abre cientos de conversaciones en el tema *Planteamiento de instalaciones* del grupo **Solar Diy**. La respuesta siempre empieza igual: **depende de tu consumo**.

Este post resume el método que se repite en el grupo y, como bonus, lo contrasta con algo que casi nunca se ve: **los datos reales de mi propia instalación** durante siete meses, que publico en la página [Mi porche solar en datos](/solar-data/).

---

## 📊 1. Empieza por el consumo, no por los paneles

Antes de mirar un solo panel, necesitas tres números:

1. **Consumo anual en kWh:** está en tus facturas (suma los últimos 12 meses).
2. **Cuánto consumes de día y cuánto de noche:** la distribuidora tiene tu **consumo hora a hora** si tienes contador inteligente. Se descarga desde su web o desde [Datadis](https://datadis.es), la plataforma de las distribuidoras.
3. **Tu potencia máxima simultánea:** qué aparatos pueden coincidir encendidos (horno, vitrocerámica, aerotermia, coche…). Te lo dice la potencia contratada y si te salta el ICP.

Con los datos horarios se ve enseguida el reparto: lo que consumes de día lo cubren los paneles directamente; lo de la noche, la batería.

---

## ☀️ 2. Los paneles

### La cuenta rápida
**kWp necesarios ≈ consumo anual ÷ producción anual por kWp de tu zona.**

La producción por kWp depende mucho de dónde vivas y de la orientación. Para estimarla, la herramienta de referencia es [PVGIS](https://re.jrc.ec.europa.eu/pvg_tools/es/), de la Comisión Europea: le das la ubicación, la inclinación y la orientación, y te dice cuántos kWh producirá cada kWp mes a mes.

### Las reglas del grupo
* **Sobredimensiona paneles, sobre todo en el norte.** Los paneles son la parte más barata de la instalación. En invierno la producción cae a una fracción de la de verano, y la única forma de cubrir los días grises es tener más superficie. Un compañero que vive en aislada lo resume: *"sobredimensioné la instalación de paneles y vivo perfecto"*.
* **Este–oeste no es malo.** Produce algo menos en total que sur, pero reparte la producción a lo largo del día, que es justo cuando consumes. Con batería y vertido cero, una curva más plana y larga se aprovecha mejor.
* **El inversor admite más paneles que su potencia nominal.** Es normal instalar algo más de kWp que kW de inversor, porque los paneles casi nunca dan su potencia pico. El límite real lo marcan la **tensión y la corriente máximas de cada MPPT**: revisa la ficha técnica.
* **Calcula la tensión de los strings con frío.** La tensión de los paneles sube cuando baja la temperatura; un string que da 462 V en la ficha puede pasar de 500 V una mañana de helada (lo explico en el [post de protecciones](/home-lab/protecciones-cableado/)).

---

## ⚡ 3. El inversor

Se dimensiona por **potencia**, no por energía:

* Tiene que poder dar **la potencia simultánea máxima** de lo que cuelgues de él (sobre todo de la salida LOAD, si quieres que funcione en un apagón).
* Tiene que admitir **los paneles** que vas a poner (tensión y corriente por MPPT).

Un consejo recurrente en el grupo: **dos inversores de 6 kW en paralelo** cuestan poco más que uno de 8 kW, dan más potencia, más entradas de paneles y redundancia si uno falla. A cambio, la instalación es un poco más compleja.

---

## 🔋 4. La batería

La pregunta clave es **para qué la quieres**:

| Objetivo | Tamaño orientativo |
| :--- | :--- |
| **Cubrir la noche** (conectado a red) | Tu consumo nocturno, con algo de margen |
| **Cubrir la noche y algún día gris** | 1,5–2 veces el consumo nocturno |
| **Vivir en aislada** | 2–3 días de consumo, **y aun así un generador** para las rachas largas |

Más batería **no produce más energía**: solo guarda la que producen los paneles. En invierno, si los paneles no llenan ni la batería que tienes, ampliarla no sirve de nada. **Primero paneles, luego batería.**

Sobre el tipo de celda, el grupo coincide: las de **280 y 314 Ah** son las que mejor precio por kWh tienen ahora mismo. Te lo cuento en el [post de baterías DIY](/home-lab/baterias-diy/) y en la [comparativa comercial frente a DIY](/energia-solar/bateria-comercial-vs-diy/).

---

## 📈 5. Lo que dicen mis datos

Mi instalación: **5,28 kWp** (12 paneles en dos strings), un Deye híbrido de 8 kW y una batería LiFePO₄ DIY de unos **15 kWh**, sin verter a la red, en Cantabria. Estos son los promedios diarios por mes, sacados del mismo JSON que alimenta la [página de datos](/solar-data/):

| Mes 2026 | Consumo casa | Producción solar usada | Previsión solar (potencial) | Comprado a la red | Descarga de batería | SOC mínimo medio |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Abril | 8,4 kWh | 9,6 kWh | 21,2 kWh | 0,0 kWh | 3,6 kWh | 80 % |
| Mayo | 9,7 kWh | 10,6 kWh | 24,4 kWh | 0,0 kWh | 3,7 kWh | 80 % |
| Junio | 9,2 kWh | 10,1 kWh | 25,4 kWh | 0,0 kWh | 3,7 kWh | 80 % |
| Julio | 8,5 kWh | 9,5 kWh | 26,7 kWh | 0,0 kWh | 3,3 kWh | 82 % |
| Agosto | 9,9 kWh | 11,2 kWh | 21,6 kWh | 0,0 kWh | 4,4 kWh | 74 % |
| Septiembre | 10,0 kWh | 10,6 kWh | 21,0 kWh | 0,0 kWh | 4,9 kWh | 71 % |
| Octubre (hasta el 22) | 8,6 kWh | 8,6 kWh | 13,3 kWh | 0,24 kWh | 5,0 kWh | 69 % |

*"Previsión solar" es la estimación de Solcast para mis paneles: lo que podrían haber producido. "Producción solar usada" es lo que el inversor realmente produjo.*

### Cuatro lecciones
**1. De abril a septiembre, cero compras a la red.** La instalación cubre el 100 % del consumo durante medio año. En octubre empiezan las primeras compras, todavía mínimas.

**2. Con vertido cero, más de la mitad del potencial se pierde en verano.** Los paneles podrían dar 21–27 kWh al día, pero como no vierto a la red y la batería se llena, el inversor recorta la producción a lo que consumo: unos 10 kWh. Si quisiera aprovechar ese excedente, tengo dos caminos: **mover consumos al mediodía** (termo, lavadora… lo cuento en el [post de automatizaciones](/home-lab/automatizaciones-excedentes/)) o **pasar a compensación de excedentes** (ver [legalización](/home-lab/legalizacion/)).

**3. En verano, la batería está sobredimensionada.** Cada día solo se descargan **3–5 kWh** de mis 15, y el SOC mínimo rara vez baja del 70 %. Pero ojo con la conclusión: esto es **primavera y verano**. El invierno en Cantabria es otra historia, y ahí es donde se verá si la batería se queda corta, larga o justa. Lo actualizaré con los datos de diciembre y enero.

<!-- TODO: actualizar con datos de invierno (dic–feb) -->

**4. El consumo crece cuando la energía es gratis.** En mi [post de hardware](/home-lab/hardware-selection/) estimé un consumo de unos 7 kWh/día. Los datos dicen que estoy más cerca de **9–10 kWh**. No es derroche: con la instalación sobrada, he ido pasando cosas a la electricidad, sobre todo el agua caliente con un termo eléctrico, la inducción en vez del gas o la aspiradora en vez de la escoba. Lo cuento en [Consumo más electricidad que nunca (y está bien)](/energia-solar/electrificar-la-casa/). Si estás dimensionando, **cuenta con que tu consumo subirá** cuando tengas paneles.

---

## ✅ Resumen del método

1. **Consumo** anual y horario (facturas + Datadis).
2. **Paneles** con PVGIS, y sobredimensiona si vives en el norte.
3. **Inversor** por potencia simultánea y por entradas de paneles.
4. **Batería** por consumo nocturno; en aislada, días de autonomía **más** generador.
5. **Mide después** y ajusta. Los datos reales siempre corrigen la estimación.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, cuyo tema de planteamiento de instalaciones está lleno de casos reales.*
