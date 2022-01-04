<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;
    protected $table = 'bill';
    protected $fillable = ['id_order', 'id_client', 'data_bill', 'tax_base', 'total_iva', 'total_bill'];
    public $timestamps = false;

}
