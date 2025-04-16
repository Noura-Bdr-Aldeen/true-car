<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Models\Car;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{

    public function index()
    {
        $cars = Car::available()
            ->latest()
            ->get();
        return response()->json($cars);
    }

    public function store(StoreCarRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        if ($request->hasFile('images')) {
            $data['images'] = $this->uploadImages($request->file('images'));
        }

        $car = Car::create($data);

        return response()->json($car, 201);
    }

    public function show(Car $car)
    {
        return response()->json($car->load('user:id,name,phone'));
    }

//    public function update(UpdateCarRequest $request, Car $car)
//    {
////        $this->authorize('update', $car);
//
//        $data = $request->validated();
//
//        if ($request->hasFile('images')) {
//            $this->deleteImages($car->images);
//            $data['images'] = $this->uploadImages($request->file('images'));
//        }
//
//        $car->update($data);
//
//        return response()->json($car);
//    }

//    public function destroy(Car $car)
//    {
////        $this->authorize('delete', $car);
//
//        $this->deleteImages($car->images);
//
//        $car->delete();
//
//        return response()->json(null, 204);
//    }

    protected function uploadImages(array $images)

    {
        $uploadedImages = [];
        foreach ($images as $image) {
            $path = $image->store('public/car_images');
            $uploadedImages[] = Storage::url($path);
        }
        return $uploadedImages;
    }

//    protected function deleteImages(?array $images)
//    {
//        if (!$images) return;
//
//        foreach ($images as $image) {
//            $path = str_replace('/storage', 'public', $image);
//            Storage::delete($path);
//        }
//    }
    public function markAsSold(Car $car)
    {
        if (auth()->id() !== $car->user_id) {
            return response()->json([
                'message' => 'غير مصرح لك بتغيير حالة هذه السيارة'
            ], 403);
        }
        if ($car->sold) {
            return response()->json([
                'message' => 'السيارة مباعة بالفعل',
                'errors' => ['sold' => 'لا يمكن تغيير حالة سيارة مباعة']
            ], 422);
        }

        $car->update([
            'sold' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث حالة السيارة إلى "مباعة" بنجاح',
            'data' => [
                'car' => $car->fresh()->load('user:id,name,phone'),
            ]
        ]);
}
    public function search(Request $request)
    {
        $query = Car::query()->with('user:id,name,phone')->notSold();

        $this->applyFilters($query, $request);

        $this->applySorting($query, $request);

        $cars = $query->get()
//        paginate($request->get('per_page', 15))
        ;

        return response()->json([
            'success' => true,
            'data' => $cars,
            'filters' => $request->query()
        ]);
    }


    protected function applyFilters($query, $request): void
    {

        if ($request->has('search')) {
            $searchTerm = $request->get('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('brand', 'like', "%$searchTerm%")
                    ->orWhere('model', 'like', "%$searchTerm%")
                    ->orWhere('description', 'like', "%$searchTerm%");
            });
        }


        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }


        if ($request->has('min_year')) {
            $query->where('year', '>=', $request->get('min_year'));
        }
        if ($request->has('max_year')) {
            $query->where('year', '<=', $request->get('max_year'));
        }

        if ($request->has('brand')) {
            $query->whereIn('brand', (array)$request->get('brand'));
        }


        if ($request->has('color')) {
            $query->whereIn('color', (array)$request->get('color'));
        }


        if ($request->has('country')) {
            $query->where('country', $request->get('country'));
        }
        if ($request->has('city')) {
            $query->where('city', $request->get('city'));
        }
    }

    protected function applySorting($query, $request)
    {
        $sortField = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_dir', 'desc');

        $validSortFields = ['price', 'year'];
        $validDirections = ['asc', 'desc'];

        if (in_array($sortField, $validSortFields)) {
        $direction = in_array($sortDirection, $validDirections) ? $sortDirection : 'desc';
        $query->orderBy($sortField, $direction);
    }
    }
    public function getRatingStats( $carId)
    {
        $car = Car::findOrFail($carId);

        return response()->json([
            'success' => true,
            'data' => [
                'average_rating' => $car->averageRating(),
                'total_ratings' => $car->totalRatings(),
                'rating_distribution' => $car->getRatingDistribution(),
                'comment'=>$car->getComments(),
            ]
        ]);
    }
}
