<?php

namespace App\Repositories;

use App\Models\Table;

class TableRepository
{


    /**
     *
     *  Aquí utilizamos dos RelationShip para poder editar y finalizar el pedido sin necesidad de hacer más peticiones */
    public function getAllTable()
    {

        $tables = Table::with(['Order' => function ($query) {
            $query->with("orderlist")->where('status', 'preparacion');
        }])->get();

        // foreach ($tables as $key => $table) {
        //     // $table[$key]->Order = $table->Order;
        //     $table[$key]->order = $table->order->OrderList;
        // }
        return $tables;
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
            Table::where('id_table', $id)->update(['id_order' => $data['id_order'], 'status' => $data['status']]);
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
