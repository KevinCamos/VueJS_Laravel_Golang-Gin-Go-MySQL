<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ProductsRepository;
use App\Http\Resources\ProductsResource;
use App\Http\Resources\ProductsCollection;
use App\Http\Requests\StoreProductsRequest;
use App\Models\Products;
use App\Models\Categories;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Response;


class ProductsController extends Controller
{

    use ApiResponseTrait;
    private $productsRepository;

    public function __construct(ProductsRepository $productsRepository)
    {
        $this->productsRepository = $productsRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $products = $this->productsRepository->getAllProducts();
            return self::apiResponseSuccess(new ProductsCollection($products), 'Datos de productos', Response::HTTP_OK);
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

    public function store(StoreProductsRequest $request)
    {
        /* if (Gate::allows('isGerente')) { */
            try {
                $products = $this->productsRepository->createProducts($request->validated());
                if ($products) {
                    return self::apiResponseSuccess($products, 'Categoria creada', Response::HTTP_OK);
                }
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
        /* } else {
            return self::apiResponseError(null, 'Unauthorized' , response::HTTP_FORBIDDEN);
        } */
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
            $products = $this->productsRepository->getProduct($id);
            if(is_null($products)){
                return self::apiResponseError(null, 'Producto no encontrada' , Response::HTTP_NOT_FOUND);
            }
            return self::apiResponseSuccess($products, 'Producto obtenida', Response::HTTP_OK);
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
    public function update(Request $request, $id)
    {
        /* if (Gate::allows('isGerente')) { */
            try {
                $products = $this->productsRepository->updateProducts($id, $request);
                if(is_null($products)){
                    return self::apiResponseError(null, 'Producto no encontrada' , Response::HTTP_NOT_FOUND);
                }
                return self::apiResponseSuccess($products, 'Producto actualizada', Response::HTTP_OK);
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
       /*  } else {
            return self::apiResponseError(null, 'Unauthorized' , response::HTTP_FORBIDDEN);
        } */
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       /*  if (Gate::allows('isGerente')) { */
            try {
                $products = $this->productsRepository->deleteProducts($id);
                if($products){
                    return self::apiResponseSuccess(null, 'OK', Response::HTTP_OK);
                }
                return self::apiResponseError(null, 'Producto no encontrada' , Response::HTTP_NOT_FOUND);
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
        /* } else {
            return self::apiResponseError(null, 'Unauthorized' , response::HTTP_FORBIDDEN);
        } */
    }

    public function changeStatus(Request $request, $id)
    {
        /* if (Gate::allows('isGerente')) { */
            try {
                $products = $this->productsRepository->changeStatus($id, $request);
                if($products){
                    return self::apiResponseSuccess($products, 'Status actualizado', Response::HTTP_OK);
                }
                return self::apiResponseError(null, 'Producto no encontrada' , Response::HTTP_NOT_FOUND);
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
      /*   } else {
            return self::apiResponseError(null, 'Unauthorized' , response::HTTP_FORBIDDEN);
        } */
    }

    public function getChart(Request $request)
    {
        /* if (Gate::allows('isGerente')) { */
            try {
                $products = $this->productsRepository->getValuesChart();
                if($products){
                    return self::apiResponseSuccess($products, 'Datos de productos', Response::HTTP_OK);
                }
                return self::apiResponseError(null, 'Producto no encontrada' , Response::HTTP_NOT_FOUND);
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
      /*   } else {
            return self::apiResponseError(null, 'Unauthorized' , response::HTTP_FORBIDDEN);
        } */
    }
}
