<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComplaintRequest;
use App\Http\Requests\UpdateComplaintRequest;
use App\Models\Car;
use App\Models\Complaint;
use Illuminate\Http\JsonResponse;

class ComplaintController extends Controller
{


    // إنشاء شكوى جديدة
    public function store(StoreComplaintRequest $request): JsonResponse
    {
        $complaint = Complaint::create([
            'name'=>  $request->name,
            'car_id' => $request->car_id,
            'type' => $request->car_id ? 'car_specific' : 'general',
            'title' => $request->title,
            'description' => $request->description,
        ])
        ;

        return response()->json([
            'message' => 'تم تقديم الشكوى بنجاح',
            'data' => $complaint
        ], 201);
    }

    // عرض الشكاوى الخاصة بالسيارة (للمالك)
    public function carComplaints(Car $car): JsonResponse
    {

        $complaints = $car->complaints()
            ->latest()
            ->get() ;

        return response()->json($complaints);
    }

    public function generalComplaints(): JsonResponse
    {
        $complaints = Complaint::general()
            ->latest()
            ->get();

        return response()->json($complaints);
    }

    public function updateStatus(Complaint $complaint, UpdateComplaintRequest $request): JsonResponse
    {

        $complaint->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes
        ]);

        return response()->json([
            'message' => 'تم تحديث حالة الشكوى',
            'data' => $complaint
        ]);
    }
}
