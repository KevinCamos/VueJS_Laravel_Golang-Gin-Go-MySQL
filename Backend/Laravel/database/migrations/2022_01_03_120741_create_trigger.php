<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS `create_bill`');
        DB::unprepared('CREATE TRIGGER `create_bill` AFTER UPDATE ON `order` FOR EACH ROW BEGIN
        IF NEW.status LIKE "F" THEN

         INSERT INTO bill  (id_order, id_client, data_bill, tax_base, total_iva, total_bill)
           SELECT id_order, id_client, fecha, ROUND((total_bill/1.10),2) AS tax_base ,  ROUND((total_bill/1.10*0.10), 2) AS IVA,ROUND(total_bill,2) as total_bill
            FROM (SELECT l.id_order, a.id_client, now() as fecha , SUM((l.qty*p.price)) AS total_bill
                FROM orderlist l, products p, `order` a
                WHERE l.id_product=p.id
                AND  l.id_order = OLD.id_order
                and l.id_order = a.id_order
                AND l.qty <> 0
                GROUP BY l.id_order) AS K;

         END IF;

        END
        ');

    }

    public function down()
    {
        DB::unprepared('DROP TRIGGER `create_bill`');
    }
}
