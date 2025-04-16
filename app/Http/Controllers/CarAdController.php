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

        return response()->json([
            'success' => true,
            'data' => Ad::query()->approved()->latest()->take(3)->get(),

        ]);
    }
}
