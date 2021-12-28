<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    use HasFactory;
    protected $table = 'orderlist';
    protected $fillable = ['id_orderlist', 'id_order', 'id_product', 'qty'];
    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
