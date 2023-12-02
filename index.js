const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

/** >>>>>> ENTIDADES >>>>>> */
let Productos = {
    producto1: {
      idProducto: 1,
      imagen: 'https://easelectric.es/10163-large_default/lavadora-7-kg-e-a-gama-radiant.jpg',
      nombre: 'Lavadora',
      precio: 799.99,
      stock: 10,
      categoria: 'Lavandería'
    },
    producto2: {
      idProducto: 2,
      imagen: 'https://coolboxpe.vtexassets.com/arquivos/ids/319856-800-auto?v=638332557309330000&width=800&height=auto&aspect=true',
      nombre: 'Monitor',
      precio: 499.99,
      stock: 10,
      categoria: 'Computadoras'
    },
    producto3: {
        idProducto: 3,
        imagen: 'https://falabella.scene7.com/is/image/FalabellaPE/114139668_1?wid=800&hei=800&qlt=70',
        nombre: 'Auriculares',
        precio: 59.99,
        stock: 10,
        categoria: 'Computadoras'
    },
    producto4: {
        idProducto: 4,
        imagen: 'https://oechsle.vteximg.com.br/arquivos/ids/3489366-1000-1000/1840544_2.jpg?v=637540571476830000',
        nombre: 'Licuadora',
        precio: 199.99,
        stock: 10,
        categoria: 'Lavandería'
    },
    producto5: {
        idProducto: 5,
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_606339-MLA50305127238_062022-O.webp',
        nombre: 'Teclado',
        precio: 199.99,
        stock: 10,
        categoria: 'Computadora'
    },
    producto6: {
        idProducto: 6,
        imagen: 'https://kitchencenter.pe/cdn/shop/products/51207_1_1.jpg?v=1619766272',
        nombre: 'Batidora',
        precio: 49.99,
        stock: 10,
        categoria: 'Cocina'
    },
  };
  
let Usuarios = {
  usuario1: { userData: "User", passwordData: "1234" }
};
let Venta = {
  venta1: {
    idVenta:1,
    codpro:1,
    nombrepro:"LAVADORA LG CARGA SUPERIOR 17KG WT17DV6 AI DD INTELIGENCIA ARTIFICIAL GRIS",
    monto:799.99
  },
  venta2:{
    idVenta:2,
    codpro:2,
    nombrepro:"Monitor Samsung LS24R35AFHNXZA IPS De 24 75hz FHD",
    monto:499.99
  },
  venta3:{
    idVenta:3,
    codpro:3,
    nombrepro:"Auriculares inalámbricos para juegos Corsair Virtuoso RGB - Sonido envolvente 7.1 de alta fidelidad con micrófono de calidad de transmisión - Auriculares de espuma viscoelástica",
    monto:800.99
  },
  venta4:{
    idVenta:4,
    codpro:4,
    nombrepro:"Licuadora Electrolux 700w con Tecnologia TruFlow (EBS30)",
    monto:151.05
  },
};

app.get('/GetVenta',(req,res) => {
  const ventasobtenidas = Object.values(Venta)
  res.json(ventasobtenidas)
});

app.get('/GetProduct', (req, res) => {
    const productosObtenidos = Object.values(Productos)
    res.json(productosObtenidos);
  });
  
app.post('/CreateProduct', (req, res) => {
    const {
      imagen,
      nombre,
      precio,
      stock,
      categoria
    } = req.body;
    
    // Obtener el último ID existente
    const ArrayId = Object.values(Productos).map(producto => producto.idProducto);
    const ultimoId= ArrayId[ArrayId.length - 1];
    console.log(ultimoId)

    // Calcular el nuevo ID sumándole 1 al último ID
    const idProducto = ultimoId+1

    if (Productos[idProducto]) {
      res.json({ success: false, message: 'El producto ya existe' });
    } else {
      Productos[`producto${idProducto}`] = {
        idProducto,
        imagen,
        nombre,
        precio,
        stock,
        categoria
      };
      res.json({ success: true, message: 'Producto registrado exitosamente' });
    }
});

app.get('/GetProductByOrder/:position', (req, res) => {
    const position = parseInt(req.params.position);
  
    // Verificar si la posición es válida
    if (position >= 0 && position < Object.values(Productos).length) {
      // Obtener el producto en la posición especificada
      const productoEncontrado = Object.values(Productos)[position];
      res.json(productoEncontrado);
    } else {
      res.status(404).json({ success: false, message: 'Posición de producto no válida' });
    }
  });
app.delete('/DeleteProduct', (req, res) => {
    const { id } = req.query;
  
    if (!id || !Productos[`producto${id}`]) {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
    } else {
      delete Productos[`producto${id}`];
      res.json({ success: true, message: 'Producto eliminado exitosamente' });
    }
  });
app.put('/UpdateProduct/:id', (req, res) => {
    const { id } = req.params;
    const {
      idProducto,
      imagen,
      nombre,
      precio,
      stock,
      categoria
    } = req.body;
  
    if (!Productos[`producto${id}`]) {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
    } else {
      Productos[`producto${id}`] = {
        idProducto: parseInt(idProducto),
        imagen,
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoria
      };
      res.json({ success: true, message: 'Producto actualizado exitosamente' });
    }
  });

app.get('/GetUser', (req, res) => {
    const nombresUsuarios = Object.values(Usuarios).map(usuario => ({ userData: usuario.userData }));
    res.json(nombresUsuarios);
});
app.post('/LoginUser', (req, res) => {
  // Obtener datos
  const { userData, passwordData } = req.body;
  // Verificar usuario
  const usuarioEncontrado = Object.values(Usuarios).find(
    (usuario) => usuario.userData === userData.trim() && usuario.passwordData === passwordData.trim()
  );

  if (usuarioEncontrado) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.post('/CreateUser', (req, res) => {
    const { userData, passwordData } = req.body;
  
    if (Usuarios[userData]) {
      res.json({ success: false, message: 'El usuario ya existe' });
    } else {
      Usuarios[userData] = { userData, passwordData };
      res.json({ success: true, message: 'Usuario creado exitosamente' });
    }
  });

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});