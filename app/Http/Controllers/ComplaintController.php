<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComplaintRequest;
use App\Http\Requests\UpdateComplaintRequest;
use App\Models\Car;
use App\Models\Complaint;

class ComplaintController extends Controller
{

    public function store(StoreComplaintRequest $request)
    {
        $complaint = Complaint::create([
            'name' => $request->name,
            'car_id' => $request->car_id,
            'type' => $request->car_id ? 'car_specific' : 'general',
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'تم تقديم الشكوى بنجاح',
            'data' => $complaint
        ], 201);
    }

    public function carComplaints(Car $car)
    {

        $complaints = $car->complaints()
            ->latest()
            ->get();

        return response()->json($complaints);
    }

    public function generalComplaints()
    {
        $complaints = Complaint::general()
            ->latest()
            ->get();

        return response()->json($complaints);
    }

    public function updateStatus(Complaint $complaint, UpdateComplaintRequest $request)
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
