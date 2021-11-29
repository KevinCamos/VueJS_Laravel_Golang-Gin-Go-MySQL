<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\RestaurantResource;
use App\Http\Requests\StoreRestaurantRequest;
use App\Models\Restaurant;

class RestaurantController extends Controller
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
        return RestaurantResource::collection(Restaurant::limit($limit)->offset(($page - 1) * $limit)->get());
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
    public function store(StoreRestaurantRequest $request)
    {
        return RestaurantResource::make(Restaurant::create($request->validated()));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return RestaurantResource::make(Restaurant::where('id', $id)->firstOrFail());
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
    public function update(StoreRestaurantRequest $request, $id)
    {
        return RestaurantResource::make(Restaurant::where('id', $id)->exists());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       /*  return RestaurantResource::make(Restaurant::where('id', $id)->exists()->delete()); */
        if(Restaurant::where('id', $id)->exists()) {
            $restaurant = Restaurant::find($id);
            $restaurant->delete();
            return response()->json([
                "message" => "Restaurant deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Restaurant not found"
            ], 404);
        }
    }
}
