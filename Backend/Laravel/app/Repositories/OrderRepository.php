<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderList;
use App\Models\Table;

class OrderRepository
{

    public function getAllOrder()
    {
        $orders = Order::with(['OrderList' => function ($query) {
            $query->select('id_product AS id', 'qty', "id_order" /* id_order es necesario para poder relacionar las tablas */);
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

    public function createOrder($data)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln($data);
        /*       $order = Order::create(['id_client' => $data]);
        return $order; */
        if ($data === 'shop') {

            $order = Order::create(['id_client' => $data]);
        } else if (!Order::where([['id_client', $data], ['status', 'preparacion']])->exists() && Table::where([['id_table', $data], ['status', 'active']])->exists()) {
            $order = Order::create(['id_client' => $data]);
            Table::where('id_table', $data)->update(['status' => 'busy']);
        } else {
            return null;
        }
        return $order;
    }

    public function updateOrder($id, $data)
    {
        if (Order::where('id_order', $id)->exists()) {
            for ($i = 0; $i < count($data->order); $i++) {
                OrderList::updateOrInsert(['id_order' => $id, 'id_product' => $data->order[$i]['id']], ['qty' => $data->order[$i]['qty']]);
            }
        }
        return null;
    }

    public function deleteOrder($id)
    {
        if (Order::where([['id_order', $id], ['status' , 'preparacion']])->exists()) {
            /* Aquí se cancela la factura */
            Order::where('id_order', $id)->update(['status' => 'canceled']);
            /* Se obtiene el dato del cliente */
            $order =  Order::where('id_order', $id)->get();

            $out = new \Symfony\Component\Console\Output\ConsoleOutput();

            $out->writeln($order);
            // Table::where('id_table',$order['id_cliente'])->update(['status' => 'active']);

            return $order;
        }
        return false;
    }
}
