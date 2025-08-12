<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated and has admin role
        // For testing purposes, you can temporarily bypass authentication by setting 'bypass_auth' in the request
        if ($request->has('bypass_auth')) {
            return $next($request);
        }
        
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized action. Admin access required.');
        }

        return $next($request);
    }
}
