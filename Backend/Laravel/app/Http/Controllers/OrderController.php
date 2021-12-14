<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\OrderRepository;
use App\Http\Resources\OrderResource;
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
    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
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
            $order = $this->orderRepository->createOrder($request->validated());
            if ($order) {
                return self::apiResponseSuccess($order, 'Pedido creado', Response::HTTP_OK);
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
            if(is_null($order)){
                return self::apiResponseError(null, 'Pedido no encontrado' , Response::HTTP_NOT_FOUND);
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
            $order = $this->orderRepository->updateOrder($id, $request->validated());
            if(is_null($order)){
                return self::apiResponseError(null, 'Pedido no encontrado' , Response::HTTP_NOT_FOUND);
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
            $order = $this->orderRepository->deleteOrder($id);
            if($order){
                return self::apiResponseSuccess(null, 'Pedido eliminado', Response::HTTP_OK);
            }
            return self::apiResponseError(null, 'Pedido no encontrado' , Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }
}
