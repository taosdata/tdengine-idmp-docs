---
title: Paneles de Lienzo
sidebar_label: Paneles de Lienzo
---

# 5. Paneles de Lienzo

Además de los paneles al estilo de Grafana, TDengine IDMP también admite la configuración de lienzos, popular en escenarios industriales. Permite al personal de negocio implementar soluciones de configuración web, SCADA y similares mediante "arrastrar y soltar" con "cero código", presentando visualmente el estado operativo actual de dispositivos y procesos. Actualmente admite 2D y 2.5D, con planes de admitir 3D en el futuro. Se integra a la perfección con el modelo de activos de IDMP, permitiendo una entrega rápida de soluciones y reduciendo los costes de desarrollo. Sus características son las siguientes:

1. **Edición de arrastrar y soltar intuitiva y fácil de usar**: Sin necesidad de conocimientos técnicos, cree pantallas de monitorización fácilmente como si ensamblara piezas de un juego de construcción
2. **Impulsado por datos inteligente**: Configure una vez para que los datos en tiempo real actualicen automáticamente la pantalla, reduciendo las operaciones repetitivas
3. **Efectos de animación enriquecidos**: Múltiples animaciones integradas con soporte de personalización, haciendo que la pantalla de monitorización sea vívida e intuitiva
4. **Gestión de estado flexible**: Cambia automáticamente los estados del dispositivo como en ejecución / detenido / alarma según los cambios en los datos
5. **Biblioteca gráfica extensible**: Admite la carga de gráficos personalizados (JS, SVG, imágenes, etc.) para satisfacer necesidades especiales
6. **Alto rendimiento**: Una sola pantalla puede admitir decenas de miles de símbolos, satisfaciendo las necesidades de grandes escenarios industriales

A continuación se muestra una interfaz de edición de lienzo típica:

![Interfaz de edición de lienzo](./images/canvas-01.png)

La interfaz de edición completa está compuesta por varias secciones principales:

1. **Lienzo**: El lienzo es el área de dibujo central donde los símbolos se arrastran y sueltan para editar y dibujar el diagrama de configuración. El lienzo tiene diversas propiedades, como color de fondo, cuadrícula, regla, etc., todas personalizables.
2. **Símbolos**: Son las unidades básicas del lienzo y los elementos fundamentales de la expresión gráfica. Los distintos dispositivos y componentes del diagrama son símbolos. Los símbolos tienen diversas propiedades, como color, color de fondo, tamaño, texto mostrado, progreso, valor, estado, etc.
3. **Caja de herramientas**: La caja de herramientas superior proporciona herramientas de dibujo como lápiz de tinta, lápiz, lupa, mapa general (miniatura), punto de inicio de línea, punto final de línea, ancho de línea, escala de vista, ancla automática, deshabilitar ancla, etc.
4. **Biblioteca de símbolos**: Incluye bibliotecas gráficas básicas y bibliotecas gráficas industriales, y permite a los usuarios subir sus propios gráficos diseñados.
5. **Configuración**: Configure el lienzo y cada símbolo sobre él, como color, color de fondo, fuente, eventos, animaciones, etc., para modificar su comportamiento de visualización e interacción.

Este documento ofrece solo una breve introducción a los conceptos básicos y las operaciones fundamentales. Los detalles adicionales se descubren con el uso continuado.

import DocCardList from '@theme/DocCardList';

<DocCardList />
