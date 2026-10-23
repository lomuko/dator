---
layout: single
title: "Solar Home-Lab VIII: Protecciones y cableado (lo que no se ve y te salva)"
header:
  overlay_image: /assets/images/solar/solar4.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-10-23
collection: porche-solar
tags: [solar, protecciones, cableado, seguridad, tierra, diferencial, deye]
excerpt: "Fusibles, magnetotérmicos de continua, sobretensiones, diferenciales y toma de tierra: el cuadro que nadie fotografía y que decide si tu instalación es segura."
toc: true
toc_sticky: true
slug: protecciones-cableado
order: 8
---

Nadie enseña su cuadro de protecciones en Instagram. Se enseñan los paneles, la batería, el dashboard. Pero si buscas en el grupo de Telegram **Solar Diy**, el tema más hablado de todos, con diferencia, no es ninguno de esos: son las **protecciones y el cableado**. Más de 2.000 mensajes sobre fusibles, diferenciales que saltan y tomas de tierra.

Este post ordena todo eso. No es un manual de electricista (no lo soy), sino el mapa que me habría gustado tener: **qué protección va en cada tramo y por qué**.

> ⚠️ **Aviso:** esto es divulgación, no un proyecto. Una instalación conectada a la red debe cumplir el REBT y la tiene que certificar un instalador habilitado (te lo cuento en el capítulo de legalización). Si dudas, pregunta a un profesional.

<!-- 📷 FOTO: mi cuadro de protecciones DC/AC completo -->

---

## 🗺️ 1. Las tres zonas de una instalación híbrida

Un inversor híbrido como el Deye tiene **tres mundos eléctricos** muy distintos, y cada uno necesita sus propias protecciones:

| Zona | Tensión | Corriente | El peligro |
| :--- | :--- | :--- | :--- |
| **Paneles → inversor** (DC) | Alta: 300–500 V | Baja: 10–15 A por string | Arcos eléctricos que no se apagan solos, rayos |
| **Batería ↔ inversor** (DC) | Baja: 48–58 V | Muy alta: 100–150 A | Cortocircuitos brutales, cables que se calientan |
| **Red / casa** (AC) | 230 V | Hasta lo que dé tu IGA | Fugas a tierra (personas), sobretensiones de red |

El error clásico es pensar en "las protecciones" como un bloque. Una protección pensada para la red de 230 V **no sirve** en continua, y una pensada para 15 A de paneles no aguanta los 150 A de una batería.

---

## ☀️ 2. Zona de paneles (DC alta tensión)

### Lo mínimo por string
Lo que recomienda la mayoría del grupo, **por cada string** y en sus dos polos (+ y −):

1. **Protección contra sobreintensidad:** un **magnetotérmico de continua** o **fusibles gPV**. Los dos valen. El fusible es más preciso y barato; el magnetotérmico permite además cortar a mano.
2. **Protector de sobretensiones (SPD) tipo 2 de continua**, con salida a tierra.

### Los números que importan
* **Tensión:** todo lo de este tramo (magnetotérmico, fusibles, SPD, cable) tiene que ser de **continua** y aguantar **más que la Voc del string**. Lo normal es buscar componentes de **1000 V DC**.
* **Corriente:** por encima de la Isc del panel con margen. Un panel de ~14 A de Isc pide un magnetotérmico DC de 16–20 A.

### ❄️ Ojo con el frío
La tensión en vacío (Voc) de un panel **sube cuando hace frío**, aproximadamente un 0,3 % por cada grado por debajo de 25 °C. Un caso real del grupo: 12 paneles de 38,5 V de Voc dan **462 V** sobre el papel, y el inversor admite 500 V. Parece que sobra margen, pero una mañana despejada a −5 °C esos 462 V se convierten en unos **500 V**. Justo en el límite del MPPT.

**Calcula siempre la Voc con la temperatura mínima de tu zona**, no con la de la ficha técnica.

### Sección de cable
Cable **solar específico** (doble aislamiento, resistente a UV) de **4 o 6 mm²**. Con tiradas de 10–15 m, la diferencia en pérdidas entre 4 y 6 mm² es pequeña (décimas de %), pero son pérdidas durante 25 años y la diferencia de precio es mínima. Mi consejo: **6 mm²**.

### Los otros enemigos
* **Animales:** una avería real del grupo empezó con gatos bajo los paneles tirando de un cable: SPD fundido y error F23 (fuga en el lado fotovoltaico). Solución: malla metálica perimetral.
* **SPD baratos:** hay quien ha tenido que cambiar cartuchos de sobretensiones genéricos varias veces tras días de mucha exportación. En protecciones, la marca importa.
* **Conectores MC4:** crímpalos con la herramienta adecuada y **no mezcles marcas**. Los MC4 "compatibles" de distintos fabricantes son una fuente conocida de calentamientos.

<!-- 📷 FOTO: caja de protecciones de strings (magnetotérmicos DC + SPD) -->

---

## 🔋 3. Zona de batería (DC baja tensión, alta corriente)

Aquí el peligro no es la tensión (48 V no te electrocuta) sino la **corriente**. Una batería LiFePO₄ de 280 Ah puede soltar **miles de amperios** en un cortocircuito. Eso no salta: **explota**.

### La protección clave: el fusible
Lo más importante del tramo de batería es un **fusible de alto poder de corte** (tipo **NH** o **clase T**), lo más cerca posible del borne positivo. Es lo único capaz de cortar un cortocircuito real de una batería de litio.

Además, un **magnetotérmico o seccionador DC** para poder desconectar la batería a mano en mantenimiento. Muchas cajas de batería (como las de JK) ya traen uno.

### Sección de cable
Se dimensiona por la **corriente máxima del inversor**, no por la batería. Un inversor de 6 kW a 48 V puede pedir unos **125 A**: dimensiona para 150 A y no te equivocarás. Referencias del grupo:

* **35 mm²** para tiradas cortas a ~125 A.
* **50 mm²** aguantan 200–220 A en un par de metros.
* Cable **siliconado** si puedes: aguanta más temperatura y es más flexible.

### Menos conexiones = menos problemas
Con estas corrientes, **cada unión es una resistencia que se calienta**. Un consejo repetido en el grupo: usa el mínimo de puntos de conexión entre BMS e inversor, terminales de compresión bien crimpados (con crimpadora hidráulica, no con alicates) y aprieta con dinamométrica.

### No te olvides de la precarga
Como conté en el [post de baterías](/home-lab/baterias-diy/): antes de cerrar el magnetotérmico de batería, **precarga los condensadores del inversor** a través de una resistencia. El chispazo de conectar en frío castiga contactos y condensadores.

<!-- 📷 FOTO: tramo batería → inversor con fusible y seccionador -->

---

## 🏠 4. Zona de alterna (red y casa)

### Esquema básico
Lo que se repite en las instalaciones del grupo con un Deye conectado a red:

* **Entrada GRID (de la red):** magnetotérmico + diferencial.
* **Salida LOAD (cargas críticas, normalmente toda la casa):** magnetotérmico + diferencial (o los diferenciales de tu cuadro si cuelga de ahí).
* **Junto al IGA:** protector de **sobretensiones permanentes y transitorias**. Cuesta poco y protege toda la casa, no solo la solar.

### Sección y magnetotérmicos
La sección manda sobre el magnetotérmico, nunca al revés:

| Sección | Magnetotérmico máximo orientativo |
| :--- | :--- |
| 6 mm² | 25–32 A |
| 10 mm² | 40 A |

Un **C40 sobre cable de 6 mm²** es un error típico: el cable se quemaría antes de que saltara el magnetotérmico. Y si tu inversor es de 6 kW o más, la salida LOAD pide **10 mm²**.

### El diferencial que salta (el gran clásico)
Si hay una queja recurrente en el grupo es esta: *"me salta el diferencial al amanecer / al atardecer / cuando llueve / cuando limpio los paneles"*. Las causas habituales:

1. **Fugas acumuladas.** Cuando el inversor alimenta toda la casa, su diferencial "ve" la suma de las pequeñas fugas de todos los electrodomésticos. Cinco circuitos con 10 mA de fuga cada uno son 50 mA, y un diferencial de 30 mA salta.
2. **Fugas capacitivas de los paneles.** Los paneles tienen una capacidad parásita respecto a tierra que aumenta con la humedad. Por eso los saltos con lluvia o al lavarlos.
3. **El momento de la conmutación.** Al pasar de red a batería (o al revés) hay un pico.

Las soluciones que funcionan en el grupo:

* **Diferenciales superinmunizados** (clase A-SI) o tipo F, que toleran mejor los armónicos y picos de la electrónica.
* **Selectividad:** el diferencial del inversor debe tener la misma sensibilidad que el de cabecera de tu casa. Si tu casa tiene un general de 100 mA con diferenciales de 30 mA por circuito, el del inversor no debe ser de 30 mA.
* **No quitar el diferencial** "porque salta". Es lo que te salva la vida.

Los **tipo B** se piden para cargadores de coche eléctrico, y hay inversores sin transformador cuyos manuales también los piden. Mira el manual del tuyo.

<!-- 📷 FOTO: cuadro AC con diferenciales y sobretensiones -->

---

## 🌍 5. La toma de tierra

### Paneles y estructura
* Todas las **partes metálicas** (marcos de los paneles, estructura) van a tierra.
* Usa **los agujeros que el fabricante marca con el símbolo de tierra** en cada marco. No te fíes del contacto con la estructura de aluminio: con el tiempo se forma una capa de óxido que aísla.
* Los SPD de continua descargan a esa misma tierra.

### ¿Una pica o varias?
Debate eterno del grupo. Lo que está claro:

* La tierra tiene que ser **buena de verdad**, medida con telurómetro (la normativa de vivienda pide valores bajos, del orden de decenas de ohmios como máximo, y se recomiendan mucho menores).
* **Dos picas independientes muy cerca** pueden crear diferencias de potencial peligrosas si cae un rayo.
* Lo habitual en instalaciones conectadas a red es **usar la tierra de la vivienda** para todo, siempre que sea buena.

### Neutro en modo isla
Este es un detalle que poca gente conoce. Si tu inversor híbrido **sigue dando luz cuando se va la red** (modo backup/isla), en ese momento la casa queda desconectada del neutro de la compañía, que es el que está unido a tierra en el transformador. Sin esa unión, **el diferencial no detecta las fugas**: puedes tener una carcasa en tensión y que no salte nada.

La solución que se usa en el grupo es un **contactor que une neutro y tierra solo cuando el inversor está en isla**, y los separa al volver la red. En los Deye se puede gobernar con la salida ATS del inversor (según el modelo, hay que activarla en la configuración avanzada).

Cómo comprobarlo: con la red cortada y el inversor dando luz, **mide con el polímetro entre neutro y tierra** a la salida LOAD. Si ves 100 V o más, tu neutro está flotando. Y prueba el botón de test del diferencial en isla: si no salta, tienes un problema.

> Consulta el manual de tu inversor y, si dudas, a un instalador. Esta parte es seguridad de las personas, no rendimiento.

<!-- 📷 FOTO: contactor de neutro-tierra -->

---

## 🔌 6. Un detalle más: contactores y cargas inductivas

Si usas las salidas del inversor (o relés domóticos) para mover **contactores**, por ejemplo para derivar excedentes al termo, los arcos de sus bobinas generan picos que acaban castigando la electrónica cercana. Dos recomendaciones del grupo:

* Intercala **relés de maniobra baratos** entre el inversor y los contactores grandes, para que sean ellos los que sufran el arco.
* Añade **filtros RC (snubbers)** en las bobinas de los contactores que conmutan a menudo.

---

## ✅ Checklist resumen

**Paneles (por string, + y −):**
- [ ] Magnetotérmico DC o fusible gPV (≥ Isc con margen, ≥ Voc en frío)
- [ ] SPD tipo 2 DC a tierra
- [ ] Cable solar de 6 mm²
- [ ] Marcos y estructura a tierra por los puntos marcados

**Batería:**
- [ ] Fusible NH / clase T junto al positivo
- [ ] Seccionador o magnetotérmico DC
- [ ] Sección dimensionada por la corriente máxima del inversor
- [ ] Sistema de precarga

**Alterna:**
- [ ] Magnetotérmico + diferencial en GRID y en LOAD
- [ ] Secciones coherentes con los magnetotérmicos
- [ ] Sobretensiones permanentes y transitorias junto al IGA
- [ ] Diferenciales superinmunizados y selectividad bien pensada
- [ ] Puesta a tierra del neutro en modo isla (si trabajas en isla)

---

## 🧠 Conclusión

Las protecciones son la parte menos vistosa y la que más dudas genera, porque **cada zona juega con reglas distintas**: alta tensión y arcos en los paneles, corrientes enormes en la batería y fugas a tierra en la alterna.

Si me quedo con una sola idea: **en continua, todo tiene que ser específico para continua**. Un magnetotérmico de alterna no corta un arco de 400 V DC; simplemente se quema.

👉 **Siguiente capítulo:** con el sistema protegido y los datos en Home Assistant, toca sacarle partido. Automatizaciones con excedentes.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, de cuyos debates (y averías) sale buena parte de este post.*
