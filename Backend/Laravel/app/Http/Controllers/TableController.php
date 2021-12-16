<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\TableRepository;
use App\Http\Resources\TableResource;
use App\Http\Requests\TableRequest;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Response;

class TableController extends Controller
{

    use ApiResponseTrait;

    private $tableRepository;

    /**
     * Set users to api consume
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(TableRepository $tableRepository)
    {
        $this->tableRepository = $tableRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $table = $this->tableRepository->getAllTable();
            return self::apiResponseSuccess($table, 'Todas las mesas', Response::HTTP_OK);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TableRequest $request)
    {
        try {
            $table = $this->tableRepository->createTable($request->validated());
            $table->id_table = $table->id;
            if ($table) {
                return self::apiResponseSuccess(TableResource::make($table), 'Mesa creada', Response::HTTP_OK);
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
            $table = $this->tableRepository->getTable($id);
            if(is_null($table)){
                return self::apiResponseError(null, 'Mesa no encontrada' , Response::HTTP_NOT_FOUND);
            }
            return self::apiResponseSuccess(TableResource::make($table), 'Mesa obtenida', Response::HTTP_OK);
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
    public function update(TableRequest $request, $id)
    {
        try {
            $table = $this->tableRepository->updateTable($id, $request->validated());
            if(is_null($table)){
                return self::apiResponseError(null, 'Mesa no encontrada' , Response::HTTP_NOT_FOUND);
            }
            return self::apiResponseSuccess($table, 'Mesa actualizada', Response::HTTP_OK);
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
            $table = $this->tableRepository->deleteTable($id);
            if($table){
                return self::apiResponseSuccess(null, 'OK', Response::HTTP_OK);
            }
            return self::apiResponseError(null, 'Mesa no encontrada' , Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            return self::apiServerError($e->getMessage());
        }
    }
}
