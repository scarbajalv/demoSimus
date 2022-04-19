---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: default
---

<script src="./p5.js"></script>
<script src="./p5.sound.js"></script>

<style>
.center {
  margin: auto;
  width: 1000px;
}
</style>

# Simulación de péndulo simple

El péndulo simple es una aplicación directa del Movimiento Armónico Simple (MAS).

En la simulación siéntase libre de modificar los siguientes parámetros:

1. Longitud del péndulo (L).
2. Aceleración de la gravedad (g).
3. Desplazamiento ángular máximo (thetaMax).

También puede controlar el tiempo utilizando el slider.

<div id="simple-sketch-holder" class="center" style="position: relative; ">
	<script type="text/javascript" src="./pendulum_v5.js"></script>
</div>

