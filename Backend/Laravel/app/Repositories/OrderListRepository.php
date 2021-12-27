<?php

namespace App\Repositories;

use App\Models\OrderList;

class OrderListRepository
{



    public function createOrderList($data, $id)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();

        // $out->writeln($data->order[1]['id']);
        // $out->writeln(count($data->order));
        for ($i = 0; $i < count($data->order); $i++) {
            /*
            $dataFormate[$i]['id_order'] = $id;
            $dataFormate[$i]['id_product'] = $data->order[$i]['id'];
            $dataFormate[$i]['qty'] = $data->order[$i]['mount'];
            $out->writeln($dataFormate);
 */


            $line = OrderList::create(['id_order' => $id, 'id_product' =>$data->order[$i]['id'] , 'qty' => $data->order[$i]['qty']]);
            // $out->writeln($line);
        }
// $pepino= OrderList::where('id_order', $id)->get();
//         $out->writeln($pepino );

        return   OrderList::where('id_order', $id)->get();
    }

    // public function updateOrder($id, $data)
    // {
    //     if (Order::where('id_order', $id)->exists()) {
    //         $order = Order::where('id_order', $id)->update(['id_client'=> $data['id_client'], 'status'=> $data['status']]);
    //         return $order;
    //     }
    //     return null;
    // }

    // public function deleteOrder($id)
    // {
    //     if (Order::where('id_order', $id)->exists()) {
    //         $order = Order::where('id_order', $id)->delete();
    //         return true;
    //     }
    //     return false;
    // }

}
