<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    protected $table = 'table';
    protected $fillable = ['id_table', 'id_order', 'status'];
    public $timestamps = false;
}
