<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            // 'id_orderlist' => $this->id_orderlist,
            // 'id_order' => $this->id_order,
            'id_product' => $this->id_product,
            'qty' => $this->qty,
        ];
    }
}
