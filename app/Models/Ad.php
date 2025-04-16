<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Ad extends Model
{
    protected $fillable = [
        'user_id', 'car_id', 'title', 'description',
        'images', 'status', 'rejection_reason'
    ];

    protected $casts = [
        'images' => 'array',
        'approved_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
    public function scopeLatestApproved($query, $limit = 6)
    {
        return $query->with(['user:id,name', 'car:id,brand,model,year'])
            ->approved()
            ->whereNotNull('approved_at')
            ->latest('approved_at')
            ->limit($limit);
    }
}
