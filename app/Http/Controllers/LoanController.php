<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class LoanController extends Controller
{
    public function index(Request $request): InertiaResponse {
        $query = Loan::query();

        if ($request->has('query')) {
            $search = $request->input('query');
            $query->where('name', 'like', '%' . $search . '%');
        }

        $pageSize = $request->input('size', 10);
        $data = $query->paginate($pageSize)->appends($request->all());

        return Inertia::render('Loan/Index', [
            'loan' => $data,
            'filters' => $request->only(['query', 'size']),
        ]);
    }
}
