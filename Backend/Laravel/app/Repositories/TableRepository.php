<?php

namespace App\Repositories;
use App\Models\Table;

class TableRepository{

    public function getAllTable()
    {
        $table = Table::all();
        return $table;
    }

    public function getTable($id)
    {
        $table = Table::where('id_table', $id)->get();
        return $table;
    }

    public function createTable($data)
    {
        $table = Table::create($data);
        return $table;
    }

    public function updateTable($id, $data)
    {
        if (Table::where('id_table', $id)->exists()) {
            Table::where('id_table', $id)->update(['id_order'=> $data['id_order'], 'status'=> $data['status']]);
            $table = Table::where('id_table', $id)->get();
            return $table;
        }
        return null;
    }

    public function deleteTable($id)
    {
        if (Table::where('id_table', $id)->exists()) {
            $table = Table::where('id_table', $id)->delete();
            return true;
        }
        return false;
    }

}
