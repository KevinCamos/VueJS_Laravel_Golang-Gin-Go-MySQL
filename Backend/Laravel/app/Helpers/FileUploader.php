<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use File; 

class FileUploader
{

    public static function name($title)
    {
        return Str::slug($title, "-").'-'.time();
    }

	public static function store($file, $title, $loc)
    {
        if ($file){
            $title  = self::name($title);
            $name  = $title . '.' . $file->getClientOriginalExtension();
            $file->move($loc, $name);
            return asset($loc.'/'.$name);
        }
    }

    public static function update($file, $title, $loc, $old)
    {
        if($old != null) self::delete($old);
        return self::store($file, $title, $loc);
    }

    public static function delete($file)
    {
        if (file_exists(public_path(substr($file, 21)))) {
            File::delete(public_path(substr($file, 21)));
        }
    }
}