# Fogón del Barrio – Gestión de pedidos de un restaurante
## Trabajo práctico de Programación II – Grupo 12.

Sistema desarrollado en TypeScript. Digitaliza la gestión de pedidos del restaurante "Fogón del Barrio": desde que se toma un pedido hasta que la cocina termina de prepararlo y queda listo para cobrar.

### Integrantes
| Nombre y apellido | Usuario de GitHub |
| --- | --- |
| Lucas Fernandez | Luem-fern |
| Manuel Aranda | ManuAranda04 |
| Laszlo Ganduglia | Laszlo-GAN |
| Maximo Anzuinelli | Maximo-anz |
| Matias Padula | TheHysteria5776 |

## Qué hace el sistema
Registra pedidos de salón (con mesa, lugares y mozo) y de envío (con dirección y costo de envío).

Permite agregar y quitar productos (individuales o combos) mientras el pedido está en construcción, y deshacer las últimas modificaciones.

Confirma el pedido y reparte sus ítems entre las estaciones de cocina: parrilla, cocina fría, cocina dulce y barra. Un combo con productos de distintas estaciones llega a todas ellas.

Cada estación prepara sus ítems en el orden en que le llegaron y va marcando el avance (Pendiente → En Preparación → Listo).

Calcula el precio total del pedido, incluyendo combos con su beneficio (descuento porcentual o precio fijo).
Impide facturar un pedido hasta que todos sus ítems estén listos, y no permite modificar un pedido ya confirmado ni un ítem que está en preparación.

## Instrucciones de uso
1. Hacer git clone de este repositorio.
2. Posicionarse sobre la carpeta del proyecto y ejecutar el comando npm install para instalar dependencias.
3. Ejecutar npm run build para compilar.
4. Ejecutar npm run start para correr el programa.

Como alternativa:
* Correr el comando npm run test para ejecutar las pruebas unitarias.

## Patrones
### Estructurales
#### Composite
El patrón composite se usa para el manejo de combos y productos.

**Participantes**
* La clase Producto actua como la interfaz del Componente. Define comportamiento compartido.
* La clase Combo es el compuesto, que tiene subelementos de Producto.
* La clase ProductoUnico actúa como la hoja del composite, ya que no tiene subelementos.

### Comportamiento
#### State
Se uso el patrón de comportamiento State en tres ocasiones distintas para el manejo de estado de objetos. En concreto, se uso para el manejo de estado de los Pedidos, de los Items de Pedido y las Estaciones.
El patrón reemplazo los enums de estado que se tenían anteriormente en la solución del problema.

**Participantes**
* Para los tres casos existe una clase base (EstadoEstacion, EstadoPedido, y EstadoItemPedido), que define comportamiento compartido entre los distintos estados.
* Los estados concretos (EstacionLibre y EstacionOcupada para la estación, PedidoConfirmado, PedidoEnConstruccion y PedidoFinalizado para el Pedido, y ItemEnPreparacion, ItemListo e ItemPendiente para el Item de Pedido) se encargan de definir la lógica de cambio de estado. De esta forma, se evita que un pedido finalizado se vuelva a finalizar, o que una estación que ya esta libre se intente liberar.

**Ventajas**
* Cumple con el OCP. Los enum de estado obligaban a implementar muchos ifs para determinar la lógica de cada objeto cliente.

#### Strategy
El patrón strategy se implemente en dos ocasiones: para calcular el beneficio del combo y calcular el beneficio de facturación.
**Participantes**
* Para el beneficio del combo, la interfaz BeneficioCombo actúa como interfaz común de las estrategias. Las clases concretas PrecioFijo y DescuentoPorcentual actúan como las estrategias que implementan las distintas versiones del algoritmo.
* Para el beneficio de facturación, la interfaz común es EstrategiaBeneficio, y las estrategias concretas que implementan los distintos algoritmos son BeneficioPorDia y BeneficioEfectivo.

**Ventajas**
* Permite implementar los distintos tipos algoritmo de calculo de beneficio sin necesidad de tener un if en cada método que los use.