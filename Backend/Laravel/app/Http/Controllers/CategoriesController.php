<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CategoriesRepository;
use App\Http\Resources\CategoriesResource;
use App\Http\Requests\CategoriesRequest;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Response;
use Gate;
use Illuminate\Support\Facades\Auth;

class CategoriesController extends Controller
{

    use ApiResponseTrait;
    private $categoriesRepository;

    public function __construct(CategoriesRepository $categoriesRepository)
    {
        $this->categoriesRepository = $categoriesRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $categories = $this->categoriesRepository->getAllCategories();
            return self::apiResponseSuccess($categories, 'Todas las categorias', Response::HTTP_OK);
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
    public function store(CategoriesRequest $request)
    {
        /* if (Gate::allows('isGerente', $request)) { */
            try {
                $categories = $this->categoriesRepository->createCategories($request->validated());
                if ($categories) {
                    return self::apiResponseSuccess($categories, 'Categoria creada', Response::HTTP_OK);
                }
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
       /*  } else {
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
            $categories = $this->categoriesRepository->getCategories($id);
            if(is_null($categories)){
                return self::apiResponseError(null, 'Categoria no encontrada' , Response::HTTP_NOT_FOUND);
            }
            return self::apiResponseSuccess($categories, 'Categoria obtenida', Response::HTTP_OK);
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
    public function update(CategoriesRequest $request, $id)
    {
        /* if (Gate::allows('isGerente')) { */
            try {
                $categories = $this->categoriesRepository->updateCategories($id, $request->validated());
                if(is_null($categories)){
                    return self::apiResponseError(null, 'Categoria no encontrada' , Response::HTTP_NOT_FOUND);
                }
                return self::apiResponseSuccess($categories, 'Categoria actualizada', Response::HTTP_OK);
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
        /* } else {
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
        /* if (Gate::allows('isGerente')) { */
            try {
                $categories = $this->categoriesRepository->deleteCategories($id);
                if($categories){
                    return self::apiResponseSuccess(null, 'OK', Response::HTTP_OK);
                }
                return self::apiResponseError(null, 'Categoria no encontrada' , Response::HTTP_NOT_FOUND);
            } catch (\Exception $e) {
                return self::apiServerError($e->getMessage());
            }
        /* } else {
            return self::apiResponseError(null, 'Unauthorized' , response::HTTP_FORBIDDEN);
        } */
    }
}
