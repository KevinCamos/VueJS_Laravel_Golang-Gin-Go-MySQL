<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderlistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderlist', function (Blueprint $table) {
            $table->id('id_orderlist');
            $table->bigInteger('id_order')->unsigned();
            $table->foreign("id_order")->references("id_order")->on("order")/* ->onDelete("cascade") */;
            // bigInteger("brand_id")->unsigned()
            $table->integer('id_product');
            $table->integer('qty');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orderlist');
    }
}
