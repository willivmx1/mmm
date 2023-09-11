<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OperationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'category_id' => 'required|numeric',
            'type' => 'required|string',
            'created_at' => 'required|date',
        ]);

        $operation = new \App\Models\Operation();
        $operation->title = $request->title;
        $operation->description = $request->description;
        $operation->amount = $request->amount;
        $operation->category_id = $request->category_id;
        $operation->type = $request->type;
        $operation->created_at = $request->created_at;

        // return a status message

        if ($operation->save()){
            return "success";
        }
        else{
            return "error";
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'category_id' => 'required|numeric',
            'type' => 'required|string',
            'updated_at' => 'required|date',
        ]);

        $operation = \App\Models\Operation::find($id);
        $operation->title = $request->title;
        $operation->description = $request->description;
        $operation->amount = $request->amount;
        $operation->category_id = $request->category_id;
        $operation->type = $request->type;
        $operation->updated_at = $request->updated_at;
        $operation->save();

        return redirect()->route('history');
    }

    public function destroy($id)
    {
        $operation = \App\Models\Operation::find($id);
        $operation->delete();

        return redirect()->route('history');
    }

    public function index()
    {
        $operations = \App\Models\Operation::all();
        return Inertia::render('History', ['operations' => $operations]);
    }

    public function show($id)
    {
        $operation = \App\Models\Operation::find($id);
        $categories = \App\Models\Category::all();
        return Inertia::render('EditOperation', ['operation' => $operation, 'categories' => $categories]);
    }
}
