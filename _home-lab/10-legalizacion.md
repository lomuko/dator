---
layout: single
title: "Solar Home-Lab X: Legalizar el autoconsumo (sin morir en el intento)"
header:
  overlay_image: /assets/images/solar/solar10.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-10-23
collection: porche-solar
tags: [solar, autoconsumo, legalizacion, normativa, compensacion, cantabria, irpf]
excerpt: "Sin excedentes o con compensación, CIE, CAU, ayuntamiento y deducciones: el papeleo del autoconsumo explicado para quien lo ha montado con sus manos."
toc: true
toc_sticky: true
slug: legalizacion
order: 10
---

Montar los paneles es la parte divertida. Esta es la otra.

El grupo de Telegram **Solar Diy** tiene un canal entero de *Temas legales y burocracia*, y la pregunta que más se repite es siempre la misma: *"lo he montado yo, ¿cómo lo legalizo?"*. Este post intenta responderla con la normativa en la mano.

> ⚖️ **Aviso importante:** no soy abogado ni instalador. Esto es un resumen divulgativo de la normativa vigente en octubre de 2026 (principalmente el **Real Decreto 244/2019**). Los trámites municipales cambian de un ayuntamiento a otro y la normativa se modifica con frecuencia. Antes de hacer nada, confírmalo con un instalador habilitado y con tu ayuntamiento.

---

## 🤔 1. ¿Tengo que legalizarla?

**Si tu casa está conectada a la red: sí.** Da igual que no vayas a verter nada.

Y no es solo una cuestión teórica. Los **contadores inteligentes registran cada kWh que sale** de tu casa hacia la red. Si un día tu inversor vierte, aunque sea poco y por un fallo de configuración, la distribuidora lo verá. Es un caso real del grupo: un compañero con la instalación "legalizada" como vertido cero, pero con el antivertido mal configurado por el instalador, recibió un aviso de la compañía meses después.

Lo que puede pasar si no legalizas: la normativa lo considera **infracción**, con multas calculadas en función de lo que pagas por la luz y de la energía vertida.

**¿Y si es aislada de verdad, sin contrato con la red?** No hay trámite con la distribuidora, pero la instalación eléctrica sigue sujeta al **Reglamento Electrotécnico de Baja Tensión (REBT)**. En el grupo hay opiniones para todos los gustos sobre si hay que registrarla en Industria. Si es tu caso, pregunta directamente a Industria de tu comunidad autónoma. Hay quien ha presentado una consulta por escrito y así tiene una respuesta firmada.

---

## 🔀 2. Las modalidades: elige antes de empezar

El RD 244/2019 define las modalidades de autoconsumo. Para una vivienda, en la práctica, hay tres:

| Modalidad | Qué pasa con lo que sobra | Requisitos clave |
| :--- | :--- | :--- |
| **Sin excedentes** | No se vierte nada | **Mecanismo antivertido** obligatorio. Exenta de permisos de acceso y conexión |
| **Con excedentes acogida a compensación** | Te lo descuentan de la factura | Renovable, **≤ 100 kW**, contrato de compensación con tu comercializadora |
| **Con excedentes no acogida** | Lo vendes al mercado | Alta como productor, representante de mercado, fiscalidad… Pensada para empresas |

### Sin excedentes
Es la opción más sencilla de tramitar. Tu inversor tiene que tener un **mecanismo antivertido** que impida *en todo momento* verter a la red. En un Deye es el modo **Zero Export** con su medidor o pinza. El instalador debe justificar que el sistema cumple, normalmente con la documentación del fabricante.

**Pega:** lo que sobra cuando la batería está llena se pierde (el inversor recorta la producción, como vimos en el [post de automatizaciones](/home-lab/automatizaciones-excedentes/)).

### Con compensación simplificada
Es la más popular. Lo que viertes se valora a un precio acordado con tu comercializadora (habitualmente unos **5–8 céntimos/kWh**) y se **descuenta del término de energía** de tu factura de ese mes. Dos limitaciones que conviene conocer:

* **El descuento nunca supera lo que pagas por la energía consumida** ese mes. No te van a ingresar dinero: como mucho, el término de energía se queda a cero.
* **No compensa el término de potencia**, ni el alquiler del contador, ni todos los impuestos.

Algunas comercializadoras ofrecen **"batería virtual"**: guardan en euros el excedente que no se ha podido compensar ese mes para usarlo en meses siguientes. No es una figura legal del RD, sino un producto comercial. Lee la letra pequeña.

### ¿Cuál me conviene con batería?
Con una batería bien dimensionada, el excedente real es pequeño: sobre todo días largos de verano con la batería llena. Muchos en el grupo empiezan **sin excedentes** por sencillez y pasan a **compensación** si ven que pierden mucha producción en verano. Cambiar de modalidad está permitido, adaptando la instalación y haciendo el trámite correspondiente.

---

## 📋 3. Los pasos, en orden

Para una vivienda unifamiliar con una instalación de hasta 100 kW en baja tensión:

### Paso 1: Ayuntamiento
Antes de empezar la obra: **declaración responsable, comunicación previa o licencia**, según tu municipio. Normalmente piden:

* Presupuesto o memoria descriptiva.
* Pago del **ICIO** (impuesto de construcciones), hasta un 4 % del presupuesto de ejecución.
* Algunos ayuntamientos piden más: cálculo de cargas de la estructura, certificados de anclaje, estudio de viento… En el grupo hay de todo, desde quien solo presentó un formulario hasta quien tuvo que pagar unos 900 € de proyecto con cálculo de estructura.

💡 **Pregunta por bonificaciones.** Muchos ayuntamientos bonifican el ICIO y/o el **IBI** durante varios años por instalar autoconsumo. Mira la ordenanza fiscal de tu municipio, porque puede compensar buena parte de los gastos.

### Paso 2: Diseño técnico
* **Hasta 10 kW:** **Memoria Técnica de Diseño (MTD)**, que puede hacer el propio instalador.
* **Más de 10 kW:** **proyecto** firmado por un técnico competente.

La potencia que cuenta es la **del inversor**, no la de los paneles. Un caso del grupo: 4,6 kWp de paneles con un inversor de 6 kW se legalizan como 6 kW.

### Paso 3: Certificado de Instalación Eléctrica (CIE)
El famoso **boletín**. Lo emite una **empresa instaladora habilitada**, que lo registra en el órgano de Industria de tu comunidad autónoma, normalmente por vía telemática. Junto al CIE se presentan la MTD o el proyecto, las fichas técnicas y las declaraciones de conformidad de paneles e inversor.

En **Cantabria**, la legalización de instalaciones de baja tensión se tramita a través de la [sede electrónica del Gobierno de Cantabria](https://sede.cantabria.es/sede/), en el procedimiento de *Legalización de instalaciones de Baja Tensión*. Normalmente lo presenta la empresa instaladora.

### Paso 4: Registro de autoconsumo y distribuidora
Para instalaciones de baja tensión de menos de 100 kW, el RD 244/2019 establece que **la comunidad autónoma remite la información a la distribuidora**, que adapta tu contrato de acceso. No tienes que hacer la gestión tú con la distribuidora.

Si vas **con excedentes**, la distribuidora asigna un **CAU** (Código de Autoconsumo: tu CUPS seguido de una "A" y tres cifras). El instalador suele pedirlo al principio del proceso.

### Paso 5: Comercializadora
Si vas con compensación, firmas con tu comercializadora el **contrato de compensación de excedentes** y el precio al que te valoran cada kWh vertido. Compara: la diferencia entre comercializadoras puede ser de varios céntimos por kWh.

---

## 🔧 4. "Lo he montado yo": la realidad del DIY

Aquí está el meollo. **Tú puedes montar la instalación, pero no puedes firmar el CIE**: lo tiene que emitir una empresa instaladora habilitada. Y esa empresa **asume la responsabilidad** de lo que certifica.

En la práctica, en el grupo se ven tres caminos:

1. **Contratar al instalador desde el principio** para que supervise y certifique. Es lo más limpio.
2. **Montarlo tú y buscar un instalador que lo revise y certifique.** Es lo más habitual en el grupo. Precios orientativos que se han comentado: **150–300 €** por el alta en Industria con una empresa registrada, más la memoria. Pero ojo: un instalador serio **revisará la instalación** y te pedirá cambios si algo no cumple (secciones, protecciones, tierras…). Esto es bueno, no un obstáculo. Repasa antes el [post de protecciones](/home-lab/protecciones-cableado/).
3. **Comprar un kit a una empresa que incluya la legalización.** Menos libertad para elegir componentes, pero sin sorpresas.

### ¿Y la batería DIY?
Es la pregunta incómoda del grupo. Una batería montada por ti con celdas sueltas **no tiene marcado CE como conjunto**, y algunos instaladores no quieren certificarla. Opciones que se comentan:

* Legalizar la instalación fotovoltaica (paneles + inversor) y añadir la batería después.
* Usar un kit comercial (caja + BMS con documentación) que facilite la justificación.

Más allá del papeleo, piensa en el **seguro del hogar**: si hay un incendio, lo primero que mirarán es si la instalación está legalizada. Cuéntaselo a tu aseguradora.

---

## 💶 5. Deducciones y ayudas (2026)

### Nueva deducción en el IRPF por autoconsumo
El **Real Decreto-ley 7/2026** (convalidado en marzo de 2026) introduce una **deducción específica para instalaciones de autoconsumo renovable** realizadas en 2026:

* **10 %** de la inversión (20 % en viviendas de edificios predominantemente residenciales).
* Base máxima de **5.000 € al año**.
* Puede incluir **sistemas de almacenamiento** (baterías).
* Requisito clave: la instalación tiene que contar con sus autorizaciones, en particular el **CIE**. Otra razón para legalizar.

### Deducciones por eficiencia energética
Las deducciones del IRPF por obras de mejora de eficiencia energética en vivienda (20 % y 40 %) están **prorrogadas hasta el 31 de diciembre de 2026**. Requieren un **certificado energético antes y otro después** de la obra que demuestren la mejora (reducción del 30 % del consumo de energía primaria no renovable, o pasar a letra A o B, para el tramo del 40 %). Una fotovoltaica con batería suele ayudar mucho en el certificado.

> Las deducciones tienen requisitos de compatibilidad, forma de pago (nunca en efectivo) y documentación. **Confírmalo con la Agencia Tributaria o un asesor** antes de contar con ese dinero.

### Ayudas locales
IBI e ICIO bonificados según tu ayuntamiento, y posibles convocatorias autonómicas. Las subvenciones directas suelen exigir **factura de una empresa instaladora**, algo difícil de encajar con el DIY puro.

---

## ✅ Checklist

- [ ] Decidir modalidad: sin excedentes o con compensación
- [ ] Ayuntamiento: declaración responsable o licencia + ICIO (y preguntar por bonificaciones)
- [ ] Instalador habilitado que haga la MTD y emita el CIE
- [ ] CAU (si hay excedentes)
- [ ] Registro en Industria (la comunidad autónoma comunica a la distribuidora)
- [ ] Contrato de compensación con la comercializadora (si hay excedentes)
- [ ] Antivertido bien configurado y probado (si no hay excedentes)
- [ ] Avisar a la aseguradora del hogar
- [ ] Guardar facturas y certificados para las deducciones

---

## 🧠 Conclusión

El papeleo da pereza, pero es **más sencillo de lo que parece** para una vivienda: un trámite en el ayuntamiento, un instalador que certifique y el resto lo mueve la administración. Y en 2026 hay un incentivo claro: **sin CIE no hay deducción**.

Para el DIYer, el truco es **pensar en la legalización desde el principio**: elegir componentes con documentación, respetar las protecciones y tener un instalador de confianza antes de atornillar el primer panel, no después.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, cuyo canal de temas legales es una mina de experiencias (y de sustos ajenos).*

---

**Fuentes:**
- [Real Decreto 244/2019 (BOE, texto consolidado)](https://www.boe.es/buscar/act.php?id=BOE-A-2019-5089)
- [Agencia Tributaria: medidas del Real Decreto-ley 7/2026](https://sede.agenciatributaria.gob.es/Sede/todas-noticias/2026/marzo/23/medidas-materia-tributacion.html)
- [Sede electrónica del Gobierno de Cantabria](https://sede.cantabria.es/sede/)
