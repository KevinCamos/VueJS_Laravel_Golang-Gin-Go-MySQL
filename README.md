# VueJS_Laravel_Golang-Gin-Go-MySQL

Por [`Juanmi Bellot Tolsà`](https://github.com/jubelltols) y [`Kevin Camos Soto`](https://github.com/KevinCamos)

## Table of Contents

1. [Starbars](#Starbars)
2. [Instalar](#Instalar)
3. [Tecnologias](#Tecnologias)

# ¡StarBars! 💻

\_Bienvenidas y bienvenidos a Starbars

`¿Qué es VueJS_Laravel_Golang-Gin-Go-MySQL?`

Starbars es el segundo proyecto del curso `2º de DAW`. Realizado en equipo por `jubelltols` y `KevinCamos` con:

1. **Login:**
   VueValidation, modo Administrador (que desde Go se conecta a Laravel para revalidar información), composable, watch para saltar de página tras guardar en store el resultado.

2. **Workers:**
   AuthGuard para entrar solo siendo administrador y poder gestionar un CRUD de la resta de trabajadores. (Solo para administradores)
3. **Products & Categories:**
   AuthGuard para trabajadores, estos tienen permiso para gestionar el CRUD de productos. FileUpload que permite subir imágenes al servidor de Laravel.
4. **Ver Pedidos:**
   AuthGuard para trabajadores, gestión de CRUD de pedidos con componente "Modal" reutilizado con el componente reutilizado "Card-Product"
5. **Mesas:**
   AuthGuard para trabajadores, gestión de CRUD de mesas con componente "Modal" reutilizado con el componente reutilizado "Card-Product", además de poder crear y deshabilitar mesas (si no está ocupado), cancelar el pedido o editar el pedido con referencia a su mesa.
6. **Realizar Pedidos:**
   AuthGuard para trabajadores, gestiona un pedido nuevo o anterior pudiendo editar cantidades de los productos de cada categoría, reutilizando doblemente "Card-Products" para la elección de cada producto y para la previsualización y editación de todo el pedido actual.
7. **Dashboard:**
Permite ver una serie de estadísticas.
<!-- <img src="./assets/video1.gif"> -->

## Instalar 💿

---

### `Requisitos`

Tener instalado las siguientes herramientas:

- [MySQL](https://www.mysql.com/)
- [PHP](https://ubunlog.com/php-8-0-instalar-lenguaje-en-ubuntu/) v8.0
- [Composer](https://getcomposer.org/installer) v2.1.12 o superior

  ```
  $ curl -sS https://getcomposer.org/installer | php
  ```

  ```
  $ sudo mv composer.phar /usr/local/bin/composer
  ```

- [Go](https://golang.org/doc/install) V1.17.3

  ```
  $ wget https://dl.google.com/go/go1.16.3.linux-amd64.tar.gz
  ```

  ```
  $ sudo tar -xvf go1.16.3.linux-amd64.tar.gz
  ```

  ```
  $  sudo mv go /usr/local
  ```

  ```
  $ echo "export PATH=$PATH:/usr/local/go/bin" >> $HOME/.profile
  ```

- [Node](https://ubunlog.com/php-8-0-instalar-lenguaje-en-ubuntu/) v16.13.1.
- [Vue](https://v3.vuejs.org/) v3

  ```
  $ npm install -g @ionic/cli
  ```

Tras clonar este repositorio con `git clone` (por ejemplo), ejecutar el siguiente comando en los siguientes repositorios:

```
npm install
```

`./frontend/Vue`

```
$ php artisan key:generate
$ php artisan route:list
$ sudo service apache2 start
```

`./backend/Laravel`

```
$ go mod init starbars
$ go mod tidy
$ go run main.go
```

`./backend/Go`

<!-- <img src="./assets/video2.gif"> -->

## Tecnologías 👨‍💻

---

Lista de tecnologías utilizadas en este proyecto:

`Backend` 🏗️

- [Go](https://go.dev/):  V1.17.3

  - Golang
  - Routes General
  - Module
    - Routes
    - Models 
      - UUID
    - Requests
    - Controller
    - Validators
    - Serializers multiple
    - Middlewares (JWT)
    - Middleware
    - Token JWT
    - Connect with Laravel

- [Laravel](https://laravel.com/):  V1.17.3

  - Models
  - Migrations
  - RelationShips
  - Triggers
  - FileUpload
  - Traits
  - Repositories
  - Policies
  - Exceptions
  - Routes
  - Controllers
  - Requests
  - Middleware
 
`Frontend` 🏛️

- [Vue3](https://vue3.org): V3
  - Javascript
  - Store estructurado en modulos
  - Componentes reutilizables
  - Composables
  - Api Services
    - Servicios de peticiones al servidor
    - Authentication JWT enviado por Headers
  - AuthGuards
  - Funciones reactivas y asyncronas
    - Reactive 
    - Computed 
    - DefineAsyncComponent
    - Watch y Emmits
    - Suspense (Librería y propio)
    - Lazy Load 
`BBDD`💾

- [MySQL](https://www.mysql.com/)

<!-- <img src="./assets/video3.gif"> -->
