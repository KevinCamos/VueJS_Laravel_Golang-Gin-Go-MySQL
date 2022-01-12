<?php

namespace App\Repositories;

use App\Models\OrderList;

class OrderListRepository
{
    public function createOrderList($data, $id)
    {
        for ($i = 0; $i < count($data->order); $i++) {
            OrderList::create(['id_order' => $id, 'id_product' => $data->order[$i]['id_product'], 'qty' => $data->order[$i]['qty']]);
        }
        return OrderList::where('id_order', $id)->get();
    }
}
