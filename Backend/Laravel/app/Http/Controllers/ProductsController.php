<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ProductsResource;
use App\Http\Requests\StoreProductsRequest;
use App\Models\Products;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->get('page') : 1;
        $limit = $request->has('limit') ? $request->get('limit') : 5;
        return ProductsResource::collection(Products::limit($limit)->offset(($page - 1) * $limit)->get());
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
/*         return response()->json([
            "message" => "Product create"
        ], 200); */
        return ProductsResource::make(Products::create($request->validated()));
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ProductsResource::make(Products::where('id', $id)->firstOrFail());
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
        $user = Auth::user();
        $products = Products::find($id);

        if ($user->can('update', $products)) {
            if(Gate::allows('isGerente')){
                if (Products::where('id', $id)->exists()) {
                    $product = Products::find($id);
                    $product->name = $request->name;
                    $product->description = $request->description;
                    $product->category = $request->category;
                    $product->price = $request->price;
                    $product->save();
                    return ProductsResource::make(Products::where('id', $id)->firstOrFail());
                } else {
                    return response()->json([
                        "message" => "Product not found"
                    ], 404);
                }
            }
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
        Products::where('id', $id)->delete();
        return response()->json([
            "message" => "OK"
        ], 202);
    }
}
