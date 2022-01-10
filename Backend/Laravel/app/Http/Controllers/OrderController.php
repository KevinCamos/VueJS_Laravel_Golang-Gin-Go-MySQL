<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\OrderRepository;
use App\Repositories\OrderListRepository;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderListResource;
use App\Http\Requests\OrderRequest;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    use ApiResponseTrait;

    private $orderRepository;

    /**
     * Set users to api consume
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(OrderRepository $orderRepository, OrderListRepository $orderListRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->orderListRepository = $orderListRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $order = $this->orderRepository->getAllOrder();
            return self::apiResponseSuccess($order, 'Todas los pedidos', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrderRequest $request)
    {
        try {

            $order = OrderResource::make($this->orderRepository->createOrder(isset($request['id_client']) ? $request['id_client'] : "shop"));
            $listorder = OrderListResource::collection($this->orderListRepository->createOrderList($request, $order['id']));

            // $out->writeln("---------------order-------------------");
            // $out->writeln($order['id']);
            // $out->writeln("---------------order-------------------");
            if ($order) {
                $data = array(
                    "id_order"  => $order['id'],
                    "order" => $listorder
                );

                return self::apiResponseSuccess($data, 'Pedido creado', Response::HTTP_OK);
            }
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $order = $this->orderRepository->getOrder($id);
            if (is_null($order)) {
                return self::apiResponseError(null, 'Pedido no encontrado', Response::HTTP_NOT_FOUND);
            }
            return self::apiResponseSuccess($order, 'Pedido obtenido', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(OrderRequest $request, $id)
    {
        try {
            $order = $this->orderRepository->updateOrder($id, $request/* ->validated() */);
            if (is_null($order)) {
                return self::apiResponseError(null, 'Pedido no encontrado', Response::HTTP_NOT_FOUND);
            }
            return self::apiResponseSuccess($order, 'Pedido actualizado', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $order = $this->orderRepository->endOrder($id, 'canceled');

            if ($order) {


                return self::apiResponseSuccess(null, 'Pedido cancelado', Response::HTTP_OK);
            }
            return self::apiResponseError(null, 'Pedido no encontrado', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    public function buyOrder($id){
        try {
            $order = $this->orderRepository->endOrder($id, 'F');

            if ($order) {


                return self::apiResponseSuccess(null, 'Pedido finalizado', Response::HTTP_OK);
            }
            return self::apiResponseError(null, 'Pedido no encontrado', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    public function orderChart()
    {
        try {
            $data = $this->orderRepository->chartOrder();
            if ($data){
                return self::apiResponseSuccess($data, 'Data for chart', Response::HTTP_OK);
            } 
            return self::apiResponseError(null, 'Pedido no encontrado', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }
}
