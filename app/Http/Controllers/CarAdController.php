<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleAdRequest;
use App\Models\Ad;

class CarAdController extends Controller
{
    public function store(StoreVehicleAdRequest $request)
    {
        $ad = Ad::create([
            'user_id' => auth()->id(),
            'car_id' => $request->car_id,
            'title' => $request->title,
            'description' => $request->description,
            'images' => $this->processImages($request->images),
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تم إرسال طلب الإعلان بنجاح',
            'data' => $ad
        ], 201);
    }

    private function processImages($images)
    {
        $paths = [];
        foreach ($images as $image) {
            $paths[] = $image->store('vehicle_ads', 'public');
        }
        return $paths;
    }
    public function latestApprovedAds()
    {
        $ads = Ad::latestApproved()->get();

        return response()->json([
            'success' => true,
            'data' =>$ads = Ad::query()->approved()->latest()->take(3)->get(),
//                $ads->map(function ($ad) {
//                return [
//                    'id' => $ad->id,
//                    'title' => $ad->title,
//                    'description' => $ad->description,
//                    'images' => $ad->images,
//                    'approved_at' => $ad->approved_at->format('Y-m-d H:i'),
//                    'car' => [
//                        'brand' => $ad->car->brand,
//                        'model' => $ad->car->model,
//                        'year' => $ad->car->year
//                    ],
//                    'seller' => [
//                        'name' => $ad->user->name
//                    ]
//                ];
//            })
        ]);
    }
}
