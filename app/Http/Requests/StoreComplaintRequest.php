<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreComplaintRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'car_id' => 'nullable|exists:cars,id',
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
        ];
    }
}
