<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => 'sometimes|string|max:100',
            'min_price' => 'sometimes|numeric|min:0',
            'max_price' => 'sometimes|numeric|min:0|gte:min_price',
            'min_year' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'max_year' => 'sometimes|integer|min:1900|max:' . date('Y') . '|gte:min_year',
            'brand' => 'sometimes|array',
            'brand.*' => 'string|max:50',
            'color' => 'sometimes|array',
            'color.*' => 'string|max:30',
            'country' => 'sometimes|string|max:100',
            'city' => 'sometimes|string|max:100',
            'sort_by' => 'sometimes|in:price,year,created_at,mileage',
            'sort_dir' => 'sometimes|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100'
        ];
    }
}
