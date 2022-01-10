<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = ['id','name', 'description', 'categories_id', 'price', 'image'];

    public function categories()
    {
        return $this->belongsTo(Categories::class, 'categories_id', 'id');
    }

    public function orderlist()
    {
        return $this->belongsTo(OrderList::class, 'id', 'id_product');
    }
}
