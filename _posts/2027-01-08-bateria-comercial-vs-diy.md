---
title: "Batería comercial o batería DIY: lo que se gana y lo que se pierde"
date: 2027-01-08
categories: [energia-solar]
tags: [solar, bateria, lifepo4, diy, pylontech, comparativa]
excerpt: "Precio, garantía, compatibilidad, legalización y reparabilidad: una comparativa honesta entre comprar una batería de marca y montarla tú, con experiencias del grupo Solar Diy."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Yo monté mi batería, y conté cómo en el [post de baterías DIY](/home-lab/baterias-diy/). Pero eso no significa que sea la mejor opción para todo el mundo. En el grupo **Solar Diy** hay un tema dedicado a las *Baterías comerciales*, y la conversación entre los dos bandos es más interesante de lo que parece: no es "barato contra caro", sino **qué riesgos asume cada uno**.

---

## 🧭 1. Las cuatro opciones reales

No es un blanco o negro. En la práctica hay cuatro caminos:

| Opción | Qué es | Precio orientativo para ~15 kWh |
| :--- | :--- | :--- |
| **DIY puro** | Compras celdas, BMS y caja por separado y lo montas todo | ~1.000–1.300 € |
| **DIY con kit** | Caja metálica con BMS, pantalla, magnetotérmico y busbars; tú pones las celdas y atornillas | ~1.300–1.500 € |
| **Montada por un tercero** | Un montador (a menudo de la propia comunidad) te la envía probada y balanceada | ~2.000 € |
| **Comercial de marca** | Módulos de rack o apilables de marcas como Pylontech, Dyness, Deye, BYD… | ~2.000–3.000 € o más |

*Precios orientativos con los que se han movido las conversaciones del grupo entre 2024 y 2026. Cambian rápido: el precio de las celdas ha bajado de unos 100 $ por celda de 280 Ah en 2023 a unos 60–75 $ en 2026.*

---

## 💰 2. Lo que ganas con DIY

* **Precio.** Es el motivo principal: aproximadamente **la mitad por kWh**. Mi batería de unos 15 kWh me costó **1.047 €**.
* **Reparabilidad.** Si falla una celda, cambias esa celda. Si falla el BMS, cambias el BMS. En una comercial, normalmente cambias el módulo entero (o esperas a la garantía).
* **Visibilidad total.** Con un JK BMS ves cada celda, el balanceo y las temperaturas, y lo llevas a Home Assistant ([cómo lo hago yo](/home-lab/home-assistant-rs485/)). Muchas comerciales solo te dan el SOC.
* **Celdas de última generación.** Las celdas de 314 Ah, o las nuevas de 628 Ah, llegan antes al mundo DIY que a los productos de marca.
* **Aprendizaje.** Cuando algo falla, sabes dónde mirar.

## 🛡️ 3. Lo que ganas con una comercial

* **Garantía de un fabricante.** Si algo falla, hay alguien a quien reclamar. En DIY, la garantía de las celdas depende de tu proveedor, y la del conjunto… eres tú.
* **Compatibilidad probada.** Las marcas grandes publican **listas de compatibilidad** con los inversores. La comunicación BMS–inversor funciona a la primera. En DIY, buena parte de las dudas del grupo son de protocolos, cables y parámetros.
* **Legalización y seguro.** Una batería comercial tiene marcado CE y documentación. Una DIY, como conjunto, no; algunos instaladores no quieren certificarla, y es algo a contarle a tu aseguradora (lo explico en el [post de legalización](/home-lab/legalizacion/)).
* **Tiempo.** Enchufar y listo. Una DIY lleva un fin de semana de montaje y días de balanceo.
* **Menos riesgos de montaje.** Compresión de las celdas, apriete de los busbars, cableado del BMS… En DIY, cada uno es un punto de fallo.

---

## ⚠️ 4. Los riesgos que se ven en el grupo

**En DIY:**
* **Celdas defectuosas o de dudosa procedencia.** Las compras a ciegas en grandes plataformas han dado sustos (bornes quemados antes de usarse, celdas que no dan la capacidad). La recomendación unánime: **proveedor con trayectoria** que dé la cara si una celda llega mal.
* **Grado A que no lo es.** Mucha celda vendida como grado A es en realidad grado B. Para una vivienda, una buena grado B suele bastar, pero conviene saber lo que se compra.
* **Errores de montaje** que se pagan meses después: cajas que revientan por la expansión, bornes arrancados por apretar de más, desbalanceos por busbars flojos.
* **El peso.** Una batería de 16 celdas de 280 Ah, con su caja, ronda los 100 kg. Moverla o colgarla de una pared no es trivial.

**En comercial:**
* **Ecosistemas cerrados.** Algunas marcas solo funcionan con su propio inversor. Comprueba la compatibilidad antes.
* **Degradación sin visibilidad.** Un compañero con módulos Pylontech de cinco años notaba que *"ya no rinden igual"*, pero sin acceso a las celdas es difícil saber por qué.
* **Ampliar después.** Las marcas cambian de modelo y, años después, puede que no encuentres el mismo módulo para ampliar.

---

## 🔀 5. ¿Y mezclar?

Es una pregunta habitual: tengo baterías comerciales y quiero ampliar con una DIY (o al revés). En el grupo hay quien lo tiene funcionando, con algunas condiciones:

* **Misma química y misma tensión.** Por ejemplo, módulos Pylontech de 15 celdas con una DIY también de **15 celdas** (15S), para que trabajen en el mismo rango.
* **En paralelo**, con cables de igual longitud a un embarrado común.
* **Una sola batería comunica con el inversor** (normalmente la comercial, como maestra). La DIY se configura con los **mismos límites de tensión** que la comercial.
* En el inversor se pone como capacidad **la suma** de las dos.

Funciona, pero el inversor solo ve el SOC de la batería que comunica. La otra va "a ciegas", siguiendo la tensión.

---

## ✅ ¿Cuál elegir?

| Si… | Mi recomendación |
| :--- | :--- |
| Te gusta trastear, tienes herramientas y tiempo | **DIY** (con kit si quieres ir sobre seguro) |
| Quieres ahorrar pero no montar | **Montada por un tercero de confianza** |
| Necesitas garantía, legalización sin dudas o no quieres complicaciones | **Comercial**, compatible con tu inversor |
| Ya tienes comerciales y quieres ampliar barato | **Mezcla con cuidado**, o mejor una segunda batería independiente |

Yo volvería a montarla. Pero si un amigo sin experiencia me pregunta, le diría que **la diferencia de precio paga muchas horas de tranquilidad**, y que lo importante no es el logo, sino que **funcione con su inversor y alguien responda si falla**.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, donde conviven (no siempre en paz) los dos bandos.*
