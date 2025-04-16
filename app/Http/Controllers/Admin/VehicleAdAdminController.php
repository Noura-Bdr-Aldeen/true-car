<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateVehicleAdStatusRequest;
use App\Models\Ad;

class VehicleAdAdminController extends Controller
{
    public function pendingAds()
    {
        $ads = Ad::query()->pending()->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $ads
        ]);
    }

    public function approveAd(Ad $ad)
    {
        $ad->update([
            'status' => 'approved',
            'approved_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تمت الموافقة على الإعلان'
        ]);
    }

    public function rejectAd(UpdateVehicleAdStatusRequest $request, Ad $ad)
    {
        $ad->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تم رفض الإعلان'
        ]);
    }
}
