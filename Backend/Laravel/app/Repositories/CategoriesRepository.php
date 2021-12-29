<?php

namespace App\Repositories;
use App\Models\Categories;
use App\Helpers\FileUploader;

class CategoriesRepository{

    public function getAllCategories()
    {
        $categories = Categories::all();
        return $categories;
    }

    public function getCategories($id)
    {
        if (Categories::where('id', $id)->exists()) {
            $categories = Categories::where('id', $id)->get();
            return $categories;
        }
        return null;
    }

    public function createCategories($data)
    {
        if(isset($data['image'])){
            if($data['image'] != null && $data['image'] != '' && !is_string($data['image'])){
                $data['image'] = FileUploader::store($data['image'], $data['name'] ,'gallery/categories');
            } 
        }    
        $categories = Categories::create($data);
        return $categories;
    }

    public function updateCategories($id, $data)
    {
        $category = Categories::find($id);
        if (Categories::where('id', $id)->exists()) {
            if(isset($data['image'])){
                if($data['image'] != null && $data['image'] != '' && !is_string($data['image'])){
                    $data['image'] = FileUploader::update($data['image'], $data['name'] ,'gallery/categories', $category->image);
                } 
            }    
            $categories = Categories::where('id', $id)->update(['name'=> $data['name'], 'image'=> $data['image']]);
            $categories = Categories::where('id', $id)->get();
            return $categories;
        }
        return null;
    }

    public function deleteCategories($id)
    {
        if (Categories::where('id', $id)->exists()) {
            $category = Categories::find($id);
            FileUploader::delete($category['image']);
            $categories = Categories::where('id', $id)->delete();
            return true;
        }
        return false;
    }

}
