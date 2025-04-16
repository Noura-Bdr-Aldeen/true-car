<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'brand',
        'model',
        'year',
        'price',
        'images',
        'description',
        'sold',
        'color',
        'country',
        'city',
        'specifications'
    ];

    protected $casts = [
        'images' => 'array',
        'sold' => 'boolean',
        'specifications' => 'array',
        'year' => 'integer',
        'price' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function scopeAvailable($query)
    {
        return $query->where('sold', false);
    }

    public function scopeSold($query)
    {
        return $query->where('sold', true);
    }
    public function scopeNotSold($query)
    {
        return $query->where('sold', false);
    }

    public function scopePriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeYearRange($query, $min, $max)
    {
        return $query->whereBetween('year', [$min, $max]);
    }

    public function scopeByBrand($query, $brands)
    {
        return $query->whereIn('brand', (array)$brands);
    }

    public function scopeByLocation($query, $country, $city = null)
    {
        $query->where('country', $country);
        if ($city) {
            $query->where('city', $city);
        }
        return $query;
    }
    public function complaints()
    {
        return $this->hasMany(Complaint::class);
    }
    public function ratings()
    {
        return $this->hasMany(Rate::class);
    }

    public function averageRating()
    {
        return $this->ratings()->avg('rating');
    }

    public function totalRatings()
    {
        return $this->ratings()->count();
    }
    public function getComments()
    {
        $comments= $this->ratings()->pluck('comment');
        return $comments;
    }
    public function getRatingDistribution(): array
    {
        $distribution = $this->ratings()
            ->selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->orderBy('rating', 'desc')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->rating => $item->count];
            })
            ->toArray();
        return array_replace([5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0], $distribution);
    }
    public function scopeTopRated($query,  $limit = 6)
    {
        return $query->withCount('ratings')
            ->addSelect([
                'average_rating' => Rate::selectRaw('AVG(rating)')
                    ->whereColumn('car_id', 'cars.id')
                    ->limit(1)
            ])
            ->whereHas('ratings')
            ->orderByDesc('average_rating')
            ->orderByDesc('ratings_count')
            ->limit($limit);
    }
}
