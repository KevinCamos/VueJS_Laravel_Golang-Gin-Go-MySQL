<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Hello from Terminal");
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $out->writeln("Hello from Terminal");
        return [
            "name" => ["required"],
            "description" => ["required"],
            "category" => ["required"],
            "price" => ["required"]
        ];
    }

/*     public function messages()
    {
        return [
            'name.required' => 'El :attribute es obligatorio.',
            'description.required' => 'Añade una :attribute al producto',
            'category.required' => 'Añade una :attribute al producto',
            'price.required' => 'Añade un :attribute al producto',
        ];
    } 

    public function attributes()
    {
        return [
            'name' => 'nombre del producto',
            'description' => 'description',
            'category' => 'category',
            'price' => 'precio de venta',
        ];
    }*/
}
