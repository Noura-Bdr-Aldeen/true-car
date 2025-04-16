<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->car->user_id == auth()->id();
    }

    public function rules(): array
    {
        return [
            'brand' => 'sometimes|string|max:100',
            'model' => 'sometimes|string|max:100',
            'year' => 'sometimes|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'sometimes|numeric|min:0',
            'images' => 'sometimes|array|min:1|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string|max:2000',
            'sold' => 'sometimes|boolean',
            'color' => 'nullable|string|max:50',
            'country' => 'sometimes|string|max:100',
            'city' => 'sometimes|string|max:100',
            'specifications' => 'nullable|array',
            'specifications.*' => 'nullable|string',
        ];
    }
}
