<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'created_at' => 'required|string',
            'user_id' => 'required|numeric',
        ]);

        $category = new \App\Models\Category();
        $category->title = $request->title;
        $category->description = $request->description;
        $category->created_at = $request->created_at;
        $category->user_id = $request->user_id;
        $category->save();

        return redirect()->route('history');
    }

    public function index()
    {
        $categories = \App\Models\Category::all();
        return Inertia::render('History', ['categories' => $categories]);
    }
}
