# Manual de Operación — MecaDáctilo

Aplicación web interactiva para el aprendizaje y desarrollo de habilidades de mecanografía táctil, diseñada para entornos educativos. Combina ejercicios progresivos, retroalimentación visual en tiempo real, un teclado virtual con guía de dedos, y un panel docente para monitoreo grupal.

---

## Índice

1. [Portal del Estudiante](#1-portal-del-estudiante)
   - 1.1 [Ejercicios Curriculares](#11-ejercicios-curriculares)
   - 1.2 [Práctica Inteligente](#12-práctica-inteligente)
   - 1.3 [Progreso](#13-progreso)
   - 1.4 [Nitro Race](#14-nitro-race)
   - 1.5 [Certificados](#15-certificados)
2. [Portal del Docente](#2-portal-del-docente)
   - 2.1 [Roster de Alumnos](#21-roster-de-alumnos)
   - 2.2 [Fidelidad de Pulsaciones](#22-fidelidad-de-pulsaciones)
   - 2.3 [Editor de Lecciones y RSS](#23-editor-de-lecciones-y-rss)
   - 2.4 [Exportación de Reportes](#24-exportación-de-reportes)
3. [Métricas y Sistema de Puntuación](#3-métricas-y-sistema-de-puntuación)
   - 3.1 [BRUTO, NETO, PRECISIÓN, KPM, META](#31-bruto-neto-precisión-kpm-meta)
   - 3.2 [Sistema de XP y Rachas](#32-sistema-de-xp-y-rachas)
   - 3.3 [Rangos de Velocidad WPM](#33-rangos-de-velocidad-wpm)
   - 3.4 [Medallas y Logros](#34-medallas-y-logros)
4. [Guías Visuales](#4-guías-visuales)
   - 4.1 [Teclado Virtual](#41-teclado-virtual)
   - 4.2 [HandGuide (Manos Guía)](#42-handguide-manos-guía)
5. [Sistema de Detección de Fraude](#5-sistema-de-detección-de-fraude)
6. [Funcionalidades Adicionales](#6-funcionalidades-adicionales)
   - 6.1 [Pausas Ergonómicas](#61-pausas-ergonómicas)
   - 6.2 [Salto Anticipado (Early Exit)](#62-salto-anticipado-early-exit)
   - 6.3 [Variantes de Texto](#63-variantes-de-texto)

---

## 1. Portal del Estudiante

El portal del estudiante es el área principal de práctica. Está organizado en 5 pestañas accesibles desde la barra superior.

---

### 1.1 Ejercicios Curriculares

Son lecciones progresivas organizadas en tres categorías que avanzan de lo más simple a lo más complejo. Cada lección tiene una meta de velocidad (META) y una duración estimada.

#### Categoría 1: Key Drills (Teclas Básicas) — Posicionamiento

| Lección | Teclas | Meta WPM | Dificultad | Propósito pedagógico |
|---------|--------|----------|------------|---------------------|
| **Fila Guía Básica** (F, J, D, K) | f, j, d, k, espacio | 15 | beginner | **Base sensorial**. Las teclas F y J tienen relieves físicos en el teclado. Esta lección enseña a anclar los dedos índices en esos relieves y mover los dedos medio e índice sin despegar la base. |
| **Fila Guía Expandida** (A, S, L, Ñ) | a, s, d, f, j, k, l, ;, ñ, espacio | 18 | beginner | **Filas completas de reposo**. Incorpora meñiques (A, Ñ) y anulares (S, L). El objetivo es que el estudiante sienta la fila ASDF (mano izquierda) y JKLÑ (mano derecha) como territorio conocido. |
| **Teclas de Entrada de Datos** (E, I, R, U) | e, i, r, u + fila guía + espacio | 20 | beginner | **Movimiento vertical**. Las teclas E, I, R, U están en la fila superior. Aquí se entrena el estiramiento hacia arriba desde la fila guía. Primera vez que el dedo abandona su posición de reposo. |

#### Categoría 2: Word Drills (Tránsito Fino) — Palabras completas

| Lección | Vocabulario | Meta WPM | Dificultad | Propósito pedagógico |
|---------|------------|----------|------------|---------------------|
| **Terminología Esencial TICs** | red, web, link, dato, chip, byte, ram, rom, cpu, disco, nodo, wifi, internet, bit | 25 | intermediate | **Vocabulario técnico cotidiano**. Palabras cortas y familiares. El objetivo es transitar de pulsar teclas sueltas a escribir palabras completas sin pensar en cada letra. |
| **Variables y Operadores** | suma, resta, variable, función, clase, objeto, bucle, código, script, módulo, retorno, if, else, while, true, false | 28 | intermediate | **Vocabulario de programación**. Palabras más largas y combinaciones de letras menos frecuentes. Introduce términos en inglés (if, else, while) que obligan a patrones de digitación nuevos. |

#### Categoría 3: Text Drills (Simulación Real) — Párrafos

| Lección | Tema | Meta WPM | Dificultad | Propósito pedagógico |
|---------|------|----------|------------|---------------------|
| **Examen de Ciudadanía Digital** | Texto académico sobre ciudadanía digital | 30 | intermediate | **Primer párrafo continuo**. El estudiante debe mantener ritmo en un texto fluido con mayúsculas, comas y puntos. Simula una redacción académica real. |
| **Integridad Académica vs. Plagio** | Ensayo sobre integridad académica | 35 | advanced | **Texto argumentativo**. Oraciones más complejas, vocabulario formal (investigación, atribución, paráfrasis). Requiere mantener concentración en un texto denso. |
| **El Hardware Detrás de Tu Pantalla** | Texto técnico sobre hardware de teclados | 40 | advanced | **Texto técnico especializado**. Introduce signos de puntuación menos comunes, números y terminología de ingeniería. Máxima exigencia de resistencia y precisión sostenida. |

**Principio de progresión**: Cada nivel impone una meta WPM más alta (15 → 18 → 20 → 25 → 28 → 30 → 35 → 40) para forzar al estudiante a abandonar progresivamente la dependencia visual del teclado y desarrollar memoria muscular táctil. La secuencia completa va de **teclas sueltas → palabras → párrafos**, y dentro de cada categoría se avanza de lo **simple a lo complejo**.

---

### 1.2 Práctica Inteligente

Genera drills automáticos personalizados según el rendimiento del estudiante. Tiene dos sub-modos:

| Sub-modo | Icono | Funcionamiento | Cuándo usarlo |
|----------|-------|---------------|---------------|
| **Difficult Keys** | 🔥 | Analiza el historial de errores del estudiante, identifica las 5 teclas con más fallos y genera un drill de 15 repeticiones de pares de esas teclas. | Cuando notes que ciertas teclas se te atoran. El sistema las detecta automáticamente. |
| **Studied Keys** | 📘 | Toma las teclas de la lección actual y genera 18 pares aleatorios para repetición enfocada. | Al comenzar una lección nueva, para familiarizarte con las teclas antes del ejercicio completo. |

Si no hay historial de errores, Difficult Keys usa el texto predeterminado `asdf jkl; asdf jkl; asdf`.

---

### 1.3 Progreso

Dashboard visual con el historial completo de rendimiento del estudiante.

#### Gráfico D3.js (Barras apiladas)
- **Eje X**: Días con formato DD/MM
- **Eje Y**: Minutos de práctica
- **Segmentos**: Cada lección practicada se muestra con un color distinto
- **Tooltip**: Al pasar el cursor muestra fecha, título de la lección, minutos y porcentaje del día
- **Filtros de periodo**: Esta semana, Últ. 7 días, Últ. 14 días, Últ. 30 días, Todo

#### Tarjetas de métricas
| Tarjeta | Descripción |
|---------|-------------|
| Rendimiento Máx | Velocidad neta más alta alcanzada en cualquier intento |
| Máx Precisión | Precisión más alta alcanzada en cualquier intento |
| Prácticas | Total de intentos completados |
| Tiempo Real | Minutos totales acumulados de práctica |

#### Sistema de rangos WPM (5 niveles)

| Nivel | Rango WPM | Título | Color |
|-------|-----------|--------|-------|
| 1 | < 11 | Iniciador del Teclado | Verde |
| 2 | 11 — 21 | Dactilógrafo de Bronce | Ámbar |
| 3 | 22 — 32 | Digitador de Plata | Gris |
| 4 | 33 — 44 | Técnico de Oro | Amarillo |
| 5 | ≥ 45 | Maestro de Leyenda | Dorado |

Cada nivel muestra una barra de progreso hacia el siguiente hito.

---

### 1.4 Nitro Race

Modo carrera contrarreloj donde el estudiante compite contra 3 bots controlados por IA.

#### Cómo funciona
1. **Inicio**: Pantalla con trofeo y botón "Calentar Motores y Comenzar"
2. **Cuenta regresiva**: 3, 2, 1, ¡YA! con animación
3. **Carrera**: 4 carriles con íconos de vehículos que avanzan según su velocidad
4. **Final**: Tabla de posiciones con botón "Correr Otra Vez"

#### Los oponentes

| Bot | Nombre | WPM | Vehículo | Dificultad |
|-----|--------|-----|----------|------------|
| Tú | (el estudiante) | Tu WPM en tiempo real | 🚀 | — |
| Bot 1 | Alumno Estándar | 28 WPM fijo | 🚗 | Medio |
| Bot 2 | Profesor Súper Veloz | 50 WPM fijo | 🛸 | Difícil |
| Bot 3 | Novato Teclado | 18 WPM fijo | 🚜 | Fácil |

#### Mecánica
- El jugador escribe el texto en un campo de entrada
- El progreso se calcula como `(caracteres_escritos / texto_total) × 100`
- Los bots avanzan automáticamente con variación sinusoidal para simular comportamiento humano
- El ranking se asigna dinámicamente cuando cada corredor alcanza el 100%

---

### 1.5 Certificados

Genera un diploma oficial simulado con los logros del estudiante.

**Información mostrada:**
- Título: "Diploma Oficial TICS"
- Nombre del estudiante
- Velocidad neta máxima alcanzada
- Precisión promedio
- ID de Registro: CCC-849-01
- Firma: Comité Técnico TICs

Incluye botón "Imprimir / Ver PDF" para generar una copia física o digital.

---

## 2. Portal del Docente

Acceso exclusivo para el email configurado como docente. Permite supervisar, evaluar y gestionar al grupo completo.

### 2.1 Roster de Alumnos

Tabla con el rendimiento de todos los estudiantes registrados.

| Columna | Descripción |
|---------|-------------|
| Estudiante | Nombre del alumno |
| Intentos Totales | Cantidad de lecciones completadas |
| Rendimiento | Velocidad promedio en WPM |
| Precisión Promedio | Precisión promedio en todos los intentos |
| Estatus | **SUPERADO** (verde) si promedio ≥ 22 WPM, **BAJO META** (rojo) si es menor |

La meta institucional de 22 WPM equivale al nivel Digitador de Plata, considerado el umbral mínimo de competencia dactilográfica funcional.

### 2.2 Fidelidad de Pulsaciones

Sistema antifraude que permite reproducir cada intento del estudiante para verificar autenticidad.

**Lista de intentos**: Muestra estudiante, lección, velocidad, precisión y duración. Los intentos sospechosos tienen un badge rojo "SOSPECHOSO".

**Reproductor de pulsaciones**:
| Control | Descripción |
|---------|-------------|
| Velocidad | 0.5×, 1×, 2×, 4× |
| Botones | Play / Pausa / Reiniciar |
| Visualización | Caracteres correctos en verde, incorrectos en rojo tachado |
| Diagnóstico | Muestra estadísticas de intervalos entre pulsaciones. Si hay intervalos menores a 35 ms, marca "ALTO RIESGO DE MACRO/EXTERNO" |
| Eliminar | Borra intentos sospechosos con confirmación |

**Criterio de sospecha**: NETO > 120 WPM Y precisión = 100% — estadísticamente improbable en escritura humana real.

### 2.3 Editor de Lecciones y RSS

Permite al docente crear lecciones personalizadas para el grupo.

**Formulario de creación**:
- Título de la lección
- Categoría: Key / Word / Text
- Meta de velocidad (WPM)
- Cuerpo de texto

**RSS Simulado**: Botón "Sincronizar y Generar con Noticias TICs" que carga automáticamente textos de ejemplo sobre tecnología educativa, útiles para generar contenido actualizado sin escribirlo manualmente.

### 2.4 Exportación de Reportes

El docente puede exportar los datos del grupo en 4 formatos:

| Formato | Descripción |
|---------|-------------|
| **CSV** | Columnas: Estudiante, Lección, Bruto, Neto, Precisión %, Fecha, Fraude. Importable a Excel. |
| **XML** | Estructura jerárquica `<DactilografiaReport>` con cada intento como `<Intento>`. |
| **HTML** | Tabla estilizada para publicación web directa. |
| **PDF** | Llamar a imprimir página + dos reportes formales: _Resumen de Clase_ (tabla grupal con observaciones pedagógicas) y _Boletín Individual_ (perfil del estudiante con nivel alcanzado y mensaje para padres). |

---

## 3. Métricas y Sistema de Puntuación

### 3.1 BRUTO, NETO, PRECISIÓN, KPM, META

Estas 5 métricas se muestran durante y después de cada lección.

| Métrica | Fórmula | Qué mide |
|---------|---------|----------|
| **BRUTO** (Gross WPM) | `(caracteres_escritos / 5) / minutos` | Velocidad de escritura sin penalizar errores. Una "palabra" estándar son 5 caracteres. |
| **NETO** (Net WPM) | `max(0, ((caracteres - errores) / 5) / minutos)` | Velocidad real descontando los errores cometidos. Es la métrica principal de rendimiento. |
| **PRECISIÓN** (Accuracy) | `(correctas / totales) × 100` | Porcentaje de pulsaciones correctas sobre el total. Ideal: ≥ 95%. |
| **KPM** (Keystrokes Per Minute) | `caracteres / minutos` | Ritmo de pulsación bruto. Útil para medir velocidad mecánica independientemente de la precisión. |
| **META** (Target WPM) | Valor fijo definido en cada lección | Objetivo de velocidad NETO a alcanzar para considerar la lección superada. |

**Ejemplo**: Si escribes 100 caracteres en 1 minuto con 5 errores:
- BRUTO = (100/5)/1 = 20 WPM
- NETO = ((100-5)/5)/1 = 19 WPM
- PRECISIÓN = (95/100) × 100 = 95%
- KPM = 100/1 = 100 pulsaciones/minuto
- META = depende de la lección (ej. 25 WPM)

### 3.2 Sistema de XP y Rachas

**XP (Experiencia)**:
```
XP = max(1, (WPM × PRECISIÓN / 100) + (longitud_del_texto / 20))
```

- Cada intento completado otorga XP
- Cada 100 XP se sube un nivel (máximo: nivel 9)
- La barra de progreso muestra el avance hacia el siguiente nivel

**Racha (Streak)**:
- Aumenta en +1 si precisión ≥ 85% Y velocidad neta ≥ 15 WPM
- Se reinicia a 0 si no se cumple la condición
- `maxStreak` guarda el récord histórico de racha
- Se muestra con un ícono de llama 🔥 que se ilumina al tener racha activa

**Nivel de experiencia**:
```
nivel = min(9, floor(XP / 100) + 1)
```

### 3.3 Rangos de Velocidad WPM

| Rango | WPM | Descripción |
|-------|-----|-------------|
| Iniciador del Teclado | < 11 | Fase inicial de posicionamiento muscular. El estudiante está aprendiendo la ubicación de las teclas. |
| Dactilógrafo de Bronce | 11 — 21 | Velocidad de despegue. Comienza la integración bimanual y la reducción de la dependencia visual. |
| Digitador de Plata | 22 — 32 | Nivel óptimo funcional. Se erradica la dependencia ocular del teclado. Mínimo recomendado para productividad. |
| Técnico de Oro | 33 — 44 | Fluidez excelente para redacción avanzada y toma de apuntes digitales. |
| Maestro de Leyenda | ≥ 45 | Súper velocidad. Reflejos táctiles y memoria espacial completamente desarrollados. |

### 3.4 Medallas y Logros

| Medalla | Nombre | Umbral WPM | Representa |
|---------|--------|------------|------------|
| 🥉 | Medalla TICs de Bronce | ≥ 11 | Primer logro: el estudiante ya escribe sin mirar el teclado |
| 🥈 | Medalla TICs de Plata | ≥ 22 | Competencia funcional: velocidad suficiente para tareas escolares |
| 🥇 | Medalla TICs de Oro | ≥ 33 | Excelencia: el estudiante escribe más rápido que la mayoría |
| 💎 | Gran Copa de Diamante | ≥ 45 | Maestría completa: nivel de digitador profesional |

Cada medalla se muestra con efecto glow si está desbloqueada.

---

## 4. Guías Visuales

### 4.1 Teclado Virtual

Representación visual del teclado QWERTY con Ñ (español) que se actualiza en tiempo real.

**5 filas de teclas**:
1. Fila de números: `` ` 1 2 3 4 5 6 7 8 9 0 - = Backspace ``
2. Fila QWERTY: `Tab q w e r t y u i o p [ ] \`
3. Fila guía (Home): `CapsLock a s d f g h j k l ñ ; Enter`
4. Fila inferior: `Shift z x c v b n m , . / Shift`
5. Fila espaciadora: `Ctrl Alt Espacio Alt Ctrl`

**Colores por dedo**:

| Dedo | Color | Teclas asignadas |
|------|-------|------------------|
| Meñique izquierdo | Rosa | `, 1, q, a, z, Tab, CapsLock, Shift, Ctrl` |
| Anular izquierdo | Naranja | `2, w, s, x` |
| Medio izquierdo | Ámbar | `3, e, d, c` |
| Índice izquierdo | Esmeralda | `4, 5, r, t, f, g, v, b` |
| Pulgar izquierdo | Gris | `Alt` |
| Pulgar derecho | Gris | `Espacio, Alt` |
| Índice derecho | Teal | `6, 7, y, u, h, j, n, m` |
| Medio derecho | Cian | `8, i, k, ,` |
| Anular derecho | Azul | `9, o, l, .` |
| Meñique derecho | Violeta | `0, -, =, p, [, ], \, ñ, ;, ', Enter, Shift, /, Ctrl, Backspace` |

**Estados visuales de una tecla**:
| Estado | Apariencia | Cuándo ocurre |
|--------|------------|---------------|
| Normal | Color base del dedo | Reposo |
| Presionada | Fondo esmeralda, brillo verde, escala reducida | El usuario presiona la tecla |
| Objetivo | Pulso animado, anillo teal alrededor | Es la siguiente tecla a presionar en la lección |
| Mayúsculas | El Shift correspondiente se resalta | Cuando la siguiente letra es mayúscula |

### 4.2 HandGuide (Manos Guía)

Ilustración SVG de ambas manos que muestra qué dedo debe usar el estudiante para cada tecla.

**Características**:
- Mano izquierda y mano derecha con 5 dedos cada una
- **Dedo activo**: Se ilumina con el color del dedo correspondiente + efecto de pulso + brillo teal
- **Dedos inactivos**: Aparecen en gris oscuro semitransparente
- **Puntos guía**: Círculos pequeños en las puntas de los dedos indican la posición de reposo (fila guía), visibles solo cuando el dedo no está activo

**Leyenda**:
| Mano | Dedo | Teclas base |
|------|------|-------------|
| Izquierda | Meñique | A, Q, Z |
| Izquierda | Anular | S, W, X |
| Izquierda | Medio | D, E, C |
| Izquierda | Índice | F, G, R, V, T, B |
| Derecha | Índice | J, H, U, N, Y, M |
| Derecha | Medio | K, I |
| Derecha | Anular | L, O |
| Derecha | Meñique | Ñ, P |

Texto instructivo: _"Coloca los dedos sobre la fila guía `ASDF` y `JKLÑ`"_

---

## 5. Sistema de Detección de Fraude

MecaDáctilo incluye mecanismos para garantizar la integridad de las evaluaciones.

**Criterio de detección automática**:
```
sospechoso = netWpm > 120 AND precision == 100
```

Un intento se marca como **SOSPECHOSO** si la velocidad neta supera 120 WPM y la precisión es exactamente 100%. Esta combinación es estadísticamente improbable en escritura humana real y sugiere el uso de macros, scripts o intervención externa.

**Verificación manual** (portal del docente):
- El reproductor de pulsaciones permite al docente observar cada tecla presionada en secuencia, a velocidad ajustable
- El sistema mide intervalos entre pulsaciones: intervalos menores a 35 ms son imposibles para un humano y confirman automatización
- El docente puede eliminar intentos fraudulentos, lo que actualiza las estadísticas del estudiante

---

## 6. Funcionalidades Adicionales

### 6.1 Pausas Ergonómicas

Cada 5 minutos de digitación continua sin interrupción, aparece un banner recordatorio:

> _"Has estado digitando continuamente. Aparta la mirada de la pantalla, relaja tus dedos y gira tus muñecas por 20 segundos."_

Incluye un botón "Siguiente Drill" para descartar el mensaje y reiniciar el contador.

### 6.2 Salto Anticipado (Early Exit)

Cuando el estudiante demuestra dominio de la lección antes de completarla, puede saltar al siguiente ejercicio.

**Condiciones para activar el salto**:
- Han transcurrido al menos 10 segundos
- Precisión ≥ 95%
- Velocidad neta ≥ META de la lección

Si se cumple, aparece un botón verde _"Saltar / Guardar Práctica"_ con el mensaje _"Optimización de Duración: Has superado el benchmark."_

Si la velocidad neta es menor a 15 WPM, aparece un mensaje rojo: _"Memoria Rígida: Tu velocidad es < 15 WPM. Completa todo el ejercicio para fijar memoria táctil."_

### 6.3 Variantes de Texto

Después de completar una lección 3 o más veces, la app ofrece generar un texto nuevo para evitar la memorización y forzar la lectura activa.

| Tipo de lección | Variante generada |
|----------------|-------------------|
| Key Drills | 20 pares aleatorios de teclas estudiadas |
| Word Drills | 14 "palabras" de 3 a 6 caracteres usando el vocabulario técnico |
| Text Drills | Texto alternativo predefinido (3 variantes por lección) o generado aleatoriamente |

---

## Portal del Estudiante vs Portal del Docente — Resumen

| Aspecto | Estudiante | Docente |
|---------|-----------|---------|
| Acceso | Cualquier cuenta | Email configurado como administrador |
| Propósito | Practicar y mejorar | Supervisar y evaluar |
| Pestañas | 5: ejercicios, práctica inteligente, progreso, nitro race, certificados | 4: roster, fidelidad, editor, exportación |
| Datos | Sus métricas individuales | Métricas de todo el grupo |
| Acción principal | Escribir lecciones | Detectar anomalías, crear contenido, generar informes |
