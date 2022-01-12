<?php

namespace App\Repositories;
use App\Models\Products;
use App\Helpers\FileUploader;
use Illuminate\Support\Facades\DB;
use App\Models\Categories;
use App\Models\User;

class ProductsRepository{

    public function getAllProducts()
    {
        $products = Products::all();
        return $products;
    }

    public function getProduct($id)
    {
        if (Products::where('id', $id)->exists()) {
            $products = Products::with('Categories')->where('id', $id)->get();
            return $products;
        }
        return null;
    }

    public function createProducts($data)
    {
        $categories = Categories::find($data['categories_id']);

            if (isset($data['image'])) {
                if ($data['image'] != null && $data['image'] != '' && !is_string($data['image'])) {
                    $data['image'] = FileUploader::store($data['image'], $data['name'], 'gallery/products');
                }
            }

        $product = new Products($data);
        $categories->products()->save($product);
        return $product;
    }

    public function updateProducts($id, $data)
    {

        if (Products::where('id', $id)->exists()) {
            $product = Products::find($id);
    
            if (isset($data['image'])) {
                if ($data['image'] != null && $data['image'] != '' && !is_string($data['image'])) {
                    $product['image'] = FileUploader::update($data['image'], $data['name'], 'gallery/products', $product->image);
                }
            }

            $product->name = $data->name;
            $product->description = $data->description;
            $product->categories_id = $data->categories_id;
            $product->price = $data->price;
            $product->save();

            $product = Products::where('id', $id)->firstOrFail();
            return $product;
        } else {
            return null;
        }
    }

    public function deleteProducts($id)
    {
        if (Products::where('id', $id)->exists()) {
            $products = Products::find($id);
            FileUploader::delete($products['image']);
            Products::where('id', $id)->delete();
            return true;
        }
        return false;
    }

    public function changeStatus($id, $data)
    {
        if (Products::where('id', $id)->exists()) {
            Products::where('id', $id)->update(['status' => $data['status']]);
            $product = Products::find($id);
            return $product;
        } else {
            return null;
        }
    }

    public function getValuesChart()
    {
        $products = DB::table('categories')->select('categories.name', DB::raw('count(*) as count'))
                        ->join('products', 'products.categories_id', '=', 'categories.id')
                        ->groupBy('categories.name','categories.id')->get();
        $products->toJson();
        return $products;
    }

}
