import {ProductDAO}  from "../src/daos/index.js";
import assert from 'node:assert/strict';

describe("test ProductsDAOMem", function () {
  it("deberia traer la lista de productos vacia", function () {
    assert.strictEqual(ProductDAO.getAll().length, 0);
  });

  it("deberia agregar un producto", function () {
    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214420",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2'
    });
    assert.deepStrictEqual(ProductDAO.getAll(), [
      {
        nombre: "Vaso",
        descripcion : "vaso de cristal",
        codigo: "214420",
        foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
        precio: 20,
        stock: '2'
      }  
    ]);
    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214420",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2'
    });
    assert.strictEqual(ProductDAO.getAll().length, 2);
    assert.deepStrictEqual(ProductDAO.getAll(), [
      {
        nombre: "Vaso",
        descripcion : "vaso de cristal",
        codigo: "214420",
        foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
        precio: 20,
        stock: '2'
      },
      {
        nombre: "Vaso",
        descripcion : "vaso de cristal",
        codigo: "214424",
        foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
        precio: 20,
        stock: '2'
      }
    ]);
  });

  it("deberia elimnar un producto según id", function () {
    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214424",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2'
    });

    ProductDAO.save(
      {
        nombre: "Vaso",
        descripcion : "vaso de cristal",
        codigo: "214424",
        foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
        precio: 20,
        stock: '2'
      }
    );
    assert.deepStrictEqual(ProductDAO.deleteById(1), [
      {
        nombre: "Vaso",
        descripcion : "vaso de cristal",
        codigo: "214424",
        foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
        precio: 20,
        stock: '2'
      },
    ]);
  });

  it("deberia eliminar todos los producto", function () {

    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214424",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2'
    });

    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214424",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2'
    });

    assert.strictEqual(ProductDAO.deleteAll(), true);
  });

  it("deberia modificar un producto según 1", function () {
    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214424",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2',
      id: 3
    });

    ProductDAO.save({
      nombre: "Vaso",
      descripcion : "vaso de cristal",
      codigo: "214424",
      foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
      precio: 20,
      stock: '2'
    });

    assert.deepStrictEqual(
      ProductDAO.updateProduct({
        nombre: "Vaso",
        descripcion : "vaso de cristal",
        codigo: "214424",
        foto: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
        precio: 20,
        stock: '2',
        id: 3
      }),
    );
  });
});