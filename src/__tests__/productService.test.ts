import * as productService from '../services/product.service';
import { connectDB, disconnectDB } from '../db/db';
import { ProductModel } from '../models/product.model';
import * as productRepository from '../repositories/product.repository';

describe('ProductService Integration Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await ProductModel.deleteMany();
  });

  it('should retrieve all products', async () => {
    await productRepository.addManyProducts([
      {
        name: 'apple',
        description: 'fresh fruit',
        category: 'fruits',
        price: 11,
      },
      {
        name: 'kiwi',
        description: 'fresh fruit',
        category: 'fruits',
        price: 22,
      },
      {
        name: 'orange',
        description: 'fresh fruit',
        category: 'fruits',
        price: 33,
      },
    ]);
    const products = await productService.getAllProducts();
    expect(products.length).toBe(3);
  });

  it('should retrieve product by id', async () => {
    const product = await productService.addProduct({
      name: 'kiwi',
      description: 'fresh fruit',
      category: 'fruits',
      price: 22,
    });
    const productById = await productService.getProductById(product.id);
    expect(productById).not.toBeNull();
    expect(productById?.name).toBe(product.name);
    expect(productById?.description).toBe(product.description);
    expect(productById?.category).toBe(product.category);
    expect(productById?.price).toBe(product.price);
  });

  it('should throw error "Product is not found"', async () => {
    await productService.addProduct({
      name: 'kiwi',
      description: 'fresh fruit',
      category: 'fruits',
      price: 22,
    });
    await expect(productService.getProductById('wrongId')).rejects.toThrow('Product is not found');
  });

  it('should add new product', async () => {
    await productRepository.addManyProducts([
      {
        name: 'apple',
        description: 'fresh fruit',
        category: 'fruits',
        price: 11,
      },
      {
        name: 'kiwi',
        description: 'fresh fruit',
        category: 'fruits',
        price: 22,
      },
      {
        name: 'orange',
        description: 'fresh fruit',
        category: 'fruits',
        price: 33,
      },
    ]);
    const products = await productService.getAllProducts();
    expect(products.length).toBe(3);
  });
});
