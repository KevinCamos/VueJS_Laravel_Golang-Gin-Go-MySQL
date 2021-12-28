<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderList;

class OrderRepository
{

    public function getAllOrder()
    {
        // $order = Order::all();
         $orders = Order::with(['OrderList' => function ($query) {
            $query->select('id_product', 'qty', "id_order");
        }])->where('status', 'preparacion')->get();


        return   $this->$orders;
    }

    public function getOrder($id)
    {
        $order = Order::where('id_order', $id)->get();
        return $order;
    }

    public function createOrder($data)
    {
        // $out = new \Symfony\Component\Console\Output\ConsoleOutput();

        // $out->writeln("---------------data-------------------");
        // $out->writeln($data);
        // $out->writeln("---------------data-------------------");
        $order = Order::create(['id_client' => $data]);
        // $out->writeln($order);

        return $order;
    }

    public function updateOrder($id, $data)
    {
        if (Order::where('id_order', $id)->exists()) {
            $order = Order::where('id_order', $id)->update(['id_client' => $data['id_client'], 'status' => $data['status']]);
            return $order;
        }
        return null;
    }

    public function deleteOrder($id)
    {
        if (Order::where('id_order', $id)->exists()) {
            $order = Order::where('id_order', $id)->delete();
            return true;
        }
        return false;
    }
}
