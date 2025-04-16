<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{

    use HasFactory;

    protected $fillable = ['car_id', 'rating', 'comment'];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

}
