<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'order';
    protected $fillable = ['id_order', 'id_client', 'status' => 'preparacion'];
    public $timestamps = false;

    public function OrderList()
    {
        return $this->hasMany(OrderList::class, "id_order", "id_order");
    }

    public function Table()
    {
        return $this->belongsTo(Table::class);
    }
}
