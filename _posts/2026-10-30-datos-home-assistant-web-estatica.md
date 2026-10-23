---
title: "Datos de Home Assistant en una web estática: JSON en GitHub y gráficas sin librerías"
date: 2026-10-30
categories: [programacion]
tags: [programacion, javascript, jekyll, github, homeassistant, json, solar]
excerpt: "Cómo publico cada noche los datos de mi instalación solar en mi web, que es estática: un JSON en un repositorio público y gráficas SVG en JavaScript puro."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Mi web es **estática**: Jekyll y GitHub Pages, sin servidor, sin base de datos. Sin embargo, la página [Mi porche solar en datos](/solar-data/) muestra la producción y el consumo de cada día de mi instalación, actualizados cada noche.

¿Cómo encaja una web estática con datos que cambian? Este post explica la arquitectura, que es más sencilla de lo que parece y que sirve para publicar cualquier dato de Home Assistant.

---

## 🧭 1. La arquitectura

```
Home Assistant ──(cada noche)──▶ daily.json ──▶ repo público en GitHub
                                                       │
                     navegador del visitante ◀── fetch()
                              ▲
     davidtor.es (Jekyll, estático) ── sirve el HTML + JS
```

Tres piezas, cada una haciendo **una sola cosa**:

1. **Home Assistant** calcula los totales del día y los publica.
2. **Un repositorio público de GitHub** ([ha_solar_data](https://github.com/lomuko/ha_solar_data)) guarda el fichero `daily.json`. GitHub hace de "servidor de datos" gratuito.
3. **La web** no sabe nada de Home Assistant: el navegador del visitante descarga el JSON y pinta las gráficas.

### Por qué así
* **Seguridad:** mi Home Assistant **no está expuesto a internet**. La web nunca habla con mi casa; solo lee un fichero ya publicado.
* **Desacoplamiento:** puedo cambiar la web sin tocar Home Assistant y al revés. El contrato entre los dos es el formato del JSON.
* **Coste cero:** GitHub Pages para la web, un repositorio para los datos.
* **Solo totales diarios:** no publico datos en tiempo real. Por privacidad (los consumos en tiempo real dicen cuándo hay alguien en casa) y porque para una web divulgativa no aportan nada.

---

## 📄 2. El contrato: el formato del JSON

Este es el fichero que publica Home Assistant cada noche, abreviado:

```json
{
  "schema": 1,
  "timezone": "Europe/Madrid",
  "updated": "2026-10-22T22:10:01+00:00",
  "days": [
    {
      "date": "2026-03-29",
      "pv_kwh": 10.5,
      "forecast_kwh": 20.38,
      "load_kwh": 3.2,
      "grid_import_kwh": 0.0,
      "grid_export_kwh": 0.0,
      "battery_charge_kwh": 8.6,
      "battery_discharge_kwh": 1.9,
      "soc_min": 48.0,
      "soc_max": 100.0
    }
  ]
}
```

Decisiones de diseño que me han funcionado:

* **Un campo `schema`** con la versión del formato. Si algún día cambio la estructura, la web puede saber qué versión está leyendo.
* **`updated` en ISO 8601 con zona horaria**, para mostrar "última actualización" sin ambigüedades.
* **Un objeto por día, con la fecha como `YYYY-MM-DD`.** Se ordena alfabéticamente igual que cronológicamente, y es fácil de leer para cualquiera que abra el fichero.
* **Unidades en el nombre del campo** (`_kwh`). Nadie tiene que adivinar si son W, Wh o kWh.
* **Si falta un dato, falta el campo**; no se rellena con `0`. Un cero es un dato ("no he comprado nada a la red"); un hueco es la ausencia de dato. En mi histórico hay un par de días de septiembre sin los campos de red, y la web los muestra como "—" en vez de inventarse un cero.
* La **previsión de Solcast** (`forecast_kwh`) va junto a la producción real, para poder comparar lo que esperaba con lo que pasó.

---

## 🏠 3. El lado de Home Assistant

Cada noche, poco después de las 00:00 hora local, un proceso en Home Assistant (`solar_export`):

1. Lee los **totales del día** de los sensores de energía del inversor (producción, consumo, red, batería), los extremos del SOC y la previsión de Solcast.
2. Añade el día al histórico.
3. Escribe `daily.json` y lo **sube al repositorio de GitHub**.

<!-- TODO: añadir aquí cómo está implementado solar_export (script, shell_command, AppDaemon…) y el YAML/código -->

Un consejo si lo montas: usa un **token de GitHub de permisos mínimos** (*fine-grained token*), con acceso solo de escritura al contenido de ese repositorio concreto. Si alguna vez se filtra, lo peor que pueden hacer es escribir en un repositorio de datos públicos.

---

## 📊 4. El lado de la web: un include de Jekyll

En la web, la página de datos es casi solo esto:

{% raw %}
```liquid
---
permalink: /solar-data/
title: "Mi porche solar en datos"
layout: single
---

{% include solar-dashboard.html lang="es" %}
```
{% endraw %}

La URL del JSON está en `_config.yml`, así que si un día muevo los datos solo cambio una línea:

```yaml
solar_data_url: https://raw.githubusercontent.com/lomuko/ha_solar_data/main/daily.json
```

El include genera un contenedor con la URL en un atributo `data-src`, y un script la descarga:

```js
fetch(src, { cache: 'no-cache' })
  .then(r => { if (!r.ok) throw 0; return r.json(); })
  .then(j => {
    all = (j.days || [])
      .filter(d => d && d.date)
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    if (!all.length) return showEmpty();
    render();
  })
  .catch(showError);
```

Tres detalles que parecen menores y no lo son:

* **`cache: 'no-cache'`**: GitHub sirve los ficheros *raw* con caché. Sin esto, el visitante podría ver los datos de ayer.
* **Filtrar y ordenar en el cliente**: no confío en que el JSON venga ordenado ni limpio. Si el exportador falla un día y deja una entrada a medias, la web no se rompe.
* **Estados vacío y error explícitos**: "aún no hay datos" y "no se han podido cargar" son mensajes distintos. Una gráfica en blanco sin explicación es peor que un mensaje.

---

## 📈 5. Gráficas sin librerías

Las gráficas son **SVG generado a mano en JavaScript puro**, sin Chart.js ni D3. Unas 150 líneas en total. ¿Por qué no usar una librería?

* **Peso:** las librerías de gráficas pesan cientos de KB para dibujar dos gráficas de barras.
* **Control total del estilo:** los colores salen de variables CSS del tema, así que el modo oscuro funciona solo.
* **Cero dependencias:** dentro de cinco años seguirá funcionando sin actualizar nada.

Lo que incluye el panel:

* **Selector de rango:** 7, 30, 90 días o todo.
* **Totales del periodo:** kWh generados, consumo, comprado y vertido a la red, y **porcentaje del consumo cubierto con solar** (`1 − importado / consumo`).
* **Dos gráficas:** producción diaria frente a la previsión (barras + línea), y de dónde viene lo que consumo (solar y batería frente a red, barras apiladas).
* **Tooltip y foco por teclado** en cada día, con un `aria-label` que lee los valores. Las gráficas también son **accesibles**.
* **Vista de tabla** alternativa, para quien prefiera los números.
* **Bilingüe:** el mismo include sirve para la versión en inglés con `lang="en"`.

Una función que me gusta especialmente es la de **escala "bonita"** del eje Y: en vez de dividir el máximo entre 4 y obtener marcas como 7,3 – 14,6 – 21,9, redondea el paso a 1, 2, 2,5, 4, 5 o 10 multiplicado por la potencia de 10 adecuada:

```js
function niceStep(v) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  for (const c of [1, 2, 2.5, 4, 5, 10]) if (n <= c + 1e-9) return c * p;
  return 10 * p;
}
```

---

## ✅ Conclusión

El patrón sirve para mucho más que una instalación solar: **"Home Assistant publica un fichero, la web estática lo lee"**. Temperaturas, consumo de agua, calidad del aire de una estación meteorológica casera… Sin exponer tu casa a internet, sin servidores y sin pagar nada.

Como desarrollador, lo que más me gusta es que cada pieza es **aburrida y reemplazable**: si mañana cambio Home Assistant por otra cosa, mientras siga escribiendo el mismo JSON, la web ni se entera.
