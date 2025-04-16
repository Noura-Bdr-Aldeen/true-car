<?php

namespace App\Http\Controllers;
use App\Models\Car;
use App\Http\Requests\StoreCarRatingRequest;
use App\Models\Rate;

class CarRatingController extends Controller
{

    public function store(StoreCarRatingRequest $request)
    {
        $rating = Rate::updateOrCreate(
            [
                'car_id' => $request->car_id,
                'rating' => $request->rating,
                'comment' => $request->comment
            ]
        );
        return response()->json([
            'success' => true,
            'rating' => $rating,
        ], 201);
    }
    public function getTopRated()
    {
        $cars = Car::has('ratings')
        ->get()
            ->sortByDesc(function ($car) {
                return [$car->averageRating(), $car->totalRatings()];
            })
            ->take(6)
            ->values()
            ->map(function ($car) {
                return [
                    'car'=>$car,
                    'average_rating' => round($car->averageRating(), 1),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $cars
        ]);
    }
}
