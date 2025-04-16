<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{

    public function handle(Request $request, Closure $next, string $role)
    {
        $user = $request->user();
        if ($role === 'guest') {
            return $next($request);
        }
        if ($role === 'admin' && $user->id !== 1) {
            return response()->json([
                'success' => false,
                'message' => 'تحتاج صلاحيات أدمن للوصول'
            ], 403);
        }
        if ($role === 'seller' &&!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'تحتاج صلاحيات البائع للوصول'
            ], 403);
        }
        return $next($request);
    }

}
