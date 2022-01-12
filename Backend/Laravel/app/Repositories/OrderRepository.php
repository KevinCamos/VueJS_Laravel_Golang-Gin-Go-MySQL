<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderList;
use App\Models\Table;
use Illuminate\Support\Facades\DB;

class OrderRepository
{

    public function getAllOrder()
    {
        $orders = Order::with(['OrderList' => function ($query) {
            $query->select('id_product', 'qty', "id_order" /* id_order es necesario para poder relacionar las tablas */);
        }])->where('status', 'preparacion')->get(/* ['OrderList.id_order AS Si quisieramos cambiar el nombre de alguna columna, también se podría desde aquí'] */);


        return $orders;
    }

    public function getOrder($id)
    {
        $order = Order::with(['OrderList' => function ($query) {
            $query->select('id_product AS id', 'qty', "id_order");
        }])->where('id_order', $id)->get();
        return $order;
    }

    public function createOrder($id_client, $id_worker)
    {
        if ($id_client === 'shop') {
            $order = Order::create(['id_client' => $id_client, 'id_worker' => $id_worker]);
        } else if (!Order::where([['id_client', $id_client], ['status', 'preparacion']])->exists() && Table::where([['id_table', $id_client], ['status', 'active']])->exists()) {
            $order = Order::create(['id_client' => $id_client]);
            Table::where('id_table', $id_client)->update(['status' => 'busy']);
        } else {
            return null;
        }
        return $order;
    }

    public function updateOrder($id, $data)
    {
        if (Order::where('id_order', $id)->exists()) {
            for ($i = 0; $i < count($data->order); $i++) {
                OrderList::updateOrInsert(['id_order' => $id, 'id_product' => $data->order[$i]['id_product']], ['qty' => $data->order[$i]['qty']]);
            }
            return true;
        }
        return null;
    }
/* Al realizar los mismos pasos tanto para finalizar como para cancelar una factura, se reutiliza la función añadiendo la variable $status para definir si es una cancelación y se ha finalizado
de ser finalizado, MYSQL realizará un sql Trigger para facturar*/
    public function endOrder($id, $status)
    {
        if (Order::where([['id_order', $id], ['status', 'preparacion']])->exists()) {
            /* Aquí se cancela o finaliza la factura */
            Order::where('id_order', $id)->update(['status' => $status]);
            /* Se obtiene el dato del cliente */
            $order =  Order::where('id_order', $id)->first();
            if ($order['id_client'] != "shop") {
                Table::where('id_table', intval($order['id_client']))->update(['status' => 'active']);
            }

            return $order;
        }
        return false;
    }

    public function buyOrder($id)
    {
        if (Order::where([['id_order', $id], ['status', 'preparacion']])->exists()) {
            /* Aquí se cancela la factura */
            Order::where('id_order', $id)->update(['status' => 'canceled']);
            /* Se obtiene el dato del cliente */
            $order =  Order::where('id_order', $id)->first();
            if ($order['id_client'] != "shop") {
                Table::where('id_table', intval($order['id_client']))->update(['status' => 'active']);
            }

            return $order;
        }
        return false;
    }

    public function chartOrder()
    {
        return DB::table('OrderList')
                ->join('Products', 'Products.id', '=', 'OrderList.id_product')
                ->select('Products.name as product', DB::raw('SUM(OrderList.qty) as qty'))
                ->groupBy('OrderList.id_product','Products.name')
                ->get();
    }
}
