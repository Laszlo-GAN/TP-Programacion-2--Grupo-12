****Fogón del Barrio – Gestión de pedidos de un restaurante****

**Trabajo práctico de Programación II – Grupo 12.**

Sistema desarrollado en TypeScript que digitaliza la gestión de pedidos del restaurante "Fogón del Barrio": desde que se toma un pedido hasta que la cocina termina de prepararlo y queda listo para cobrar.

***======= Integrantes ========***

**Nombre y apellido	                 Usuario de GitHub**

Lucas Fernandez	                     Luem-fern
Manuel Aranda	                       ManuAranda04
Laszlo Ganduglia	                   Laszlo-GAN
Maximo Anzuinelli	                   Maximo-anz
Matias Padula 	                     TheHysteria5776

***======== Qué hace el sistema ==========***

Registra pedidos de salón (con mesa, lugares y mozo) y de envío (con dirección y costo de envío).

Permite agregar y quitar productos (individuales o combos) mientras el pedido está en construcción, y deshacer las últimas modificaciones.

Confirma el pedido y reparte sus ítems entre las estaciones de cocina: parrilla, cocina fría, cocina dulce y barra. Un combo con productos de distintas estaciones llega a todas ellas.

Cada estación prepara sus ítems en el orden en que le llegaron y va marcando el avance (`PENDIENTE` → `EN_PREPARACION` → `LISTO`).

Calcula el precio total del pedido, incluyendo combos con su beneficio (descuento porcentual o precio fijo).

Impide facturar un pedido hasta que todos sus ítems estén listos, y no permite modificar un pedido ya confirmado ni un ítem que está en preparación.

***========== Compilación y ejecución ===============***


El programa de demostración (`src/index.ts`) arma un pedido de salón con seis ítems (incluido un combo), lo confirma, lo reparte entre las estaciones y lo lleva hasta el estado `FINALIZADO`. Parte de la salida:

=== 1. Armar el pedido ===
   Mesa 5 (4 lugares) - Mozo: Juan
   Ítems agregados: 6
   Combo parrillero (con 10% off): $8010
   Total: $24410
   Estado del pedido: EN_CONSTRUCCION
   ¿Se puede facturar? false

=== 4. Confirmar el pedido ===
   Estado del pedido: CONFIRMADO
   Hamburguesa: EN_PREPARACION
   Bife: PENDIENTE
   ...

=== 5. Intentar modificar el pedido confirmado ===
   Rechazado: El pedido ya fue confirmado: no se puede modificar

***======== Pruebas unitarias ============***

Ejecuta todas las pruebas con Jest y muestra la cobertura de código por consola. El reporte completo queda en la carpeta `coverage/`.

